'use client'

import { ReactNode } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
})

export default function Provider ({ children } : { children: ReactNode }) {
  return (
    <QueryClientProvider client={client}>
      {children}
    </QueryClientProvider>
  )
}
