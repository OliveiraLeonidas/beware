
export class NotFound extends Error {
  
  constructor(message?: string) {
    super(`Not Found${message}`)
  }
}