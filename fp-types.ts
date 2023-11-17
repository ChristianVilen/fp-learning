type Compose = <A, B, C>(
  f: (x: B) => C,
  g: (x: A) => B
) => (x: A) => C
const compose: Compose = (f, g) => x => f(g(x))

type DivideTwo = (x: number) => number
const divideTwo: DivideTwo = x => 2 / x

console.log(divideTwo(8))
console.log(divideTwo(0))

type Increment = (x: number) => number
const increment: Increment = x => x + 1

const composed = compose(increment, divideTwo)
console.log(composed(8))
console.log(composed(0))

type Option<A> = Some<A> | None

interface Some<A> {
  _tag: 'Some'
  value: A
}

interface None {
  _tag: 'None'
}

const some = <A>(x: A): Option<A> => ({ _tag: 'Some', value: x })
const none: Option<never> = { _tag: 'None' }

const isNone = <A>(x: Option<A>): x is None => x._tag === 'None'

type DivideTwo2 = (x: number) => Option<number>
const divideTwo2: DivideTwo2 = x => x === 0 ? none : some(2 / x)

const composed2 = compose(
  (x: Option<number>) => isNone(x) ? none : some(increment(x.value)),
  divideTwo2
)

console.log(composed2(8))
console.log(composed2(0))

// Either
function divideTwoIfEven(num: number): number {
  if (num === 0) throw 'cannot divide zero'
  if (num % 2 !== 0) throw 'num is not even'

  return 2 / num
}

console.log(divideTwoIfEven(8))
//console.log(divideTwoIfEven(0))

type Either<E, A> = Left<E> | Right<A>
interface Left<E> {
  _tag: 'Left'
  left: E
}
interface Right<A> {
  _tag: 'Right'
  right: A
}

const left = <E, A = never>(e: E): Either<E, A> => ({
  _tag: 'Left',
  left: e
})
const right = <A, E = never>(a: A): Either<E, A> => ({
  _tag: 'Right',
  right: a
})

const isLeft = <E, A>(x: Either<E, A>): x is Left<E> => x._tag === 'Left'

function divideTwoIfEven2(num: number): Either<string, number> {
  if (num === 0) return left('is zero')
  if (num % 2 !== 0) return left('not even')

  return right(2 / num)
}

console.log(divideTwoIfEven2(8))
console.log(divideTwoIfEven2(0))
console.log(divideTwoIfEven2(3))

const composeDivideAndIncrement = compose(
  x => isLeft(x) ? x : right(increment(x.right)),
  divideTwoIfEven2
)

console.log("composeDivideAndIncrement", composeDivideAndIncrement(8))
console.log("composeDivideAndIncrement", composeDivideAndIncrement(0))
console.log("composeDivideAndIncrement", composeDivideAndIncrement(3))

