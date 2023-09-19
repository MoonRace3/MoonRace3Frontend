import { useEffect } from 'react'

export const useBackButtonListener = (callback: () => void) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.history.pushState(null, document.title, window.location.href)
      window.addEventListener('popstate', callback)
    }

    return () => {
      window.removeEventListener('popstate', callback)
    }
  }, [])
}
