import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.email || !form.password) {
      return setError('Tüm alanları doldurun.');
    }

    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Giriş başarısız.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-dark flex items-center justify-center p-4">
      <div className="card-dark w-full max-w-md shadow-2xl shadow-black/50">
        <h1 className="text-2xl font-bold text-gray-100 mb-2">Giriş Yap</h1>
        <p className="text-gray-400 mb-6 text-sm">Hesabına erişmek için giriş yap.</p>

        {error && <div className="alert-error mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
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
              placeholder="••••••"
              className="input-dark"
            />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Hesabın yok mu?{' '}
          <Link to="/register" className="text-cyan-400 font-medium hover:underline">
            Kayıt ol
          </Link>
        </p>
      </div>
    </div>
  );
}
