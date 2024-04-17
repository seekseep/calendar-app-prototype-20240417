import ManageSchedules from './components/ManageSchedules'

export default function TeamPage ({
  params: {
    teamId,
  },
}: {
  params: {
    teamId: string
  }
}) {
  return (
    <ManageSchedules
      teamId={teamId} />
  )
}
