import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({
    bio: '', github: '', linkedin: '', artbook: '', website: '',
  });
  const [cvFile, setCvFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  // Profili yükle
  useEffect(() => {
    axios.get('/api/profile/me')
      .then(res => {
        const p = res.data.profile;
        setProfile(p);
        setForm({
          bio:      p.bio || '',
          github:   p.links?.github || '',
          linkedin: p.links?.linkedin || '',
          artbook:  p.links?.artbook || '',
          website:  p.links?.website || '',
        });
      })
      .catch(() => setMessage('Profil yüklenemedi.'))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  // Profili kaydet
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

  // CV yükle
  const handleCVUpload = async () => {
    if (!cvFile) return setMessage('Lütfen bir PDF seçin.');
    setUploading(true);
    setMessage('');
    const formData = new FormData();
    formData.append('cvFile', cvFile);
    try {
      await axios.post('/api/profile/upload-cv', formData);
      setMessage('✅ CV başarıyla yüklendi!');
      setCvFile(null);
    } catch (err) {
      setMessage(err.response?.data?.error || '❌ CV yüklenemedi.');
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center text-gray-500">
      Yükleniyor...
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Hoş geldin, {user?.name} 👋</h1>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(`/profile/${user?.id}`)}
            className="text-sm text-blue-600 hover:underline"
          >
            Profilimi Görüntüle
          </button>
          <button
            onClick={handleLogout}
            className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition"
          >
            Çıkış Yap
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-6 space-y-6">

        {message && (
          <div className={`rounded-lg px-4 py-3 text-sm ${
            message.startsWith('✅')
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {message}
          </div>
        )}

        {/* İstatistikler */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border p-4 text-center">
            <p className="text-3xl font-bold text-blue-600">{profile?.profileViews || 0}</p>
            <p className="text-sm text-gray-500 mt-1">Profil Görüntülenme</p>
          </div>
          <div className="bg-white rounded-xl border p-4 text-center">
            <p className="text-3xl font-bold text-purple-600">{profile?.chatCount || 0}</p>
            <p className="text-sm text-gray-500 mt-1">Chatbot Sorusu</p>
          </div>
        </div>

        {/* Profil Bilgileri */}
        <div className="bg-white rounded-xl border p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">Profil Bilgileri</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hakkında</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows={3}
              placeholder="Kendini kısaca tanıt..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 gap-3">
            {[
              { name: 'github',   label: 'GitHub',   placeholder: 'https://github.com/kullanici' },
              { name: 'linkedin', label: 'LinkedIn',  placeholder: 'https://linkedin.com/in/kullanici' },
              { name: 'artbook',  label: 'ArtBook',   placeholder: 'https://artbook.com/...' },
              { name: 'website',  label: 'Website',   placeholder: 'https://sitem.com' },
            ].map(({ name, label, placeholder }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <input
                  type="url"
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg transition text-sm"
          >
            {saving ? 'Kaydediliyor...' : 'Profili Kaydet'}
          </button>
        </div>

        {/* CV Yükleme */}
        <div className="bg-white rounded-xl border p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">CV Yükle</h2>
            {profile?.cvPath && (
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                ✅ CV mevcut
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500">
            PDF formatında CV yükle. Chatbot bu belgeyi analiz ederek ziyaretçilere seni tanıtacak.
          </p>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setCvFile(e.target.files[0])}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <button
            onClick={handleCVUpload}
            disabled={uploading || !cvFile}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg transition text-sm"
          >
            {uploading ? 'Yükleniyor...' : 'CV Yükle'}
          </button>
        </div>

      </div>
    </div>
  );
}