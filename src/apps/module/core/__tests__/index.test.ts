import { vi } from 'vitest'
import basebuildfy from '../index.js'
import initializeStrategies from '../strategies/index.js'
import test, { afterEach, beforeEach, describe } from 'node:test'


const commonViteEnvObject: {
  command: 'serve' | 'build'
  mode: string
} = {
  command: 'serve',
  mode: 'development'
}

const commonviFnForObjectsParams = (args) => {
  // Cria uma cópia profunda dos argumentos
  const argsCopy = JSON.parse(JSON.stringify(args))

  // Retorna uma função que quando chamada, retorna a cópia dos argumentos
  return () => argsCopy
}

describe(`basebuildfy`, () => {

  describe(`when configs array is empty`, () => {
    it(`throw an error`, () => {
      expect(() => basebuildfy()).toThrow('configs array is required')
    })
  })

  describe(`when configSystem is not setted and fallsback to vite's ecosystem`, () => {
    describe(`and configs is not empty`, () => {
      let viteSpy

      afterEach(() => {
        viteSpy.mockReset()
      })

      it(`basebuildfies a single vite's config object`, () => {
        viteSpy = vi.spyOn(initializeStrategies, 'vite')
        const finalConfigFunction = basebuildfy({ configs: [{}] })
        const finalSettings = finalConfigFunction(commonViteEnvObject)

        expect(viteSpy).toHaveBeenCalled()
        expect(finalSettings).toMatchObject({})
      })

      it(`basebuildfies a single vite's config function`, () => {
        viteSpy = vi.spyOn(initializeStrategies, 'vite')

        const configFunction = vi.fn()

        const finalConfigFunction = basebuildfy({ configs: [configFunction] })
        const finalSettings = finalConfigFunction(commonViteEnvObject)

        expect(viteSpy).toHaveBeenCalled()
        expect(configFunction).toHaveBeenCalledWith({ ...commonViteEnvObject, basebuildDefaults: {} })
        expect(finalSettings).toMatchObject({})
      })

      it(`basebuildfies multiple vite's config functions in a recursive/linear way`, () => {
        viteSpy = vi.spyOn(initializeStrategies, 'vite')

        let savedArgs1 = null
        const configFunction = vi.fn().mockImplementation((args) => {
          savedArgs1 = JSON.parse(JSON.stringify(args))
        })
        let savedArgs2 = null
        const configFunction2 = vi.fn().mockImplementation((args) => {
          savedArgs2 = JSON.parse(JSON.stringify(args))
          return {
            build: {
              minify: 'esbuild',
            }
          }
        })
        let savedArgs3 = null
        const configFunction3 = vi.fn().mockImplementation((args) => {
          savedArgs3 = JSON.parse(JSON.stringify(args))
          return {
            build: {
              outDir: './dist',
            }
          }
        })

        const finalConfigFunction = basebuildfy({ configs: [configFunction, configFunction2, configFunction3] })
        const finalSettings = finalConfigFunction(commonViteEnvObject)

        expect(viteSpy).toHaveBeenCalled()
        expect(savedArgs1).toMatchObject({ ...commonViteEnvObject, basebuildDefaults: {} })
        expect(savedArgs2).toMatchObject({ ...commonViteEnvObject, basebuildDefaults: {} })
        expect(savedArgs3).toMatchObject({ ...commonViteEnvObject, basebuildDefaults: { build: { minify: 'esbuild' } } })
        expect(finalSettings).toMatchObject({
          build: {
            minify: 'esbuild',
            outDir: './dist',
          }
        })
      })
    })
  })

})