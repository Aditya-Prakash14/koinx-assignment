import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import TaxLossHarvesting from './TaxLossHarvesting'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TaxLossHarvesting />
  </StrictMode>,
)