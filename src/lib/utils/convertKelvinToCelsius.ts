export function convertKelvinToCelsius(K: number): number {
  const C = K - 273.15;
  return Math.floor(C);
}
