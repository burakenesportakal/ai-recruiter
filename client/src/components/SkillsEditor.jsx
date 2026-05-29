import { useState, useMemo } from 'react';
import axios from 'axios';
import {
  SKILL_GROUPS,
  getActiveCategories,
  getSuggestionsForCategory,
  CATEGORY_BY_ID,
  skillExists,
  sortCategoryKeys,
} from '../data/skillsCatalog';

const DEFAULT_CATEGORY = 'Frontend';

export default function SkillsEditor({ skills, onUpdate }) {
  const [category, setCategory] = useState(DEFAULT_CATEGORY);
  const [name, setName] = useState('');
  const [suggestionFilter, setSuggestionFilter] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const activeCategories = useMemo(() => getActiveCategories(), []);

  const filteredSuggestions = useMemo(() => {
    const list = getSuggestionsForCategory(category);
    const q = suggestionFilter.trim().toLowerCase();
    if (!q) return list;
    return list.filter((s) => s.toLowerCase().includes(q));
  }, [category, suggestionFilter]);

  const groupedSkills = useMemo(() => {
    const acc = {};
    (skills || []).forEach((skill, index) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push({ ...skill, index });
    });
    return acc;
  }, [skills]);

  const addSkill = async (skillName) => {
    const trimmed = skillName.trim();
    if (!trimmed) {
      setMessage('❌ Yetenek adı gerekli');
      return;
    }
    if (skillExists(skills, category, trimmed)) {
      setMessage('❌ Bu yetenek bu kategoride zaten ekli');
      return;
    }

    setSaving(true);
    setMessage('');

    try {
      const updatedSkills = [...(skills || []), { category, name: trimmed }];
      const res = await axios.put('/api/profile/me', { skills: updatedSkills });
      onUpdate(res.data.profile);
      setName('');
      setSuggestionFilter('');
      setMessage('✅ Yetenek eklendi!');
    } catch (err) {
      setMessage(err.response?.data?.error || '❌ Hata oluştu');
    } finally {
      setSaving(false);
    }
  };

  const handleAdd = () => addSkill(name);

  const handleDelete = async (index) => {
    setSaving(true);
    setMessage('');

    try {
      const updatedSkills = skills.filter((_, i) => i !== index);
      const res = await axios.put('/api/profile/me', { skills: updatedSkills });
      onUpdate(res.data.profile);
      setMessage('✅ Yetenek silindi!');
    } catch (err) {
      setMessage(err.response?.data?.error || '❌ Hata oluştu');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="card-dark space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-gray-100">Yetenekler</h2>
        <p className="text-sm text-gray-400 mt-1">
          AI, veri mühendisliği, oyun, siber güvenlik, mobil ve 50+ kategori — önerilerden seç veya kendin yaz.
        </p>
      </div>

      {message && (
        <div className={message.startsWith('✅') ? 'alert-success' : 'alert-error'}>
          {message}
        </div>
      )}

      <div className="space-y-3">
        <label className="label-dark">Kategori</label>
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setSuggestionFilter('');
          }}
          className="select-dark w-full"
        >
          {SKILL_GROUPS.map((group) => (
            <optgroup key={group.id} label={group.label}>
              {activeCategories
                .filter((c) => c.group === group.id)
                .map((c) => (
                  <option key={c.id} value={c.id}>{c.id}</option>
                ))}
            </optgroup>
          ))}
        </select>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAdd())}
          placeholder="Özel yetenek yaz..."
          className="input-dark flex-1"
        />
        <button onClick={handleAdd} disabled={saving} className="btn-primary px-6 shrink-0">
          {saving ? 'Ekleniyor...' : 'Ekle'}
        </button>
      </div>

      {getSuggestionsForCategory(category).length > 0 && (
        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <p className="text-sm font-medium text-gray-300 shrink-0">
              Önerilen yetenekler
              <span className="text-gray-500 font-normal ml-1">
                ({CATEGORY_BY_ID[category]?.suggestions?.length || 0})
              </span>
            </p>
            <input
              type="search"
              value={suggestionFilter}
              onChange={(e) => setSuggestionFilter(e.target.value)}
              placeholder="Önerilerde ara..."
              className="input-dark py-2 text-xs sm:max-w-xs"
            />
          </div>
          <div className="max-h-48 overflow-y-auto rounded-lg border border-gray-800 bg-black/40 p-3">
            <div className="flex flex-wrap gap-2">
              {filteredSuggestions.map((suggestion) => {
                const already = skillExists(skills, category, suggestion);
                return (
                  <button
                    key={suggestion}
                    type="button"
                    disabled={saving || already}
                    onClick={() => addSkill(suggestion)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition ${
                      already
                        ? 'border-gray-700 text-gray-600 cursor-not-allowed'
                        : 'border-gray-600 text-gray-300 hover:border-cyan-500 hover:text-cyan-300 hover:bg-cyan-950/40'
                    }`}
                  >
                    {already ? '✓ ' : '+ '}{suggestion}
                  </button>
                );
              })}
              {filteredSuggestions.length === 0 && (
                <p className="text-xs text-gray-500">Eşleşen öneri yok.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {skills && skills.length > 0 && (
        <div className="space-y-4 pt-2 border-t border-gray-800">
          <p className="text-sm font-medium text-gray-300">
            Eklenen yetenekler ({skills.length})
          </p>
          {sortCategoryKeys(Object.keys(groupedSkills)).map((cat) => (
            <div key={cat}>
              <p className="text-xs font-semibold text-cyan-500/90 mb-2 uppercase tracking-wide">
                {cat}
              </p>
              <div className="space-y-1">
                {groupedSkills[cat].map(({ name: skillName, index }) => (
                  <div key={index} className="flex items-center justify-between list-item-dark">
                    <span className="text-sm text-gray-300">{skillName}</span>
                    <button
                      onClick={() => handleDelete(index)}
                      disabled={saving}
                      className="text-red-400 hover:text-red-300 text-sm disabled:opacity-50 shrink-0 ml-2"
                    >
                      Sil
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
