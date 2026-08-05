import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import BaggingAreaLayout from './features/main-bagging-area/components/BaggingAreaLayout'
import OperationsDashboard from './pages/OperationsDashboard'
import MainBaggingArea from './pages/MainBaggingArea'
import PackingBay from './pages/PackingBay'
import MovementSection from './pages/MovementSection'
import LoadingSection from './pages/LoadingSection'
import BayDetailView from './pages/BayDetailView'
import Analytics from './pages/Analytics'
import PpeCompliance from './pages/PpeCompliance'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<OperationsDashboard />} />
          <Route element={<BaggingAreaLayout />}>
            <Route path="main-bagging-area" element={<MainBaggingArea />} />
            <Route path="packing-bay" element={<PackingBay />} />
            <Route path="movement-section" element={<MovementSection />} />
            <Route path="loading-section" element={<LoadingSection />} />
          </Route>
          <Route path="bays/:bayId" element={<BayDetailView />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="ppe-compliance" element={<PpeCompliance />} />
          <Route path="*" element={<OperationsDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
