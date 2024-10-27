export function hasBody(method: string) {
  return ['POST', 'PUT', 'PATCH'].includes(method);
}
