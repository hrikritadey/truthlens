import { useState } from 'react';
import './App.css';
function App() {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);

    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async () => {
        if (!text.trim()) return;
        setLoading(true);
        setError(null);
        setResult(null);
        
        try {
            const res = await fetch('http://localhost:5000/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text }),
            });
            
            if (!res.ok) throw new Error('Request failed');
            
            const data = await res.json();
            setResult(data);
        } catch (err) {
            setError('Something went wrong. Try again.');
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div style={{ maxWidth: 600, margin: '40px auto', fontFamily: 'sans-serif' }}>
            <h1>TruthLens</h1>
            <p>Paste a headline or claim to check its credibility.</p>
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={5}
                style={{ width: '100%', padding: 10, fontSize: 14 }}
                placeholder="Paste a claim or headline here..."
            />
            <button
                onClick={handleSubmit}
                disabled={loading || !text.trim()}
                style={{ marginTop: 10, padding: '10px 20px', fontSize: 14 }}
            >
                {loading ? 'Analyzing...' : 'Check Credibility'}
            </button>
            
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {result && (
                <div style={{ marginTop: 20, padding: 15, border: '1px solid #ccc' }}>
                    <h2>Score: {result.score} / 100</h2>
                    <h3>Verdict: {result.verdict}</h3>
                    <h4>Reasoning:</h4>
                    <ul>
                        {result.reasoning.map((r, i) => ( <li key={i}>{r}</li> ))}
                    </ul>
                    {result.redFlags && result.redFlags.length > 0 && (
                        <>
                            <h4>Red Flags:</h4>
                            <ul>
                                {result.redFlags.map((f, i) => ( <li key={i}>{f}</li> ))}
                            </ul>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default App;