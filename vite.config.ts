import { readFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    {
      name: 'cv-pdf',
      // Keep the source text-safe and serve the original PDF bytes.
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url?.split('?')[0] !== '/documents/CV_Luqman_Cybersecurity.pdf') {
            next()
            return
          }
          res.setHeader('Content-Type', 'application/pdf')
          res.end(Buffer.from(readFileSync(new URL('./assets/CV_Luqman_Cybersecurity.pdf.base64', import.meta.url), 'utf8').trim(), 'base64'))
        })
      },
      generateBundle() {
        this.emitFile({
          type: 'asset',
          fileName: 'documents/CV_Luqman_Cybersecurity.pdf',
          source: Buffer.from(readFileSync(new URL('./assets/CV_Luqman_Cybersecurity.pdf.base64', import.meta.url), 'utf8').trim(), 'base64'),
        })
      },
    },
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
})
