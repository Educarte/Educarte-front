export function removeMask(values: string): string {
  const rule = /[^\d\s]/g;
  return values.replace(rule, '').split(' ').join('');
}
