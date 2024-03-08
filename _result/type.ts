
export type TResultError = { status: 'error', response: string | string[] }

export type TResult<T> = (
  { status: 'success', response: T } |
  TResultError
)
