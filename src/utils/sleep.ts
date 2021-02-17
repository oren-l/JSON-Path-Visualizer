export const sleep = (waitMs: number = 0): Promise<undefined> =>
  new Promise(resolve => setTimeout(resolve, waitMs))
