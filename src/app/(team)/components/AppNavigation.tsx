'use client'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import MenuIcon from '@mui/icons-material/Menu'
import { ButtonBase, Collapse, IconButton, Stack, Toolbar, Typography } from '@mui/material'
import AppBar from '@mui/material/AppBar'

import MonthNavigation from './MonthNavigation'
import { DRAWER_WIDTH } from './constants'
import { getMonthLabel } from './utilities'

function Brand () {
  return (
    <Typography variant="h6" noWrap component="div">
      カレンダー
    </Typography>
  )
}

export default function AppNavigation ({
  month,
  monthlyOpened,
  onNextMonth,
  onPrevMonth,
  onToggleDrawer,
  onToggleMonthly
}: {
  month: string
  monthlyOpened: boolean
  onNextMonth?: () => any
  onPrevMonth?: () => any
  onToggleDrawer?: () => any
  onToggleMonthly?: () => any
}) {
  return (
    <AppBar
      position="fixed"
      variant="outlined"
      color="default"
      elevation={0}
      sx={{
        bgcolor: 'background.paper',
        width  : { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
        ml     : { sm: `${DRAWER_WIDTH}px` },
      }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onToggleDrawer}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Brand />
          <ButtonBase sx={{ p: 1 }} onClick={onToggleMonthly}>
            <Typography variant="h6">
              {getMonthLabel(month)}
            </Typography>
            <ArrowDropDownIcon />
          </ButtonBase>
        </Stack>
      </Toolbar>
      <Collapse in={monthlyOpened}>
        <MonthNavigation
          month={month}
          onNext={onNextMonth}
          onPrev={onPrevMonth} />
      </Collapse>
    </AppBar>
  )
}
