import { add, set } from 'date-fns'

import { factory, nullable, primaryKey } from '@mswjs/data'
import { v4 as uuid } from 'uuid'

export const db = factory({
  team: {
    id  : primaryKey(() => uuid()),
    name: () => 'My team',
  },
  account: {
    id    : primaryKey(() => uuid()),
    teamId: () => 'e90b2c22-969c-49b3-8727-9977fd20f7c7',
    name  : () => 'John Due',
  },
  schedule: {
    id                : primaryKey(() => uuid()),
    teamId            : () => 'f47e72ed-7cca-4347-ad69-63f84ab20c73',
    accountId         : () => '3d184191-bd7a-43f2-b082-12d2ecba665d',
    startedAt         : () => new Date().toISOString(),
    finishedAt        : () => new Date().toISOString(),
    repeatType        : nullable(() => 'daily'),
    repeatFinishType  : nullable(() => 'date'),
    repeatFinishedDate: nullable(() => new Date().toISOString()),
    repeatInterval    : nullable(() => 1),
    repeatCount       : nullable(() => 1),
    repeatWeekdays    : nullable(() => [0]),
  }
})

const teamA = db.team.create({ id: 'team-1', name: 'チーム A' })
const teamB = db.team.create({ id: 'team-2', name: 'チーム B' })

const accountA = db.account.create({ id: 'account-1', teamId: teamA.id, name: 'アカウント A' })
const accountB = db.account.create({ id: 'account-2', teamId: teamB.id, name: 'アカウント B' })

const baseDate = new Date()

for (let i = 0; i < 10; i++) {
  const date = add(baseDate, { days: i })
  const startedAt = set(date, { hours: 9, minutes: 0 })
  const finishedAt = add(startedAt, { hours: 1 })

  db.schedule.create({
    teamId    : teamA.id,
    accountId : accountA.id,
    startedAt : startedAt.toISOString(),
    finishedAt: finishedAt.toISOString(),
  })

  db.schedule.create({
    teamId    : teamB.id,
    accountId : accountB.id,
    startedAt : startedAt.toISOString(),
    finishedAt: finishedAt.toISOString(),
  })
}

db.schedule.create({
  teamId            : teamA.id,
  accountId         : accountA.id,
  repeatType        : 'weekly',
  repeatFinishType  : 'date',
  repeatFinishedDate: null,
  repeatWeekdays    : [1, 3, 5],
  startedAt         : new Date('2024-01-01 9:00').toISOString(),
  finishedAt        : new Date('2024-01-01 10:00').toISOString(),
})

db.schedule.create({
  teamId            : teamB.id,
  accountId         : accountB.id,
  repeatType        : 'weekly',
  repeatFinishType  : 'date',
  repeatFinishedDate: null,
  repeatWeekdays    : [1, 2, 3, 4, 5],
  startedAt         : new Date('2024-01-01 9:00').toISOString(),
  finishedAt        : new Date('2024-01-01 10:00').toISOString(),
})
