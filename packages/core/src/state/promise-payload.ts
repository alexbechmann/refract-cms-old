export function promisePayload<T>(promise: Promise<T>) {
  return (promise as any) as T;
}
