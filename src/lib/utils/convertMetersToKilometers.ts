export function convertMetersToKilometers(m: number): string {
  const km = m / 1000;
  return `${km.toFixed(0)}km`; // Round to 0 decimal places and add 'km' unit
}
