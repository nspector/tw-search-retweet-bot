import * as curry from './curry';

interface _diff {
    <U>(...args_1: U[]):
      | (<T>(array_a: T[], array_b?: T[]) => T[])
      | ((...args_2: U[]) => <T>(array_a: T[], array_b?: T[]) => T[]);
  }

const diff: _diff = curry(<T>(array_a: T[], array_b?: T[]): T[] => {
  const x: Set<T> = new Set(array_a);
  const y: Set<T> = new Set(array_b);
  return [...x].filter((elem: T): boolean => !y.has(elem));
});

export default diff;