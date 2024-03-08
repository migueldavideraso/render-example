import { z } from "zod"
import { DBError as DBDataError, ExternalServiceError, RequestValidationError, ValidationDataError } from "../_errors/main"
import { TResult, TResultError } from "./type"



function success<T> (response: T): TResult<T> {
  return {
    status: 'success',
    response
  }
}

function defaultSuccess () {
  return success('Action done correctly')
}

function error (response: string|string[]): TResultError {

  return {
    status: 'error',
    response
  }
}

const ValidationError = {

  unexpected (): TResultError {
    return {
      status: 'error',
      response: new ValidationDataError('unexpected').toString(),
    }
  }
}

function requestValidationError (errors: z.ZodIssue[]): TResultError {
  return {
    status: 'error',
    response: new RequestValidationError(errors).toString(),
  }
}

function externalServiceError (service: string, error: string): TResultError {
  return {
    status: 'error',
    response: new ExternalServiceError(service, error).toString(),
  }
}

const DBError = {

  permissions (message?: string): TResultError {

    const additionalMessage = message ? ` | ${message}` : ''
    const response = new DBDataError(DBDataError.PERMISSIONS).toString() + additionalMessage

    return {
      response,
      status: 'error',
    }
  }
}


export const Result = {
  error,
  success,
  defaultSuccess,
  externalServiceError,
  requestValidationError,
  DBError,
  ValidationError,
} as const
