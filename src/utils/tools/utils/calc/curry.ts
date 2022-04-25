const curry = <T>(
    func: T
  ): (<U>(...args_1: U[]) => T | ((...args_2: U[]) => T)) => {
    const alias_func: Function = func as unknown as Function;
    const curried = <U>(
      ...args_1: U[]
    ): typeof func | ((...args_2: U[]) => typeof func) => {
      if (alias_func.length <= args_1.length) {
        return alias_func.apply(func, args_1);
      } else {
        return (...args_2: U[]): typeof func => {
          return alias_func.apply(func, [...args_1, ...args_2]);
        };
      }
    };
    return curried;
  };

  export = curry;