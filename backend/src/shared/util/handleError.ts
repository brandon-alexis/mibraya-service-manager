import { Response } from 'express'

export const handleError = (res: Response, message?: string, code?: number) => {
  const errorCode: number = code ?? 500
  const errorMessage: string =
    message ?? 'Ocurrio un error inesperado, intenta mas tarde'

  res.status(errorCode).json({ message: errorMessage, type: 'error' })
}
