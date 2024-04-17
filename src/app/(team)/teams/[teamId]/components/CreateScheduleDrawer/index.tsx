'use client'

import { format } from 'date-fns'
import { useForm, FormProvider } from 'react-hook-form'

import { Button, Chip, Container, Drawer, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'

type FormValues = {
  date: string
  startedTime: string
  finishedTime: string
  repeatType: string
  repeatFinishType: string
  repeatFinishedDate: string
  repeatCount: string
  repeatWeekdays: string[]
}

function CreateScheduleForm ({
  month
}: {
  month: string
}) {
  const methods = useForm<FormValues>({
    defaultValues: {
      date              : format(new Date(month), 'yyyy-MM-dd'),
      startedTime       : '09:00',
      finishedTime      : '10:00',
      repeatType        : 'none',
      repeatFinishType  : 'none',
      repeatFinishedDate: format(new Date(month), 'yyyy-MM-dd'),
      repeatCount       : '1',
      repeatWeekdays    : [],
    },
  })

  const repeatType = methods.watch('repeatType')
  const repeatFinishType = methods.watch('repeatFinishType')
  const repeatWeekdays = methods.watch('repeatWeekdays')

  return (
    <FormProvider {...methods}>
    <Stack direction="column" spacing={2}>
      <Typography variant="h6">予定の登録</Typography>
      <TextField size="small" label="日付" type="date" {...methods.register('date')}  />
      <Stack direction="row" spacing={1} alignItems="center">
        <TextField sx={{ flexGrow: 1 }} size="small" label="開始時刻" {...methods.register('startedTime')}  />
        <Typography>-</Typography>
        <TextField sx={{ flexGrow: 1 }} size="small" label="終了時刻" {...methods.register('finishedTime')}  />
      </Stack>
      <Stack direction="row" spacing={1}>
        <FormControl fullWidth size="small">
          <InputLabel id="create-schedule-repeat-type">繰り返し</InputLabel>
          <Select
            label="繰り返し"
            labelId="create-schedule-repeat-type-label"
            id="create-schedule-repeat-type"
            value={repeatType}
            onChange={(event) => methods.setValue('repeatType', event.target.value)}>
            <MenuItem value="none">なし</MenuItem>
            <MenuItem value="daily">日毎</MenuItem>
            <MenuItem value="weekly">週毎</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth size="small">
          <InputLabel id="create-schedule-repeat-finish-type">終了</InputLabel>
          <Select
            labelId="create-schedule-repeat-finish-type-label"
            id="create-schedule-repeat-finish-type"
            label="終了"
            disabled={repeatType === 'none'}
            value={repeatFinishType}
            onChange={(event) => methods.setValue('repeatFinishType', event.target.value)}>
            <MenuItem value="none">なし</MenuItem>
            <MenuItem value="date">日付</MenuItem>
            <MenuItem value="count">回数</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      {repeatType === 'weekly' && (
        <Stack direction="column" spacing={0.5}>
          <Typography variant="body2">曜日</Typography>
          <Stack spacing={1} direction="row">
            <Chip
              size="small" clickable label="日"
              onClick={() => methods.setValue('repeatWeekdays', repeatWeekdays.includes('0') ? repeatWeekdays.filter(day => day !== '0') : [...repeatWeekdays, '0'])}
              color={repeatWeekdays.includes('0') ? 'primary' : 'default'} />
            <Chip
              size="small" clickable label="月"
              onClick={() => methods.setValue('repeatWeekdays', repeatWeekdays.includes('1') ? repeatWeekdays.filter(day => day !== '1') : [...repeatWeekdays, '1'])}
              color={repeatWeekdays.includes('1') ? 'primary' : 'default'} />
            <Chip
              size="small" clickable label="火"
              onClick={() => methods.setValue('repeatWeekdays', repeatWeekdays.includes('2') ? repeatWeekdays.filter(day => day !== '2') : [...repeatWeekdays, '2'])}
              color={repeatWeekdays.includes('2') ? 'primary' : 'default'} />
            <Chip
              size="small" clickable label="水"
              onClick={() => methods.setValue('repeatWeekdays', repeatWeekdays.includes('3') ? repeatWeekdays.filter(day => day !== '3') : [...repeatWeekdays, '3'])}
              color={repeatWeekdays.includes('3') ? 'primary' : 'default'} />
            <Chip
              size="small" clickable label="木"
              onClick={() => methods.setValue('repeatWeekdays', repeatWeekdays.includes('4') ? repeatWeekdays.filter(day => day !== '4') : [...repeatWeekdays, '4'])}
              color={repeatWeekdays.includes('4') ? 'primary' : 'default'} />
            <Chip
              size="small" clickable label="金"
              onClick={() => methods.setValue('repeatWeekdays', repeatWeekdays.includes('5') ? repeatWeekdays.filter(day => day !== '5') : [...repeatWeekdays, '5'])}
              color={repeatWeekdays.includes('5') ? 'primary' : 'default'} />
            <Chip
              size="small" clickable label="土"
              onClick={() => methods.setValue('repeatWeekdays', repeatWeekdays.includes('6') ? repeatWeekdays.filter(day => day !== '6') : [...repeatWeekdays, '6'])}
              color={repeatWeekdays.includes('6') ? 'primary' : 'default'} />
          </Stack>
        </Stack>
      )}
      {repeatFinishType === 'date' && (
        <TextField
          size="small"
          label="終了日"
          type="date"
          {...methods.register('repeatFinishedDate')} />
      )}
      {repeatFinishType === 'count' && (
        <TextField
          size="small"
          label="回数"
          type="number"
          {...methods.register('repeatCount')} />
      )}
      <Stack justifyContent="end" direction="row">
        <Button type="button" variant="contained">登録する</Button>
      </Stack>
    </Stack>
  </FormProvider>
  )
}

export default function CreateScheduleDrawer ({
  open,
  toggle,
  month,
}: {
  open: boolean
  toggle: () => any
  month: string
}) {
  return (
    <Drawer
      anchor="bottom"
      open={open} onClose={toggle}>
      <Container
        maxWidth="sm"
        sx={{
          p: 2
        }}>
        {open && <CreateScheduleForm month={month} />}
      </Container>
    </Drawer>
  )
}
