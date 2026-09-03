export function formatCurrencyMask(value: string | number | undefined): string {
  const str = value === undefined || value === null ? '' : String(value);

  const digits = str.replace(/\D/g, '');

  if (!digits) {
    return '';
  }

  const number = Number(digits) / 100;

  if (isNaN(number)) {
    return '';
  }

  return number.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

export function parseCurrency(value: string): number {
  if (value === undefined || value === null) return 0;

  const str = String(value).trim();

  // Remove currency symbol and whitespace, then normalize thousands and decimal separators
  const withoutSymbol = str.replace(/R\$\s?/g, '');
  const normalized = withoutSymbol.replace(/\./g, '').replace(',', '.');

  const parsed = parseFloat(normalized);
  return isNaN(parsed) ? 0 : parsed;
}