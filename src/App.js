import React, { useState } from 'react';

function App() {
  const [prompt, setPrompt] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  // Функция для отправки запроса к FastAPI
  const askOllama = async () => {
    setLoading(true);
    setAnswer('');
    try {
      const res = await fetch('http://localhost:8000/ollama', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({prompt})
      });
      const data = await res.json();
      setAnswer(data.response || 'Нет ответа от модели.');
    } catch (err) {
      setAnswer('Ошибка при обращении к серверу.');
    }
    setLoading(false);
  };

  return (
    <div style={{
      maxWidth: 360, margin: "0 auto", padding: 20,
      borderRadius: 18, background: "#fff", boxShadow: "0 3px 20px rgba(0,0,0,0.08)"
    }}>
      <header style={{textAlign: "center", marginBottom: 30}}>
        <h2>👋 Добро пожаловать!</h2>
        <p>Мини-приложение ИИ-школы с Ollama</p>
      </header>
      <section style={{margin:"20px 0"}}>
        <input
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder="Задай вопрос ИИ…"
          style={{width: "100%", padding: 10, fontSize: "16px", borderRadius: 8, border: "1px solid #ccc"}}
        />
        <button
          onClick={askOllama}
          disabled={loading || !prompt}
          style={{
            marginTop: 12, width: "100%", padding: "14px",
            background: "#4e54c8", color: "#fff", fontSize: "17px",
            border: "none", borderRadius: "10px", cursor: "pointer"
          }}
        >
          {loading ? "Загрузка..." : "Спросить Ollama"}
        </button>
      </section>
      {answer && (
        <section style={{
          background: "#f3f5f9", padding: 14, borderRadius: 10, marginTop: 20, minHeight: 40
        }}>
          <b>Ответ:</b>
          <div>{answer}</div>
        </section>
      )}
    </div>
  );
}

export default App;
