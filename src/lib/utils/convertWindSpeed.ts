export function convertWindSpeed(km_s: number): string {
  const km_h = km_s * 3.6;
  return `${km_h.toFixed(0)}km/h`;
}
