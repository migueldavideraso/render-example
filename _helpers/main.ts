
export function awaitAll<T, U> (array: T[], callback: (item: T, index: number, array: T[]) => Promise<U>) {
  return Promise.all(array.map(callback))
}

export function awaitAllSettled<T, U> (array: T[], callback: (item: T, index: number, array: T[]) => Promise<U>) {
  return Promise.allSettled(array.map(callback))
}

