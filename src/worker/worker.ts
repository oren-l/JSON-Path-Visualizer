export function processData(data: string): string {

  // Process the data without stalling the UI
  console.log('worker here')
  calculatePrimes(500, 1000000000)

  return data
}

const calculatePrimes = (iterations: number, multiplier: number) => {
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
    // postMessage(primes)
    console.log(primes)
  }
}
