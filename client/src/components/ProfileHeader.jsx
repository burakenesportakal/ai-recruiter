import { getAvatarUrl } from '../utils/media';

export default function ProfileHeader({ user, profile }) {
  const links = profile?.links || {};
  const avatarUrl = getAvatarUrl(profile?.avatarPath);

  const socialLinks = [
    { name: 'GitHub', url: links.github, color: 'bg-gray-700 hover:bg-gray-600' },
    { name: 'LinkedIn', url: links.linkedin, color: 'bg-blue-600 hover:bg-blue-500' },
    { name: 'ArtStation', url: links.artstation, color: 'bg-pink-600 hover:bg-pink-500' },
    { name: 'Website', url: links.website, color: 'bg-green-600 hover:bg-green-500' },
  ].filter(link => link.url);

  return (
    <div className="bg-black border-b border-gray-800 px-6 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start gap-6">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={user.name}
              className="w-24 h-24 rounded-full object-cover flex-shrink-0 shadow-lg border-2 border-gray-700"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-4xl font-bold flex-shrink-0 shadow-lg">
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}

          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-100">{user.name}</h1>
            {profile.title && (
              <p className="text-lg text-cyan-400 mt-1">{profile.title}</p>
            )}
            <p className="text-gray-400 text-sm mt-2">{user.email}</p>
            {profile.bio && (
              <p className="text-gray-300 text-base mt-4 leading-relaxed max-w-3xl">{profile.bio}</p>
            )}

            {socialLinks.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-5">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className={`text-sm ${link.color} text-white px-4 py-2 rounded-full transition-all duration-200 hover:brightness-110 hover:scale-105`}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="text-right text-sm text-gray-400 flex-shrink-0">
            <p className="mb-1">
              <span className="text-2xl font-bold text-gray-100">{profile.profileViews}</span>
              <span className="block text-xs">görüntülenme</span>
            </p>
            <p>
              <span className="text-2xl font-bold text-gray-100">{profile.chatCount}</span>
              <span className="block text-xs">soru</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
