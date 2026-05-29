import { useState } from 'react';
import axios from 'axios';

export default function ExperienceEditor({ experience, onUpdate }) {
  const [form, setForm] = useState({
    company: '',
    title: '',
    startDate: '',
    endDate: '',
    description: '',
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
    if (!form.company.trim() || !form.title.trim() || !form.startDate) {
      setMessage('❌ Şirket, pozisyon ve başlangıç tarihi gerekli');
      return;
    }

    setSaving(true);
    setMessage('');

    try {
      const newExp = {
        company: form.company.trim(),
        title: form.title.trim(),
        startDate: form.startDate,
        endDate: form.isCurrent ? null : (form.endDate || null),
        description: form.description.trim(),
      };
      const updatedExperience = [...(experience || []), newExp];
      const res = await axios.put('/api/profile/me', { experience: updatedExperience });
      onUpdate(res.data.profile);
      setForm({ company: '', title: '', startDate: '', endDate: '', description: '', isCurrent: false });
      setMessage('✅ Deneyim eklendi!');
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
      const updatedExperience = experience.filter((_, i) => i !== index);
      const res = await axios.put('/api/profile/me', { experience: updatedExperience });
      onUpdate(res.data.profile);
      setMessage('✅ Deneyim silindi!');
    } catch (err) {
      setMessage(err.response?.data?.error || '❌ Hata oluştu');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="card-dark space-y-4">
      <h2 className="text-lg font-semibold text-gray-100">İş Deneyimi</h2>

      {message && (
        <div className={message.startsWith('✅') ? 'alert-success' : 'alert-error'}>
          {message}
        </div>
      )}

      <div className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input type="text" name="company" value={form.company} onChange={handleChange} placeholder="Şirket adı" className="input-dark" />
          <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Pozisyon" className="input-dark" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input type="date" name="startDate" value={form.startDate} onChange={handleChange} className="input-dark" />
          <input type="date" name="endDate" value={form.endDate} onChange={handleChange} disabled={form.isCurrent} className="input-dark disabled:opacity-50" />
        </div>
        <label className="flex items-center gap-2 text-sm text-gray-300">
          <input type="checkbox" name="isCurrent" checked={form.isCurrent} onChange={handleChange} className="rounded" />
          Halen çalışıyorum
        </label>
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="İş tanımı (opsiyonel)" rows={3} className="input-dark resize-none" />
        <button onClick={handleAdd} disabled={saving} className="btn-primary w-full">
          {saving ? 'Ekleniyor...' : 'Deneyim Ekle'}
        </button>
      </div>

      {experience && experience.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-300">Mevcut Deneyimler:</p>
          <div className="space-y-2">
            {experience.map((exp, idx) => (
              <div key={idx} className="list-item-dark p-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-gray-100">{exp.title}</p>
                    <p className="text-sm text-gray-400">{exp.company}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(exp.startDate).toLocaleDateString('tr-TR')} - {exp.endDate ? new Date(exp.endDate).toLocaleDateString('tr-TR') : 'Şu an'}
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
