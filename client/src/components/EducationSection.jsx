export default function EducationSection({ education }) {
  if (!education || education.length === 0) {
    return (
      <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-6">
        <h2 className="text-2xl font-bold text-gray-100 mb-4">Eğitim</h2>
        <p className="text-gray-400 text-sm">Henüz eğitim bilgisi eklenmemiş.</p>
      </div>
    );
  }

  // Sort by start date (most recent first)
  const sortedEducation = [...education].sort((a, b) => 
    new Date(b.startDate) - new Date(a.startDate)
  );

  const formatDate = (dateString, isEnd = false) => {
    if (!dateString) return isEnd ? 'Devam ediyor' : '';
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-6">
      <h2 className="text-2xl font-bold text-gray-100 mb-6">Eğitim</h2>
      
      <div className="relative border-l-2 border-gray-700 pl-6 space-y-8">
        {sortedEducation.map((edu, idx) => (
          <div key={idx} className="relative">
            {/* Timeline dot */}
            <div className="absolute -left-[1.6rem] top-1 w-3 h-3 rounded-full bg-blue-500 border-4 border-gray-800"></div>
            
            {/* Content */}
            <div>
              <h3 className="text-lg font-semibold text-gray-100">{edu.degree}</h3>
              <p className="text-blue-400 font-medium mt-1">{edu.institution}</p>
              <p className="text-gray-300 text-sm mt-1">{edu.fieldOfStudy}</p>
              <p className="text-sm text-gray-400 mt-1">
                {formatDate(edu.startDate)} - {formatDate(edu.endDate, true)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
