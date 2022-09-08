import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

const USER_INPUT = [7, 8, 9, '*', 4, 5, 6, '-', 1, 2, 3, '+', '/', 0, '.', '=']

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App userInput={USER_INPUT} />
  </React.StrictMode>
)
