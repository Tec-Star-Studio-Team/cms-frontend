type Comparator<T> = (a: T, b: T) => number;

export function combineComparators<T>(
  ...comparators: Comparator<T>[]
): Comparator<T> {
  return (a, b) => {
    for (const comparator of comparators) {
      const result = comparator(a, b);
      if (result !== 0) return result;
    }
    return 0;
  };
}
