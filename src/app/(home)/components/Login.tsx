import Link from 'next/link'

import { Button, Container, Stack, TextField, Typography } from '@mui/material'

export default function Login () {
  return (
    <Container sx={{ py: 12 }} maxWidth="xs">
      <Typography textAlign="center" mb={4} variant="h5">
        カレンダー
      </Typography>
      <Stack spacing={3}>
        <TextField label="メールアドレス" type="email" />
        <TextField label="パスワード" type="password" />
        <Stack direction="row" spacing={2}>
          <Link href="/teams">
            <Button variant="contained">ログイン</Button>
          </Link>
          <Link href="/teams">
            <Button variant="text">新規登録</Button>
          </Link>
        </Stack>
      </Stack>
    </Container>
  )
}
