'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { Alert, CircularProgress, Container } from '@mui/material'

import { useListTeamsQuery } from '@/app/hooks/team'

export default function NavigateTeam () {
  const router = useRouter()
  const teamsQuery = useListTeamsQuery()

  useEffect(() => {
    if (!teamsQuery.data) return
    const team = teamsQuery.data[0]
    if (!team) return
    router.push(`/teams/${team.id}`)
  }, [router, teamsQuery.data])

  return (
    <Container sx={{ py: 12 }}>
      {teamsQuery.isError && <Alert severity="error">{teamsQuery.error.message}</Alert>}
      {teamsQuery.isSuccess && (
        teamsQuery.data?.length === 0 ? (
          <Alert severity="error">チームが存在しません</Alert>
        ) : (
          <Alert severity="info">リダイレクト中</Alert>
        )
      )}
      {teamsQuery.isLoading && <CircularProgress />}
    </Container>
  )
}
