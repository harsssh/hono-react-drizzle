import { createRoot } from 'react-dom/client'

function App() {
  return (
    <div>
      <h1>Hello, World!</h1>
    </div>
  )
}

// biome-ignore lint:
const domNode = document.getElementById('root')!
const root = createRoot(domNode)
root.render(<App />)
