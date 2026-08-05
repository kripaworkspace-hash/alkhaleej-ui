import { Outlet } from 'react-router-dom'
import TopMenuBar from './TopMenuBar'
import conveyorScene from '../../assets/images/conveyor-scene.svg'

function AppLayout() {
  return (
    <div className="relative flex min-h-screen flex-col bg-white text-slate-700">
      {/* Backdrop: brand blooms give the glass something to refract,
          the conveyor scene sits behind them as a low-contrast watermark. */}
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        {/* <div className="absolute -top-32 -left-24 h-96 w-96 rounded-full bg-[#2098e8]/25 blur-3xl" /> */}
        <div className="absolute top-1/3 -right-24 h-[28rem] w-[28rem] rounded-full bg-sky-300/25 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-cyan-200/30 blur-3xl" />
        {/* The conveyor scene itself lives in the dashboard hero band, where
            content sits directly on it; here it's only a faint page echo. */}
        <div
          className="absolute inset-x-0 bottom-0 h-[55vh] bg-contain bg-bottom bg-no-repeat opacity-[0.07]"
          style={{ backgroundImage: `url(${conveyorScene})` }}
        />
      </div>

      <TopMenuBar />

      {/* Fills the viewport below the 4rem bar, so pages can stretch rather
          than leaving dead space under them on tall screens. */}
      <main className="relative z-10 mx-auto flex w-full max-w-[1800px] flex-1 flex-col px-3 py-3 sm:px-5 sm:py-4 lg:min-h-[calc(100dvh-4rem)]">
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout
