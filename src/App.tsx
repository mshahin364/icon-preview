import {Header} from './components'
import Icons from "./components/icons/Icons.tsx";

function App() {

  return (
    <div className="app">
      <Header 
        title="Vite + React + Bootstrap" 
        subtitle="Built with TypeScript, Reactstrap & SCSS"
      />

      <main className="main-content">
        <Icons/>
      </main>
    </div>
  )
}

export default App
