import { useState } from 'react';
import axios from 'axios';

export default function UploadCV() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Lütfen bir PDF seçin!");

    const formData = new FormData();
    formData.append('cvFile', file);

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/upload-cv', formData);
      // Backend'den gelen yapay zeka özetini ekrana basıyoruz
      setResult(response.data.aiSummary); 
    } catch (error) {
      console.error("Yükleme hatası detayı:", error.response?.data || error.message);
      // Buradaki ters tırnak (`) hatası düzeltildi
      alert(`Hata: ${error.response?.data?.error || "Dosya yüklenemedi."}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg max-w-lg mx-auto mt-10 text-center">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Yeteneklerini Yapay Zekaya Tanıt</h2>
      <p className="mb-4 text-gray-500">Geliştirdiğin sistemlerin mimarisini anlatan bir dokümanı veya özgeçmişini PDF olarak yükle.</p>
      
      <input 
        type="file" 
        accept="application/pdf" 
        onChange={(e) => setFile(e.target.files[0])} 
        className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" 
      />
      
      <button 
        onClick={handleUpload} 
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded shadow"
      >
        {loading ? "Okunuyor..." : "Yükle ve Oku"}
      </button>
      
      {result && (
        <div className="mt-8 text-left bg-white p-6 rounded-lg border shadow-lg">
          <h3 className="font-bold text-xl text-blue-800 mb-4 border-b pb-2">🤖 Yapay Zeka Değerlendirmesi:</h3>
          <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{result}</p>
        </div>
      )}
    </div>
  );
}