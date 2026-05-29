export default function ExperienceSection({ experience }) {
  if (!experience || experience.length === 0) {
    return (
      <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-6">
        <h2 className="text-2xl font-bold text-gray-100 mb-4">İş Deneyimi</h2>
        <p className="text-gray-400 text-sm">Henüz deneyim eklenmemiş.</p>
      </div>
    );
  }

  // Sort by start date (most recent first)
  const sortedExperience = [...experience].sort((a, b) => 
    new Date(b.startDate) - new Date(a.startDate)
  );

  const formatDate = (dateString, isEnd = false) => {
    if (!dateString) return isEnd ? 'Şu an' : '';
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-6">
      <h2 className="text-2xl font-bold text-gray-100 mb-6">İş Deneyimi</h2>
      
      <div className="relative border-l-2 border-gray-700 pl-6 space-y-8">
        {sortedExperience.map((exp, idx) => (
          <div key={idx} className="relative">
            {/* Timeline dot */}
            <div className="absolute -left-[1.6rem] top-1 w-3 h-3 rounded-full bg-cyan-500 border-4 border-gray-800"></div>
            
            {/* Content */}
            <div>
              <h3 className="text-lg font-semibold text-gray-100">{exp.title}</h3>
              <p className="text-cyan-400 font-medium mt-1">{exp.company}</p>
              <p className="text-sm text-gray-400 mt-1">
                {formatDate(exp.startDate)} - {formatDate(exp.endDate, true)}
              </p>
              {exp.description && (
                <p className="text-gray-300 text-sm mt-3 leading-relaxed">{exp.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
