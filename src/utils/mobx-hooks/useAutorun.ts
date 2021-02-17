import { autorun, IAutorunOptions, IReactionPublic } from 'mobx'
import { useEffect, DependencyList } from 'react'

export function useAutorun (
  effect: (r: IReactionPublic) => any,
  deps: DependencyList,
  options?: IAutorunOptions,
) {
  useEffect(() => {
    const dispose = autorun(effect, options)
    return dispose
  }, deps) // eslint-disable-line react-hooks/exhaustive-deps
}
