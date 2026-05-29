import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProfileHeader from '../components/ProfileHeader';
import SkillsSection from '../components/SkillsSection';
import ExperienceSection from '../components/ExperienceSection';
import EducationSection from '../components/EducationSection';
import ProjectsSection from '../components/ProjectsSection';

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
  const [suggestedQuestions, setSuggestedQuestions] = useState([]);
  const [questionsLoading, setQuestionsLoading] = useState(true);
  const bottomRef = useRef(null);

  useEffect(() => {
    axios.get(`/api/profile/${userId}`)
      .then(res => setProfileData(res.data))
      .catch(() => setError('Profil bulunamadı.'))
      .finally(() => setLoading(false));
  }, [userId]);

  useEffect(() => {
    if (!userId) return;
    setQuestionsLoading(true);
    axios.get(`/api/chat/${userId}/suggested-questions`)
      .then((res) => setSuggestedQuestions(res.data.questions || []))
      .catch(() => setSuggestedQuestions([]))
      .finally(() => setQuestionsLoading(false));
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
    <div className="page-dark flex items-center justify-center text-gray-400">
      Yükleniyor...
    </div>
  );

  if (error) return (
    <div className="page-dark flex items-center justify-center text-red-400">
      {error}
    </div>
  );

  const { user, profile } = profileData;

  return (
    <div className="page-dark flex flex-col">

      {/* Profile Header */}
      <ProfileHeader user={user} profile={profile} />

      {/* Profile Content */}
      <div className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-6 space-y-6">

        <SkillsSection skills={profile.skills} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ExperienceSection experience={profile.experience} />
          <EducationSection education={profile.education} />
        </div>

        <ProjectsSection projects={profile.projects} />

        {/* Chatbot */}
        <div className="bg-gray-900/90 rounded-xl border border-gray-800 flex flex-col" style={{ minHeight: '500px' }}>

          {/* Chat başlığı */}
          <div className="px-4 py-3 border-b border-gray-700 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-sm font-medium text-gray-100">
              {user.name} hakkında AI ile konuş
            </span>
            {!profile.hasCV && (
              <span className="ml-auto text-xs text-amber-400 bg-amber-900/30 px-2 py-1 rounded-full">
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
                    ? 'bg-cyan-600 text-white rounded-br-sm'
                    : 'bg-gray-700 text-gray-100 rounded-bl-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {chatLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-700 text-gray-300 px-4 py-3 rounded-2xl rounded-bl-sm text-sm">
                  <span className="animate-pulse">Yanıt yazılıyor...</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-700 p-4 flex gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Bu aday hakkında soru sor... (Enter ile gönder)"
              rows={1}
              className="flex-1 bg-gray-900 border border-gray-700 text-gray-100 placeholder-gray-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
            />
            <button
              onClick={sendMessage}
              disabled={chatLoading || !input.trim()}
              className="bg-cyan-600 hover:bg-cyan-700 disabled:opacity-40 text-white px-4 py-2.5 rounded-xl transition text-sm font-medium"
            >
              Gönder
            </button>
          </div>
        </div>

        {/* Öneri soruları — CV ve profile göre */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-400">
            {profile.hasCV ? 'CV\'ye göre önerilen sorular' : 'Profile göre önerilen sorular'}
          </p>
          {questionsLoading ? (
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4].map((i) => (
                <span
                  key={i}
                  className="h-8 w-40 rounded-full bg-gray-800 border border-gray-700 animate-pulse"
                />
              ))}
            </div>
          ) : suggestedQuestions.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => setInput(q)}
                  disabled={chatLoading}
                  className="text-xs text-left bg-gray-800 border border-gray-700 text-gray-300 px-3 py-1.5 rounded-full hover:bg-gray-700 hover:border-cyan-700/50 hover:text-cyan-200 transition disabled:opacity-40"
                >
                  {q}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-500">Öneri soruları yüklenemedi.</p>
          )}
        </div>
      </div>
    </div>
  );
}