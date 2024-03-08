import { z } from "zod"

export class DBError extends Error {

	static UNEXPECTED = 'unexpected' as const
	static PERMISSIONS = 'missing_permissions' as const
	static INVALID_DATA = 'invalid_data' as const
	static NOT_FOUND = 'not_found' as const
	static CONNECTION = 'connection' as const

	static types = [
		DBError.UNEXPECTED,
		DBError.PERMISSIONS,
		DBError.INVALID_DATA,
		DBError.NOT_FOUND,
		DBError.CONNECTION
	] as const

	public type: string

	constructor (type: typeof DBError.types[number]) {

		super(type)
		this.type = type
		this.name = 'DBError'
	}
}

export class ValidationDataError extends Error {

	constructor (message: string) {

		super(message)
		this.message = message
		this.name = 'ValidationDataError'
	}
}



export class ExternalServiceError extends Error {

  constructor (service: string, error: string) {

    const message = `(${service}) | ${error}`

    super(message)
    this.message = message
    this.name = 'ExternalServiceError'
  }
}

export class RequestValidationError extends Error {

  constructor (errors: z.ZodIssue[]) {

    const parsedErrors = errors.map(error => `(${error.path.join('.')}: ${error.message})`)
    const message = `[ ${parsedErrors.join(', ')} ]`

    super(message)
    this.message = message
    this.name = 'RequestValidationError'
  }
}
