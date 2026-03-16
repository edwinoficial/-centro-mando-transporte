import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './views/Dashboard'
import Usuarios from './views/Usuarios'
import Monitoreo from './views/Monitoreo'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/monitoreo" element={<Monitoreo />} />
      </Routes>
    </Layout>
  )
}
