'use client'

import { format } from 'date-fns'

import { Card, Container, Stack, Typography } from '@mui/material'
import { ja as locale } from 'date-fns/locale'

import { CalendarSchedule } from '@/types/schedule'

import { useRows } from './hooks'

export default function ScheduleList ({
  month,
  onSelectSchedule,
  schduels,
}: {
  month: string
  onSelectSchedule: (schedule: CalendarSchedule) => any
  schduels?: CalendarSchedule[]
}) {

  const rows = useRows(month, schduels)

  return (
    <>
      <Container
        maxWidth="md"
        sx={{
          px: 0,
          py: 2
        }}>
        {rows.map(row => (
          <Stack
            key={row.date.getTime()}
            direction="row"
            alignItems="start"
            borderBottom={1}
            borderColor="divider" py={1}>
            <Stack width={64} alignItems="center">
              <Typography variant="caption">{format(row.date, 'E', { locale })}</Typography>
              <Typography variant="h6">{format(row.date, 'd')}</Typography>
            </Stack>
            <Stack flexGrow={1} pr={1}>
              {row.schedules.map(schedule => (
                <Card variant="outlined" key={schedule.id} sx={{ p: 1 }} onClick={() => onSelectSchedule(schedule)}>
                  <Stack>
                    <Stack direction="row" spacing={1}>
                      <Typography variant="h6">{format(schedule.startedAt, 'HH:mm')}</Typography>
                      <Typography variant="h6"> - </Typography>
                      <Typography variant="h6">{format(schedule.finishedAt, 'HH:mm')}</Typography>
                    </Stack>
                  </Stack>
                </Card>
              ))}
            </Stack>
          </Stack>
        ))}
      </Container>
    </>
  )
}
