'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div style={{ padding: '50px', textAlign: 'center', color: 'white', backgroundColor: '#0a0e27', minHeight: '100vh' }}>
          <h1>Something went wrong!</h1>
          <p>{error.message}</p>
          <button 
            onClick={reset}
            style={{ 
              padding: '10px 20px', 
              backgroundColor: '#a8d5e2', 
              color: '#0a0e27', 
              border: 'none', 
              cursor: 'pointer',
              marginTop: '20px'
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
