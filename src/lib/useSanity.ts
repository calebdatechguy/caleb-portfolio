import { useState, useEffect } from 'react'
import { sanityClient } from './sanity'

// Generic hook for Sanity GROQ queries
export function useSanityQuery<T>(
  query: string,
  params: Record<string, string> = {},
  fallback: T | null = null
): { data: T | null; loading: boolean; error: string | null } {
  const [data, setData] = useState<T | null>(fallback)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    sanityClient
      .fetch<T>(query, params)
      .then((result) => {
        if (!cancelled) {
          setData(result)
          setLoading(false)
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message ?? 'Failed to fetch data')
          setLoading(false)
        }
      })

    return () => { cancelled = true }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, JSON.stringify(params)])

  return { data, loading, error }
}
