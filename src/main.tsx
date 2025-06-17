import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ArtifactFrame } from '@artifact/client/react'
import App from './App'
import './index.css'

const mockRepos = {
  demo: {
    main: {
      'README.md': '# Demo repo'
    }
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ArtifactFrame
      mockRepos={mockRepos}
      mockFrameProps={{ expandedAccess: [] }}
    >
      <App />
    </ArtifactFrame>
  </StrictMode>
)
