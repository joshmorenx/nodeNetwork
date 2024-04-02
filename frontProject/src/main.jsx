// import React from 'react'
import ReactDOM from 'react-dom/client'
import { Approuter } from './Approuter/Approuter'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <BrowserRouter>
      <Approuter>

      </Approuter>
    </BrowserRouter>
  // </React.StrictMode>
)
