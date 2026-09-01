export function formatIDR(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function generateBookingCode(prefix: string): string {
  const random = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `${prefix}-${random}`;
}
