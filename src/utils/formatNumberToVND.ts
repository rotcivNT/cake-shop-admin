export function formatNumberToVND(number: number, showCurrencySymbol = true) {
  const options = showCurrencySymbol
    ? { style: "currency", currency: "VND" }
    : { style: "decimal" };

  return number.toLocaleString("vi-VN", options);
}
