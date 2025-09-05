export function insertIf<T>(condition: unknown, ...elements: T[]): T[] {
  return condition ? elements : [];
}
