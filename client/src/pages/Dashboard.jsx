import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import SkillsEditor from '../components/SkillsEditor';
import ExperienceEditor from '../components/ExperienceEditor';
import EducationEditor from '../components/EducationEditor';
import ProjectsEditor from '../components/ProjectsEditor';
import { getAvatarUrl } from '../utils/media';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({
    title: '', bio: '', github: '', linkedin: '', artstation: '', website: '',
  });
  const [cvFile, setCvFile] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('/api/profile/me')
      .then(res => {
        const p = res.data.profile;
        setProfile(p);
        setForm({
          title:      p.title || '',
          bio:        p.bio || '',
          github:     p.links?.github || '',
          linkedin:   p.links?.linkedin || '',
          artstation: p.links?.artstation || p.links?.artbook || '',
          website:    p.links?.website || '',
        });
        setAvatarPreview(getAvatarUrl(p.avatarPath));
      })
      .catch(() => setMessage('Profil yüklenemedi.'))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleAvatarSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleAvatarUpload = async () => {
    if (!avatarFile) return setMessage('Lütfen bir profil fotoğrafı seçin.');
    setUploadingAvatar(true);
    setMessage('');
    const formData = new FormData();
    formData.append('avatarFile', avatarFile);
    try {
      const res = await axios.post('/api/profile/upload-avatar', formData);
      setProfile(res.data.profile);
      setAvatarPreview(getAvatarUrl(res.data.profile.avatarPath));
      setAvatarFile(null);
      setMessage('✅ Profil fotoğrafı yüklendi!');
    } catch (err) {
      setMessage(err.response?.data?.error || '❌ Profil fotoğrafı yüklenemedi.');
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      const res = await axios.put('/api/profile/me', form);
      setProfile(res.data.profile);
      setMessage('✅ Profil kaydedildi!');
    } catch {
      setMessage('❌ Kayıt sırasında hata oluştu.');
    } finally {
      setSaving(false);
    }
  };

  const handleCVUpload = async () => {
    if (!cvFile) return setMessage('Lütfen bir PDF seçin.');
    setUploading(true);
    setMessage('');
    const formData = new FormData();
    formData.append('cvFile', cvFile);
    try {
      const res = await axios.post('/api/profile/upload-cv', formData);
      setProfile(res.data.profile);
      setMessage('✅ CV başarıyla yüklendi!');
      setCvFile(null);
    } catch (err) {
      setMessage(err.response?.data?.error || '❌ CV yüklenemedi.');
    } finally {
      setUploading(false);
    }
  };

  const handleProfileUpdate = (updatedProfile) => {
    setProfile(updatedProfile);
    if (updatedProfile.avatarPath) {
      setAvatarPreview(getAvatarUrl(updatedProfile.avatarPath));
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (loading) return (
    <div className="page-dark flex items-center justify-center text-gray-400">
      Yükleniyor...
    </div>
  );

  return (
    <div className="page-dark">
      <div className="header-dark px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-100">Hoş geldin, {user?.name} 👋</h1>
          <p className="text-sm text-gray-400">{user?.email}</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(`/profile/${user?.id}`)}
            className="btn-ghost-link"
          >
            Profilimi Görüntüle
          </button>
          <button onClick={handleLogout} className="btn-secondary">
            Çıkış Yap
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto p-6 space-y-6">

        {message && (
          <div className={message.startsWith('✅') ? 'alert-success' : 'alert-error'}>
            {message}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="stat-card">
            <p className="text-3xl font-bold text-cyan-400">{profile?.profileViews || 0}</p>
            <p className="text-sm text-gray-400 mt-1">Profil Görüntülenme</p>
          </div>
          <div className="stat-card">
            <p className="text-3xl font-bold text-purple-400">{profile?.chatCount || 0}</p>
            <p className="text-sm text-gray-400 mt-1">Chatbot Sorusu</p>
          </div>
        </div>

        <div className="card-dark space-y-4">
          <h2 className="text-lg font-semibold text-gray-100">Profil Bilgileri</h2>

          <div className="flex flex-col sm:flex-row items-center gap-6 pb-4 border-b border-gray-800">
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="Profil"
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-700"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-3xl font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="flex-1 w-full space-y-3">
              <label className="label-dark">Profil Fotoğrafı</label>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleAvatarSelect}
                className="file-input-dark"
              />
              <p className="text-xs text-gray-500">JPEG, PNG, WebP veya GIF — en fazla 5 MB</p>
              <button
                onClick={handleAvatarUpload}
                disabled={uploadingAvatar || !avatarFile}
                className="btn-primary w-full sm:w-auto px-6"
              >
                {uploadingAvatar ? 'Yükleniyor...' : 'Fotoğrafı Yükle'}
              </button>
            </div>
          </div>

          <div>
            <label className="label-dark">Meslek Unvanı</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="örn: Full Stack Developer"
              maxLength={100}
              className="input-dark"
            />
          </div>

          <div>
            <label className="label-dark">Hakkında</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows={3}
              placeholder="Kendini kısaca tanıt..."
              className="input-dark resize-none"
            />
          </div>

          <div className="grid grid-cols-1 gap-3">
            {[
              { name: 'github',     label: 'GitHub',     placeholder: 'https://github.com/kullanici' },
              { name: 'linkedin',   label: 'LinkedIn',   placeholder: 'https://linkedin.com/in/kullanici' },
              { name: 'artstation', label: 'ArtStation', placeholder: 'https://www.artstation.com/kullanici' },
              { name: 'website',    label: 'Website',    placeholder: 'https://sitem.com' },
            ].map(({ name, label, placeholder }) => (
              <div key={name}>
                <label className="label-dark">{label}</label>
                <input
                  type="url"
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className="input-dark"
                />
              </div>
            ))}
          </div>

          <button onClick={handleSave} disabled={saving} className="btn-primary w-full">
            {saving ? 'Kaydediliyor...' : 'Profili Kaydet'}
          </button>
        </div>

        <SkillsEditor skills={profile?.skills} onUpdate={handleProfileUpdate} />
        <ExperienceEditor experience={profile?.experience} onUpdate={handleProfileUpdate} />
        <EducationEditor education={profile?.education} onUpdate={handleProfileUpdate} />
        <ProjectsEditor projects={profile?.projects} onUpdate={handleProfileUpdate} />

        <div className="card-dark space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-100">CV Yükle</h2>
            {profile?.cvPath && (
              <span className="text-xs bg-green-900/40 text-green-400 px-2 py-1 rounded-full border border-green-800">
                ✅ CV mevcut
              </span>
            )}
          </div>
          <p className="text-sm text-gray-400">
            PDF formatında CV yükle. Chatbot bu belgeyi analiz ederek ziyaretçilere seni tanıtacak.
          </p>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setCvFile(e.target.files[0])}
            className="file-input-dark"
          />
          <button
            onClick={handleCVUpload}
            disabled={uploading || !cvFile}
            className="btn-primary w-full bg-purple-600 hover:bg-purple-700"
          >
            {uploading ? 'Yükleniyor...' : 'CV Yükle'}
          </button>
        </div>

      </div>
    </div>
  );
}
