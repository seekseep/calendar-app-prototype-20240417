import { v4 as uuid } from 'uuid'

import { Account } from '@/types/account'

import { db } from '../db'

function parseAccount (row: any): Account {
  const id = row?.id
  const name = row?.name
  const teamId = row?.teamId
  if (typeof id !== 'string') throw new Error('Invalid account.id')
  if (typeof name !== 'string') throw new Error('Invalid account.name')
  if (typeof teamId !== 'string') throw new Error('Invalid account.teamId')
  return { id, name, teamId }
}

export async function createAccount (account: Partial<Account>) {
  const row = db.account.create({
    id  : account?.id ?? uuid(),
    name: account?.name ?? '名称未設定',
  })
  return parseAccount(row)
}

export async function listAccounts () {
  const rows = db.account.getAll()
  const accounts: Account[] = []
  for (const row of rows) accounts.push(parseAccount(row))
  return accounts
}

export async function getAccount (id: string) {
  const row = db.account.findFirst({ where: { id: { equals: id } } })
  if (!row) throw new Error('Account not found')
  return parseAccount(row)
}

export async function getAccountByTeamId(teamId: string) {
  const row = db.account.findFirst({ where: { teamId: { equals: teamId } } })
  if (!row) throw new Error('Account not found')
  return parseAccount(row)
}

export async function updateAccount ({ id, ...data }: Partial<Omit<Account, 'id'>> & Pick<Account, 'id'>) {
  const row = db.account.update({
    where: { id: { equals: id } },
    data : data,
  })
  return parseAccount(row)
}

export async function deleteAccount (id: string) {
  const row = db.account.delete({ where: { id: { equals: id } } })
  return parseAccount(row)
}
