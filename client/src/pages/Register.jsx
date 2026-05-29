import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.name || !form.email || !form.password || !form.confirm) {
      return setError('Tüm alanları doldurun.');
    }
    if (form.password.length < 6) {
      return setError('Şifre en az 6 karakter olmalıdır.');
    }
    if (form.password !== form.confirm) {
      return setError('Şifreler eşleşmiyor.');
    }

    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Kayıt başarısız.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-dark flex items-center justify-center p-4">
      <div className="card-dark w-full max-w-md shadow-2xl shadow-black/50">
        <h1 className="text-2xl font-bold text-gray-100 mb-2">Hesap Oluştur</h1>
        <p className="text-gray-400 mb-6 text-sm">Profilini oluşturmak için kayıt ol.</p>

        {error && <div className="alert-error mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label-dark">Ad Soyad</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Adın Soyadın"
              className="input-dark"
            />
          </div>
          <div>
            <label className="label-dark">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="ornek@mail.com"
              className="input-dark"
            />
          </div>
          <div>
            <label className="label-dark">Şifre</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="En az 6 karakter"
              className="input-dark"
            />
          </div>
          <div>
            <label className="label-dark">Şifre Tekrar</label>
            <input
              type="password"
              name="confirm"
              value={form.confirm}
              onChange={handleChange}
              placeholder="Şifreni tekrar gir"
              className="input-dark"
            />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Kayıt yapılıyor...' : 'Kayıt Ol'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Zaten hesabın var mı?{' '}
          <Link to="/login" className="text-cyan-400 font-medium hover:underline">
            Giriş yap
          </Link>
        </p>
      </div>
    </div>
  );
}
