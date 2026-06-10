export function formatDateTime(value?: string | null) {
  if (!value) return "-";

  const date = new Date(value);

  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");

  return `${month}.${day} ${hour}:${minute}`;
}

export function formatRate(rate: number) {
  if (Number.isInteger(rate)) {
    return String(rate);
  }

  return rate.toFixed(1);
}

export function getRarityRank(rarity: number | string) {
  if (rarity === 6 || rarity === "6") return 6;
  if (rarity === 5 || rarity === "5") return 5;
  if (rarity === 4 || rarity === "4") return 4;
  return 0;
}
