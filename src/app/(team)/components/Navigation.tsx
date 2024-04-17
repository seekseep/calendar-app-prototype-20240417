'use client'

import { add, format, sub } from 'date-fns'
import { ReactNode, useState } from 'react'

import {
  Box,
  Drawer,
  Toolbar
} from '@mui/material'

import { useGoToMonth, useMonth } from '../hooks'

import AppNavigation from './AppNavigation'
import TeamNavigation from './TeamNavigation'
import { DRAWER_WIDTH } from './constants'

export default function Navigation ({
  children
} : {
  children: ReactNode
}) {
  const month = useMonth()
  const goToMonth = useGoToMonth()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [monthlyOpened, setOpenedMonthly] = useState(false)

  const handleDrawerClose = () => {
    setIsClosing(true)
    setMobileOpen(false)
  }

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false)
  }

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen)
    }
  }

  const toggleMonthly = () => {
    setOpenedMonthly(opened => !opened)
  }

  const handleNext = () => {
    const nextMonth = format(
      add(new Date(month), { months: 1 }),
      'yyyy-MM'
    )
    goToMonth(nextMonth)
  }

  const handlePrev = () => {
    const nextMonth = format(
      sub(new Date(month), { months: 1 }),
      'yyyy-MM'
    )
    goToMonth(nextMonth)
  }

  const drawer = <TeamNavigation onClose={handleDrawerClose} />

  return (
    <Box sx={{ display: 'flex' }}>
      <AppNavigation
        month={month}
        monthlyOpened={monthlyOpened}
        onNextMonth={handleNext}
        onPrevMonth={handlePrev}
        onToggleMonthly={toggleMonthly}
        onToggleDrawer={handleDrawerToggle}  />
      <Box
        sx={{
          width     : { sm: DRAWER_WIDTH },
          flexShrink: { sm: 0 }
        }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{ keepMounted: true }}
          sx={{
            display             : { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
          }}>
          {drawer}
        </Drawer>
        <Drawer
          open
          variant="permanent"
          sx={{
            display             : { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
          }}>
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width   : { sm: `calc(100% - ${DRAWER_WIDTH}px)` }
        }}>
        <Toolbar />
        <Box onClick={() => setOpenedMonthly(false)}>
          {children}
        </Box>
      </Box>
    </Box>
  )
}
