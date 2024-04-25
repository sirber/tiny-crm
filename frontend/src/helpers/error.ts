export function getErrorMessage(error: unknown): string {
  let errorMessage = 'unknown error'

  if (typeof error === 'string') {
    errorMessage = error
  } else if (error instanceof Error) {
    errorMessage = error.message
  }

  return errorMessage
}
