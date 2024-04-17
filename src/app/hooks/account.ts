import { useMutation, useQuery } from '@tanstack/react-query'

import { createAccount, deleteAccount, getAccount, getAccountByTeamId, listAccounts, updateAccount } from '@/services/account'

import { UseApiMutationOptions } from './types'

export function useCreateAccountMutation(
  options?: UseApiMutationOptions<typeof createAccount>
) {
  return useMutation({
    mutationFn: createAccount,
    ...options,
  })
}

export function useGetAccountQuery(id: string) {
  return useQuery({
    queryKey: ['accounts', id],
    async queryFn () {
      return getAccount(id)
    }
  })
}

export function useGetAccountByTeamId (teamId?: string | string[]) {
  return useQuery({
    enabled : typeof teamId == 'string',
    queryKey: ['team', teamId, 'account'],
    async queryFn () {
      return getAccountByTeamId(teamId as string)
    }

  })
}

export function useListAccountsQuery() {
  return useQuery({
    queryKey: ['accounts'],
    async queryFn () {
      return listAccounts()
    }
  })
}

export function useUpdateAccountMutation(
  options?: UseApiMutationOptions<typeof updateAccount>
) {
  return useMutation({
    mutationFn: updateAccount,
    ...options,
  })
}

export function useDeleteAccountMutation(
  options?: UseApiMutationOptions<typeof deleteAccount>
) {
  return useMutation({
    mutationFn: deleteAccount,
    ...options,
  })
}
