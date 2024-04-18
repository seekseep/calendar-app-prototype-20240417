'use client'

import { ReactNode } from 'react'

import Navigation from '../components/Navigation'

export default function TeamLayout ({
  children
} : {
  children: ReactNode
}) {
  return (
    <Navigation>
      {children}
    </Navigation>
  )
}
