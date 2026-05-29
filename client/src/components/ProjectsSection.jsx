export default function ProjectsSection({ projects }) {
  if (!projects || projects.length === 0) {
    return (
      <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-6">
        <h2 className="text-2xl font-bold text-gray-100 mb-4">Projeler</h2>
        <p className="text-gray-400 text-sm">Henüz proje eklenmemiş.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-6">
      <h2 className="text-2xl font-bold text-gray-100 mb-6">Projeler</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="bg-gray-800/50 rounded-xl p-5 border border-gray-700/50 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1 transition-all duration-300"
          >
            <h3 className="text-lg font-semibold text-gray-100 mb-2">{project.name}</h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">{project.description}</p>
            
            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, techIdx) => (
                  <span
                    key={techIdx}
                    className="text-xs bg-gray-700/50 text-gray-300 px-2 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
            
            {/* GitHub Link */}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-block bg-gray-700 hover:bg-gray-600 text-gray-100 text-sm px-4 py-2 rounded-lg transition-colors duration-200"
              >
                GitHub'da Görüntüle
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
