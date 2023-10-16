import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { Songlist } from './components/Songlist'
import { SongCreate } from './components/SongCreate'
import { SongDetail } from './components/SongDetail'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Songlist />} />
        <Route path='/songs/new' element={<SongCreate />} />
        <Route path='/songs/:songId' element={<SongDetail />} />
        <Route path='*' element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
