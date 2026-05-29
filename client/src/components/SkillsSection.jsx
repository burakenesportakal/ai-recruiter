import {
  getCategoryPillClass,
  sortCategoryKeys,
  SKILL_GROUPS,
  CATEGORY_BY_ID,
} from '../data/skillsCatalog';

export default function SkillsSection({ skills }) {
  if (!skills || skills.length === 0) {
    return (
      <div className="bg-gray-900/90 rounded-xl border border-gray-800 p-6">
        <h2 className="text-2xl font-bold text-gray-100 mb-4">Yetenekler</h2>
        <p className="text-gray-400 text-sm">Henüz yetenek eklenmemiş.</p>
      </div>
    );
  }

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill.name);
    return acc;
  }, {});

  const sortedCategories = sortCategoryKeys(Object.keys(groupedSkills));

  const categoriesByGroup = SKILL_GROUPS.map((group) => ({
    ...group,
    categories: sortedCategories.filter(
      (cat) => CATEGORY_BY_ID[cat]?.group === group.id || (!CATEGORY_BY_ID[cat] && group.id === 'other')
    ),
  })).filter((g) => g.categories.length > 0);

  const uncategorized = sortedCategories.filter((cat) => !CATEGORY_BY_ID[cat]);
  if (uncategorized.length > 0 && !categoriesByGroup.some((g) => g.id === 'other')) {
    categoriesByGroup.push({ id: 'other', label: 'Diğer', categories: uncategorized });
  }

  return (
    <div className="bg-gray-900/90 rounded-xl border border-gray-800 p-6">
      <div className="flex flex-wrap items-end justify-between gap-2 mb-6">
        <h2 className="text-2xl font-bold text-gray-100">Yetenekler</h2>
        <span className="text-sm text-gray-500">
          {skills.length} yetenek · {sortedCategories.length} kategori
        </span>
      </div>

      <div className="space-y-8">
        {categoriesByGroup.map((group) => (
          <div key={group.id}>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 border-b border-gray-800 pb-2">
              {group.label}
            </h3>
            <div className="space-y-5">
              {group.categories.map((category) => (
                <div key={category}>
                  <h4 className="text-sm font-semibold text-gray-300 mb-3">{category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {groupedSkills[category].map((skillName, idx) => (
                      <span
                        key={idx}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 hover:scale-105 ${getCategoryPillClass(category)}`}
                      >
                        {skillName}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {categoriesByGroup.length === 0 && sortedCategories.map((category) => (
          <div key={category}>
            <h4 className="text-sm font-semibold text-gray-300 mb-3">{category}</h4>
            <div className="flex flex-wrap gap-2">
              {groupedSkills[category].map((skillName, idx) => (
                <span
                  key={idx}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 hover:scale-105 ${getCategoryPillClass(category)}`}
                >
                  {skillName}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
