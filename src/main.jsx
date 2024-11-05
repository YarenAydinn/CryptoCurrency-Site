import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Chart, registerables } from 'chart.js';
import './index.css'
import './css/style.css'

Chart.register(...registerables);

createRoot(document.getElementById('root')).render(<App/>)
