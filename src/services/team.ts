import { v4 as uuid } from 'uuid'

import { Team } from '@/types/team'

import { db } from '../db'

function parseTeam (row: any): Team {
  const id = row?.id
  const name = row?.name
  if (typeof id !== 'string') throw new Error('Invalid team')
  if (typeof name !== 'string') throw new Error('Invalid team')
  return { id, name }
}

export async function createTeam (team: Partial<Team>) {
  const row = db.team.create({
    id  : team?.id ?? uuid(),
    name: team?.name ?? '名称未設定',
  })
  return parseTeam(row)
}

export async function listTeams () {
  const rows = db.team.getAll()
  const teams: Team[] = []
  for (const row of rows) teams.push(parseTeam(row))
  return teams
}

export async function getTeam (id: string) {
  const row = db.team.findFirst({ where: { id: { equals: id } } })
  if (!row) throw new Error('Team not found')
  return parseTeam(row)
}

export async function updateTeam ({ id, ...data }: Partial<Omit<Team, 'id'>> & Pick<Team, 'id'>) {
  const row = db.team.update({
    where: { id: { equals: id } },
    data : data,
  })
  return parseTeam(row)
}

export async function deleteTeam (id: string) {
  const row = db.team.delete({ where: { id: { equals: id } } })
  return parseTeam(row)
}
