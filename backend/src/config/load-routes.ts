import { Router } from 'express'
import { readdirSync } from 'node:fs'

const ROOT_DIR = `${__dirname}/../app`
export const router: Router = Router()

const folders = readdirSync(ROOT_DIR)

const cleanFilename = (filename: string): string => {
  const cleanedFilename = filename.split('.').shift()

  if (!cleanedFilename) {
    throw new Error('Hubo un error formateando nombres')
  }

  return cleanedFilename
}

folders.filter((dirname) => {
  const ROUTER_DIR = `${ROOT_DIR}/${dirname}/router`

  readdirSync(ROUTER_DIR).filter((routername) => {
    const cleanedRouterName = cleanFilename(routername)

    import(`${ROUTER_DIR}/${cleanedRouterName}`).then((module) => {
      if (!module.router) {
        throw new Error(`Hubo un error cargando la ruta /api/${dirname}`)
      }

      router.use(`/api/${dirname}`, module.router)
      console.log(`Importado con exito /api/${dirname}...`)
    })
  })
})
