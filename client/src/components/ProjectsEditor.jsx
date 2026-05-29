import { useState } from 'react';
import axios from 'axios';

export default function ProjectsEditor({ projects, onUpdate }) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    technologies: '',
    githubUrl: '',
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAdd = async () => {
    if (!form.name.trim() || !form.description.trim()) {
      setMessage('❌ Proje adı ve açıklama gerekli');
      return;
    }

    setSaving(true);
    setMessage('');

    try {
      const newProject = {
        name: form.name.trim(),
        description: form.description.trim(),
        technologies: form.technologies.split(',').map(t => t.trim()).filter(t => t),
        githubUrl: form.githubUrl.trim(),
      };
      const updatedProjects = [...(projects || []), newProject];
      const res = await axios.put('/api/profile/me', { projects: updatedProjects });
      onUpdate(res.data.profile);
      setForm({ name: '', description: '', technologies: '', githubUrl: '' });
      setMessage('✅ Proje eklendi!');
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
      const updatedProjects = projects.filter((_, i) => i !== index);
      const res = await axios.put('/api/profile/me', { projects: updatedProjects });
      onUpdate(res.data.profile);
      setMessage('✅ Proje silindi!');
    } catch (err) {
      setMessage(err.response?.data?.error || '❌ Hata oluştu');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="card-dark space-y-4">
      <h2 className="text-lg font-semibold text-gray-100">Projeler</h2>

      {message && (
        <div className={message.startsWith('✅') ? 'alert-success' : 'alert-error'}>
          {message}
        </div>
      )}

      <div className="space-y-3">
        <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Proje adı" className="input-dark" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Proje açıklaması" rows={3} className="input-dark resize-none" />
        <input type="text" name="technologies" value={form.technologies} onChange={handleChange} placeholder="Teknolojiler (virgülle ayırın: React, Node.js, MongoDB)" className="input-dark" />
        <input type="url" name="githubUrl" value={form.githubUrl} onChange={handleChange} placeholder="GitHub URL (opsiyonel)" className="input-dark" />
        <button onClick={handleAdd} disabled={saving} className="btn-primary w-full">
          {saving ? 'Ekleniyor...' : 'Proje Ekle'}
        </button>
      </div>

      {projects && projects.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-300">Mevcut Projeler:</p>
          <div className="space-y-2">
            {projects.map((project, idx) => (
              <div key={idx} className="list-item-dark p-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-gray-100">{project.name}</p>
                    <p className="text-sm text-gray-400 mt-1">{project.description}</p>
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {project.technologies.map((tech, techIdx) => (
                          <span key={techIdx} className="text-xs bg-cyan-900/40 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800/50">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-xs text-cyan-400 hover:underline mt-1 inline-block">
                        GitHub'da Görüntüle
                      </a>
                    )}
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
