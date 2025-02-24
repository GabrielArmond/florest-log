type SnackbarType = 'success' | 'warning' | 'error' | 'info'

export function showSnackbar(type: SnackbarType, text: string) {
  console.log(type, text)
}