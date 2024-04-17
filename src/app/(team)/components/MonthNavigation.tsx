'use client'

import { Day, add, endOfMonth, endOfWeek, format, getDay, startOfMonth, startOfWeek } from 'date-fns'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import CircleIcon from '@mui/icons-material/Circle'
import { Box, Container, IconButton, Stack, Toolbar, Typography } from '@mui/material'
import { ja as locale } from 'date-fns/locale'

import { useGetAccountByTeamId } from '@/app/hooks/account'
import { useListSchedulesByAccountIdQuery } from '@/app/hooks/schedule'
import { CalendarSchedule } from '@/types/schedule'

import { useCalendarSchedules } from '../hooks'

export default function MonthNavigation({
  month, onNext, onPrev, weekStartsOn = 0
}: {
  month: string;
  weekStartsOn?: Day;
  onNext?: () => any;
  onPrev?: () => any;
}) {
  const monthLabel = useMemo(() => {
    const date = new Date(month)
    return format(date, 'yyyy年M月')
  }, [month])

  const { teamId } = useParams()
  const accountQuery = useGetAccountByTeamId(teamId)
  const scheduleQuery = useListSchedulesByAccountIdQuery(accountQuery.data?.id)
  const calendarSchedules = useCalendarSchedules(month, scheduleQuery.data)

  const weeks = useMemo(() => {
    const weeks: {
      date: Date
      active: boolean
      hasSchedules: boolean
    }[][] = []

    const monthStartDate = startOfMonth(new Date(month))
    const monthEndDate = endOfMonth(new Date(month))
    const startDate = startOfWeek(monthStartDate, { weekStartsOn })
    const endDate = endOfWeek(monthEndDate, { weekStartsOn })

    const schedulesByDate: Record<string, CalendarSchedule[]> = {}
    for (const schedule of calendarSchedules ?? []) {
      const date = format(schedule.startedAt, 'yyyy-MM-dd')
      if (!schedulesByDate[date]) schedulesByDate[date] = []
      schedulesByDate[date].push(schedule)
    }

    for (let weekStartDate = startDate; weekStartDate <= endDate; weekStartDate = add(weekStartDate, { weeks: 1 })) {
      const week: (typeof weeks)[number] = []
      for (let i = 0; i < 7; i++) {
        const date = add(weekStartDate, { days: i })
        const active = monthStartDate <= date && date <= monthEndDate
        const hasSchedules = schedulesByDate[format(date, 'yyyy-MM-dd')] !== undefined
        week.push({ date, active, hasSchedules })
      }
      weeks.push(week)
    }

    return weeks
  }, [month, weekStartsOn, calendarSchedules])

  return (
    <Box
      sx={{
        borderBottom     : 1,
        borderBottomColor: 'divider'
      }}>
      <Container maxWidth="sm">
        <Toolbar
          variant="dense"
          sx={{ justifyContent: 'center' }}>
          <IconButton onClick={onPrev}>
            <ChevronLeftIcon />
          </IconButton>
          <Typography>
            {monthLabel}
          </Typography>
          <IconButton onClick={onNext}>
            <ChevronRightIcon />
          </IconButton>
        </Toolbar>
        <Stack direction="column" spacing={1} pb={1}>
          <Stack direction="row">
            {weeks[0].map(({ date }) => (
              <Stack
                key={getDay(date)}
                flexGrow={1}
                alignItems="center">
                <Typography variant="caption" textAlign="center">
                  {format(date, 'E', { locale })}
                </Typography>
              </Stack>
            ))}
          </Stack>
          <Stack
            direction="column"
            spacing={1  }>
            {weeks.map((week, i) => (
              <Stack key={i} direction="row">
                {week.map(({ date, active, hasSchedules }, j) => (
                  <Stack
                    key={j}
                    flexGrow={1}
                    spacing={0.5}
                    direction="column"
                    alignItems="center"
                    width="100%">
                    <Typography
                      variant="caption"
                      textAlign="center"
                      lineHeight={1}
                      color={active ? 'text.priamry' : 'text.disabled'}>
                      {format(date, 'd')}
                    </Typography>
                    <Typography
                      variant="caption"
                      lineHeight={1}
                      color={active ? 'primary' : 'text.disabled'}>
                      <CircleIcon
                        fontSize="inherit"
                        sx={{ opacity: hasSchedules ? 1 : 0 }} />
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}
