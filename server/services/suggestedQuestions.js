const crypto = require('crypto');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = process.env.GEMINI_API_KEY
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null;

function profileContextHash(profile) {
  const payload = [
    profile.cvText || '',
    profile.bio || '',
    profile.title || '',
    JSON.stringify(profile.skills?.slice(0, 30) || []),
    JSON.stringify(profile.experience?.slice(0, 8) || []),
    JSON.stringify(profile.education?.slice(0, 5) || []),
    JSON.stringify(profile.projects?.slice(0, 5) || []),
  ].join('|||');
  return crypto.createHash('sha256').update(payload).digest('hex').slice(0, 16);
}

function buildProfileSummary(profile, userName) {
  const parts = [`Aday: ${userName}`];

  if (profile.title) parts.push(`Unvan: ${profile.title}`);
  if (profile.bio) parts.push(`Bio: ${profile.bio}`);

  if (profile.skills?.length) {
    const byCat = profile.skills.reduce((acc, s) => {
      if (!acc[s.category]) acc[s.category] = [];
      acc[s.category].push(s.name);
      return acc;
    }, {});
    parts.push('Yetenekler:\n' + Object.entries(byCat)
      .map(([cat, names]) => `- ${cat}: ${names.join(', ')}`)
      .join('\n'));
  }

  if (profile.experience?.length) {
    parts.push('Deneyim:\n' + profile.experience.map((e) =>
      `- ${e.title} @ ${e.company}${e.description ? ` — ${e.description.slice(0, 120)}` : ''}`
    ).join('\n'));
  }

  if (profile.education?.length) {
    parts.push('Eğitim:\n' + profile.education.map((e) =>
      `- ${e.degree}, ${e.fieldOfStudy} — ${e.institution}`
    ).join('\n'));
  }

  if (profile.projects?.length) {
    parts.push('Projeler:\n' + profile.projects.map((p) =>
      `- ${p.name}: ${p.description?.slice(0, 100) || ''} (${(p.technologies || []).join(', ')})`
    ).join('\n'));
  }

  if (profile.cvText) {
    const cv = profile.cvText.length > 12000
      ? profile.cvText.slice(0, 12000) + '\n...[CV kısaltıldı]'
      : profile.cvText;
    parts.push(`CV METNİ:\n${cv}`);
  }

  return parts.join('\n\n');
}

function getFallbackQuestions(profile, userName) {
  const questions = [];
  const firstName = userName.split(' ')[0] || userName;

  if (profile.cvText) {
    questions.push(`${firstName}'in CV'sine göre en güçlü teknik alanları neler?`);
    questions.push(`Bu aday hangi seviye pozisyonlara uygun görünüyor?`);
  }

  const topSkills = (profile.skills || []).slice(0, 3).map((s) => s.name);
  if (topSkills.length) {
    questions.push(`${topSkills.join(', ')} konularındaki deneyimi ne kadar derin?`);
  }

  const latestExp = profile.experience?.[0];
  if (latestExp) {
    questions.push(`${latestExp.title} rolündeki sorumlulukları nelerdi?`);
  } else if (profile.title) {
    questions.push(`${profile.title} olarak hangi projelerde çalışmış?`);
  }

  const topProject = profile.projects?.[0];
  if (topProject) {
    questions.push(`"${topProject.name}" projesinde hangi katkıları sağlamış?`);
  }

  const defaults = [
    'Takım çalışmasına ve iletişime ne kadar uygun?',
    'Bu aday için dikkat edilmesi gereken gelişim alanları neler?',
    'Kısa sürede hangi görevlere adapte olabilir?',
  ];

  for (const q of defaults) {
    if (questions.length >= 5) break;
    if (!questions.includes(q)) questions.push(q);
  }

  return questions.slice(0, 5);
}

function parseQuestionsFromModel(text) {
  const trimmed = text.trim();
  try {
    const jsonMatch = trimmed.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      const list = parsed.questions || parsed.sorular;
      if (Array.isArray(list)) {
        return list
          .filter((q) => typeof q === 'string' && q.trim().length > 10)
          .map((q) => q.trim())
          .slice(0, 6);
      }
    }
  } catch {
    // fall through
  }

  const lines = trimmed
    .split('\n')
    .map((l) => l.replace(/^[\d.\-*)\s]+/, '').trim())
    .filter((l) => l.length > 15 && l.endsWith('?'));

  return lines.slice(0, 6);
}

async function generateWithAI(profile, userName) {
  if (!genAI) return null;

  const summary = buildProfileSummary(profile, userName);
  const hasCv = Boolean(profile.cvText?.trim());

  const prompt = `Sen bir IT işe alım uzmanısın. Aşağıdaki aday profiline göre, profili ziyaret eden işverenlerin chatbot'a sorabileceği ${hasCv ? '5' : '4'} adet kısa Türkçe soru üret.

Kurallar:
- Sorular CV ve profildeki GERÇEK bilgilere dayansın; uydurma teknoloji veya şirket ekleme
- Her soru tek cümle, soru işareti ile bitsin, max 90 karakter
- Somut olsun (teknoloji adı, rol, proje, sektör vb. profilde geçiyorsa kullan)
- Genel "becerileri neler" yerine spesifik sorular tercih et
- Sadece JSON döndür, başka metin yok: {"questions": ["...", "..."]}

ADAY PROFİLİ:
${summary}`;

  const model = genAI.getGenerativeModel({ model: 'gemini-3.5-flash' });
  const result = await model.generateContent(prompt);
  const text = result.response.text();
  const parsed = parseQuestionsFromModel(text);

  return parsed.length >= 3 ? parsed : null;
}

async function generateSuggestedQuestions(profile, userName) {
  let questions = null;

  try {
    questions = await generateWithAI(profile, userName);
  } catch (err) {
    console.error('Öneri soru AI hatası:', err.message);
  }

  if (!questions?.length) {
    questions = getFallbackQuestions(profile, userName);
  }

  return questions.slice(0, 5);
}

async function ensureSuggestedQuestions(profile, userName) {
  const hash = profileContextHash(profile);
  const cached = profile.suggestedQuestions || [];

  if (cached.length >= 3 && profile.suggestedQuestionsHash === hash) {
    return { questions: cached, cached: true };
  }

  const questions = await generateSuggestedQuestions(profile, userName);

  profile.suggestedQuestions = questions;
  profile.suggestedQuestionsHash = hash;
  await profile.save();

  return { questions, cached: false };
}

module.exports = {
  profileContextHash,
  generateSuggestedQuestions,
  ensureSuggestedQuestions,
  getFallbackQuestions,
};
