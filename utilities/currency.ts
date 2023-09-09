export const formatCurrency = (
  value: number,
  locale: string = "us-US",
  currency: string = "USD"
): string => {
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(
    value
  );
};
