import { ReactNode } from 'react'

import { Navigation } from '@mui/icons-material'

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
