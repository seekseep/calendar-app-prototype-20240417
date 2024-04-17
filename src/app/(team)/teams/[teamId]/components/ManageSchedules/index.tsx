'use client'

import { useState } from 'react'

import AddIcon from '@mui/icons-material/Add'
import { Fab } from '@mui/material'
import Alert from '@mui/material/Alert'

import { useCalendarSchedules, useMonth } from '@/app/(team)/hooks'
import { useGetAccountByTeamId } from '@/app/hooks/account'
import { useListSchedulesByAccountIdQuery } from '@/app/hooks/schedule'
import { CalendarSchedule } from '@/types/schedule'

import CreateScheduleDrawer from '../CreateScheduleDrawer'
import ScheduleList from '../ScheduleList'
import UpdateScheduleDrawer from '../UpdateScheduleDrawer'

export default function ManageSchedules ({ teamId }: { teamId: string }) {
  const month = useMonth()
  const accountQuery = useGetAccountByTeamId(teamId)
  const scheduleQuery = useListSchedulesByAccountIdQuery(accountQuery.data?.id)
  const calendarSchedules = useCalendarSchedules(month, scheduleQuery.data)

  const [createDrawerOpen, setCreateDrawerOpen] = useState(false)
  const [selectedSchedule, setSelectedSchedule] = useState<CalendarSchedule | null>(null)

  return (
    <>
      {accountQuery.isError && (<Alert severity="error">{accountQuery.error.message}</Alert>)}
      {scheduleQuery.isError && (<Alert severity="error">{scheduleQuery.error.message}</Alert>)}
      <ScheduleList
        month={month}
        onSelectSchedule={schedule => setSelectedSchedule(schedule)}
        schduels={calendarSchedules} />
      <Fab
        color="primary"
        onClick={() => setCreateDrawerOpen(true)}
        sx={{
          position: 'fixed',
          right   : '1rem',
          bottom  : '1rem',
        }}>
        <AddIcon />
      </Fab>
      <CreateScheduleDrawer
        month={month}
        open={createDrawerOpen}
        toggle={() => setCreateDrawerOpen(value => !value)} />
      <UpdateScheduleDrawer
        open={!!selectedSchedule}
        schedule={selectedSchedule}
        toggle={() => setSelectedSchedule(null)} />
    </>
  )
}
