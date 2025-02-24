export function formatIsoToBrDate(dateString: string | undefined): string {
  if (dateString) {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      throw new Error("Data inválida");
    }

    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();

    return `${day}/${month}/${year}`;
  }

  return '-'
}