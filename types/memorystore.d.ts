declare module 'memorystore' {
  import session, {Store} from 'express-session'
  type Session = typeof session
  interface MemorystoreOptions {
    checkPeriod: number
    max?: number
    ttl?: number
  }
  class MemoryStore extends Store {
    constructor(options: MemorystoreOptions)
    startInterval(): void
    stopInterval(): void
    prune(): void
  }
  type MemorystoreConstructor = typeof MemoryStore
  function memorystore(session: Session): MemorystoreConstructor

  export = memorystore
}