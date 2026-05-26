import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function PublicProfile() {
  const { userId } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [messages, setMessages] = useState([
    {
      role: 'model',
      text: 'Merhaba! Ben bu adayın AI asistanıyım. Yetenekleri, deneyimi veya uygun olduğu pozisyonlar hakkında soru sorabilirsiniz.',
    },
  ]);
  const [input, setInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    axios.get(`/api/profile/${userId}`)
      .then(res => setProfileData(res.data))
      .catch(() => setError('Profil bulunamadı.'))
      .finally(() => setLoading(false));
  }, [userId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || chatLoading) return;

    const newMessages = [...messages, { role: 'user', text }];
    setMessages(newMessages);
    setInput('');
    setChatLoading(true);

    try {
      const res = await axios.post(`/api/chat/${userId}`, { messages: newMessages });
      setMessages(prev => [...prev, { role: 'model', text: res.data.reply }]);
    } catch {
      setMessages(prev => [...prev, {
        role: 'model',
        text: 'Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.',
      }]);
    } finally {
      setChatLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center text-gray-500">
      Yükleniyor...
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center text-red-500">
      {error}
    </div>
  );

  const { user, profile } = profileData;
  const links = profile?.links || {};

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Profil Başlığı */}
      <div className="bg-white border-b px-6 py-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
              <p className="text-gray-500 text-sm mt-1">{user.email}</p>
              {profile.bio && (
                <p className="text-gray-600 text-sm mt-2">{profile.bio}</p>
              )}
              {/* Linkler */}
              <div className="flex flex-wrap gap-2 mt-3">
                {links.github && (
                  <a href={links.github} target="_blank" rel="noreferrer"
                    className="text-xs bg-gray-900 text-white px-3 py-1.5 rounded-full hover:bg-gray-700 transition">
                    GitHub
                  </a>
                )}
                {links.linkedin && (
                  <a href={links.linkedin} target="_blank" rel="noreferrer"
                    className="text-xs bg-blue-700 text-white px-3 py-1.5 rounded-full hover:bg-blue-600 transition">
                    LinkedIn
                  </a>
                )}
                {links.artbook && (
                  <a href={links.artbook} target="_blank" rel="noreferrer"
                    className="text-xs bg-pink-600 text-white px-3 py-1.5 rounded-full hover:bg-pink-500 transition">
                    ArtBook
                  </a>
                )}
                {links.website && (
                  <a href={links.website} target="_blank" rel="noreferrer"
                    className="text-xs bg-green-600 text-white px-3 py-1.5 rounded-full hover:bg-green-500 transition">
                    Website
                  </a>
                )}
              </div>
            </div>
            {/* İstatistikler */}
            <div className="text-right text-sm text-gray-400 flex-shrink-0">
              <p>{profile.profileViews} görüntülenme</p>
              <p>{profile.chatCount} soru</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chatbot */}
      <div className="flex-1 flex flex-col max-w-3xl w-full mx-auto p-4">
        <div className="bg-white rounded-xl border flex flex-col flex-1" style={{ minHeight: '500px' }}>

          {/* Chat başlığı */}
          <div className="px-4 py-3 border-b flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-sm font-medium text-gray-700">
              {user.name} hakkında AI ile konuş
            </span>
            {!profile.hasCV && (
              <span className="ml-auto text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                CV henüz yüklenmemiş
              </span>
            )}
          </div>

          {/* Mesajlar */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white rounded-br-sm'
                    : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {chatLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-500 px-4 py-3 rounded-2xl rounded-bl-sm text-sm">
                  <span className="animate-pulse">Yanıt yazılıyor...</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t p-4 flex gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Bu aday hakkında soru sor... (Enter ile gönder)"
              rows={1}
              className="flex-1 border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            <button
              onClick={sendMessage}
              disabled={chatLoading || !input.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white px-4 py-2.5 rounded-xl transition text-sm font-medium"
            >
              Gönder
            </button>
          </div>
        </div>

        {/* Öneri soruları */}
        <div className="mt-3 flex flex-wrap gap-2">
          {[
            'En güçlü teknik becerileri neler?',
            'Hangi pozisyonlara uygun?',
            'React deneyimi var mı?',
            'Takım çalışmasına uygun mu?',
          ].map((q) => (
            <button
              key={q}
              onClick={() => { setInput(q); }}
              className="text-xs bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded-full hover:bg-gray-50 transition"
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}