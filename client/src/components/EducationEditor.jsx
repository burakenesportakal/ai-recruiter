import { useState } from 'react';
import axios from 'axios';

export default function EducationEditor({ education, onUpdate }) {
  const [form, setForm] = useState({
    institution: '',
    degree: '',
    fieldOfStudy: '',
    startDate: '',
    endDate: '',
    isCurrent: false,
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
      ...(name === 'isCurrent' && checked ? { endDate: '' } : {}),
    }));
  };

  const handleAdd = async () => {
    if (!form.institution.trim() || !form.degree.trim() || !form.fieldOfStudy.trim() || !form.startDate) {
      setMessage('❌ Kurum, derece, alan ve başlangıç tarihi gerekli');
      return;
    }

    setSaving(true);
    setMessage('');

    try {
      const newEdu = {
        institution: form.institution.trim(),
        degree: form.degree.trim(),
        fieldOfStudy: form.fieldOfStudy.trim(),
        startDate: form.startDate,
        endDate: form.isCurrent ? null : (form.endDate || null),
      };
      const updatedEducation = [...(education || []), newEdu];
      const res = await axios.put('/api/profile/me', { education: updatedEducation });
      onUpdate(res.data.profile);
      setForm({ institution: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '', isCurrent: false });
      setMessage('✅ Eğitim eklendi!');
    } catch (err) {
      setMessage(err.response?.data?.error || '❌ Hata oluştu');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (index) => {
    setSaving(true);
    setMessage('');

    try {
      const updatedEducation = education.filter((_, i) => i !== index);
      const res = await axios.put('/api/profile/me', { education: updatedEducation });
      onUpdate(res.data.profile);
      setMessage('✅ Eğitim silindi!');
    } catch (err) {
      setMessage(err.response?.data?.error || '❌ Hata oluştu');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="card-dark space-y-4">
      <h2 className="text-lg font-semibold text-gray-100">Eğitim</h2>

      {message && (
        <div className={message.startsWith('✅') ? 'alert-success' : 'alert-error'}>
          {message}
        </div>
      )}

      <div className="space-y-3">
        <input type="text" name="institution" value={form.institution} onChange={handleChange} placeholder="Kurum adı" className="input-dark" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input type="text" name="degree" value={form.degree} onChange={handleChange} placeholder="Derece (örn: Lisans)" className="input-dark" />
          <input type="text" name="fieldOfStudy" value={form.fieldOfStudy} onChange={handleChange} placeholder="Alan (örn: Bilgisayar Mühendisliği)" className="input-dark" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input type="date" name="startDate" value={form.startDate} onChange={handleChange} className="input-dark" />
          <input type="date" name="endDate" value={form.endDate} onChange={handleChange} disabled={form.isCurrent} className="input-dark disabled:opacity-50" />
        </div>
        <label className="flex items-center gap-2 text-sm text-gray-300">
          <input type="checkbox" name="isCurrent" checked={form.isCurrent} onChange={handleChange} className="rounded" />
          Devam ediyor
        </label>
        <button onClick={handleAdd} disabled={saving} className="btn-primary w-full">
          {saving ? 'Ekleniyor...' : 'Eğitim Ekle'}
        </button>
      </div>

      {education && education.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-300">Mevcut Eğitimler:</p>
          <div className="space-y-2">
            {education.map((edu, idx) => (
              <div key={idx} className="list-item-dark p-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-gray-100">{edu.degree} — {edu.fieldOfStudy}</p>
                    <p className="text-sm text-gray-400">{edu.institution}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(edu.startDate).toLocaleDateString('tr-TR')} - {edu.endDate ? new Date(edu.endDate).toLocaleDateString('tr-TR') : 'Devam ediyor'}
                    </p>
                  </div>
                  <button onClick={() => handleDelete(idx)} disabled={saving} className="text-red-400 hover:text-red-300 text-sm disabled:opacity-50">
                    Sil
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
