import { UseMutationOptions, UseMutationResult } from '@tanstack/react-query'

export type UseApiMutationOptions <T extends (...arg: any) => Promise<any>> = UseMutationOptions<
  Awaited<ReturnType<T>>,
  Error,
  Parameters<T>[0]
>

export type UseApiMutationResult <T extends () => {}> = UseMutationResult<
  Awaited<ReturnType<T>>,
  Error,
  Parameters<T>[0]
>
