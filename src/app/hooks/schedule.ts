import { useMutation, useQuery } from '@tanstack/react-query'

import {
  createSchedule,
  getSchedule,
  listSchedules,
  listSchedulesByAccountId,
  updateSchedule,
  deleteSchedule,
} from '@/services/schedule'

import { UseApiMutationOptions } from './types'

export function useCreateScheduleMutation(
  options?: UseApiMutationOptions<typeof createSchedule>
) {
  return useMutation({
    mutationFn: createSchedule,
    ...options,
  })
}

export function useGetScheduleQuery(id: string) {
  return useQuery({
    queryKey: ['schedules', id],
    async queryFn () {
      return getSchedule(id)
    }
  })
}

export function useListSchedulesQuery() {
  return useQuery({
    queryKey: ['schedules'],
    async queryFn () {
      return listSchedules()
    }
  })
}

export function useListSchedulesByAccountIdQuery(accountId?: string) {
  return useQuery({
    enabled : typeof accountId == 'string',
    queryKey: ['accounts', accountId, 'schedules'],
    async queryFn () {
      return listSchedulesByAccountId(accountId as string)
    }
  })
}

export function useUpdateScheduleMutation(
  options?: UseApiMutationOptions<typeof updateSchedule>
) {
  return useMutation({
    mutationFn: updateSchedule,
    ...options,
  })
}

export function useDeleteScheduleMutation(
  options?: UseApiMutationOptions<typeof deleteSchedule>
) {
  return useMutation({
    mutationFn: deleteSchedule,
    ...options,
  })
}
