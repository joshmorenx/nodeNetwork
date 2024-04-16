// import React from 'react'
// entrypoint
import ReactDOM from 'react-dom/client'
import { Approuter } from './Approuter/Approuter'
import { BrowserRouter } from 'react-router-dom'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <BrowserRouter>
      <Approuter>

      </Approuter>
    </BrowserRouter>
  // </React.StrictMode>
)

// endpoint