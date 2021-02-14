// eslint-disable-next-line no-restricted-globals
const ctx: Worker = self as any

// Post data to parent thread
ctx.postMessage({ foo: 'foo' })

// Respond to message from parent thread
ctx.addEventListener('message', (event) => console.log(event.data))


export const calculatePrimes = (iterations: number, multiplier: number) => {
  while(true)  {
    let primes = []
    for (let i = 0; i < iterations; i++) {
      let candidate = i * (multiplier * Math.random())
      let isPrime = true

      for (var c = 2; c <= Math.sqrt(candidate); ++c) {
        if (candidate % c === 0) {
          // not prime
          isPrime = false
          break
        }
      }
      if (isPrime) {
        primes.push(candidate)
      }
    }
    ctx.postMessage(primes)
  }
}

calculatePrimes(500, 1000000000)

export {}
