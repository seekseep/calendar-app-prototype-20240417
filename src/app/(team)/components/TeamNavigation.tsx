'use client'

import { useParams, useRouter } from 'next/navigation'

import { Divider, List, ListItem, ListItemButton, ListItemText, Toolbar } from '@mui/material'

import { useListTeamsQuery } from '@/app/hooks/team'

export default function TeamNavigation ({
  onClose
}: {
  onClose: () => any
}) {
  const router = useRouter()
  const { teamId } = useParams()
  const teamQuery = useListTeamsQuery()

  return (
    <div>
      <Toolbar />
      <Divider />
      {teamQuery.isSuccess && (
        <List>
        {teamQuery.data.map(team => (
          <ListItem key={team.id} disablePadding>
            <ListItemButton
              selected={teamId === team.id}
              onClick={() => {
                router.push(`/teams/${team.id}`)
                onClose && onClose()
              }}>
              <ListItemText primary={team.name} />
            </ListItemButton>
          </ListItem>
        ))}
        </List>
      )}
    </div>
  )
}
