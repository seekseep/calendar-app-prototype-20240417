import { ReactNode } from 'react'

import Navigation from './components/Navigation'

export default function teamLayout ({
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
