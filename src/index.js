import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

document.body.style.margin = '0';
document.body.style.background = 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)';
document.body.style.minHeight = '100vh';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
