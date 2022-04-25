interface _dedup {
    <T>(array: T[]): T[];
  }

const dedup: _dedup = <T>(array: T[]): T[] => {
    return [...new Set(array)];
  };

  export default dedup;