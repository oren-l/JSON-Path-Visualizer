// eslint-disable-next-line no-restricted-globals
// const ctx: Worker = self as any

type Callback = (data: any) => void

export function processData(cb: Callback): number {

  // Process the data without stalling the UI
  console.log('worker got callback:', cb)
  return takeALongTimeToDoSomething(cb)
}

function takeALongTimeToDoSomething(cb: Callback) {
  console.log('Start our long running job...')
  const seconds = 1
  const start = new Date().getTime()
  const delayMessage = seconds * 1000
  const delayTotal = 3 * seconds * 1000

  while (true) {
    const passed = new Date().getTime() - start
    if (passed % delayMessage === 0) {
        cb(`worker says hi ${passed}`)
      }
      if (passed > delayTotal) {
          break
      }
  }
  console.log('Finished our long running job')
  return 99
}
