function normalSum(a, b) {
  return a + b;
}

type Sum = (a: number) => (b: number) => number;
const sum: Sum = a => b => a + b;
console.log("sum", sum(1)(2));

type Increment = (x: number) => number;
const increment: Increment = sum(1);
console.log('increment', increment(2));

type Decrement = (x: number) => number;
const decrement: Decrement = sum(-1);
console.log('decrement', decrement(2));

type Curry2 = <A, B, Z>(f: (a: A, b: B) => Z) => (a: A) => (b: B) => Z;
const curry2: Curry2 = f => a => b => f(a, b);

const sum2 = curry2(normalSum);
console.log("sum2", sum2(1)(5));

function normalSumAll(xs: number[]): number {
  let result = 0

  for (let i = 0; i < xs.length; i++) {
    result += xs[i]
  }

  return result
}

console.log("normalSum", normalSumAll([1,2,3,4]))

type SumAll = (xs: number[]) => number
const sumAll: SumAll = xs => {

  if (xs.length === 0) return 0

  const [head, ...rest] = xs

  return head + sumAll(rest)
}

console.log("sumAll", sumAll([1,2,3,4]))

const sumAll2: SumAll = xs => (xs.length === 0) ? 0 : xs[0] + sumAll2(xs.slice(1))
console.log("sumAll2", sumAll2([1,2,3,4]))
console.log("sumAll2", sumAll2([]))

