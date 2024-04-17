import { useMutation, useQuery } from '@tanstack/react-query'

import { createTeam, deleteTeam, getTeam, listTeams, updateTeam } from '@/services/team'

import { UseApiMutationOptions } from './types'

export function useCreateTeamMutation(
  options?: UseApiMutationOptions<typeof createTeam>
) {
  return useMutation({
    mutationFn: createTeam,
    ...options,
  })
}

export function useGetTeamQuery(id: string) {
  return useQuery({
    queryKey: ['teams', id],
    async queryFn () {
      return getTeam(id)
    }
  })
}

export function useListTeamsQuery() {
  return useQuery({
    queryKey: ['teams'],
    async queryFn () {
      return listTeams()
    }
  })
}

export function useUpdateTeamMutation(
  options?: UseApiMutationOptions<typeof updateTeam>
) {
  return useMutation({
    mutationFn: updateTeam,
    ...options,
  })
}

export function useDeleteTeamMutation(
  options?: UseApiMutationOptions<typeof deleteTeam>
) {
  return useMutation({
    mutationFn: deleteTeam,
    ...options,
  })
}
