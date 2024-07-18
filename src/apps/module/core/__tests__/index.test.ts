import { UserConfig, vi } from 'vitest'
import { UserConfig as VitestUserConfig } from 'vitest/config'
import basebuildfy from '../index.js'
import initializeStrategies from '../strategies/index.js'
import test, { afterEach, beforeEach, describe } from 'node:test'
import { ConfigEnv, UserConfig as ViteUserConfig, UserConfigFnObject as ViteConfigFnObject } from 'vite'
import { ConfigEnv as ConfigEnvVitest } from 'vitest/config'


const developmentViteEnv: ConfigEnv = {
  command: 'serve',
  mode: 'development'
}

const developmentVitestEnv: ConfigEnvVitest = {
  command: 'serve',
  mode: 'development'
}

describe(`basebuildfy`, () => {

  //#region default
  describe(`when configs array is empty`, () => {
    it(`throw an error`, () => {
      expect(() => basebuildfy({ configs: undefined })).toThrow('configs array is required')
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
        const finalSettings = basebuildfy<ViteUserConfig>({ configs: [{}] })
        // const finalSettings = finalConfigFunction(developmentViteEnv)

        expect(viteSpy).toHaveBeenCalled()
        expect(finalSettings).toMatchObject({})
      })

      it(`basebuildfies a single vite's config function`, () => {
        viteSpy = vi.spyOn(initializeStrategies, 'vite')

        const configFunction = vi.fn()

        const finalConfigFunction = basebuildfy({ configs: [configFunction] })
        const finalSettings = finalConfigFunction(developmentViteEnv)

        expect(viteSpy).toHaveBeenCalled()
        expect(configFunction).toHaveBeenCalledWith({ ...developmentViteEnv, basebuild: { defaults: {} } })
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
        const finalSettings = finalConfigFunction(developmentViteEnv)

        expect(viteSpy).toHaveBeenCalled()
        expect(savedArgs1).toMatchObject({ ...developmentViteEnv, basebuild: { defaults: {} } })
        expect(savedArgs2).toMatchObject({ ...developmentViteEnv, basebuild: { defaults: {} } })
        expect(savedArgs3).toMatchObject({ ...developmentViteEnv,
          basebuild: {
            defaults: { build: { minify: 'esbuild' } }
          }
        })
        expect(finalSettings).toMatchObject({
          build: {
            minify: 'esbuild',
            outDir: './dist',
          }
        })
      })
    })
  })

  // #region vitest
  describe(`when configSystem is setted to vitest`, () => {
    describe(`and configs is not empty`, () => {
      let vitestSpy

      afterEach(() => {
        vitestSpy.mockReset()
      })

      it(`basebuildfies a single vitest's config object`, () => {
        vitestSpy = vi.spyOn(initializeStrategies, 'vitest')
        const finalSettings = basebuildfy<VitestUserConfig>({ configSystem: 'vitest', configs: [{}] })
        // const finalSettings = finalConfigFunction(developmentVitestEnv)

        expect(vitestSpy).toHaveBeenCalled()
        expect(finalSettings).toMatchObject({})
      })

      it(`basebuildfies a single vitest's config function`, () => {
        vitestSpy = vi.spyOn(initializeStrategies, 'vitest')

        const configFunction = vi.fn()

        const finalConfigFunction = basebuildfy({ configSystem: 'vitest', configs: [configFunction] })
        const finalSettings = finalConfigFunction(developmentVitestEnv)

        expect(vitestSpy).toHaveBeenCalled()
        expect(configFunction).toHaveBeenCalledWith({ ...developmentVitestEnv, basebuild: { defaults: {} } })
        expect(finalSettings).toMatchObject({})
      })

      it(`basebuildfies multiple vitest's config functions in a recursive/linear way`, () => {
        vitestSpy = vi.spyOn(initializeStrategies, 'vitest')

        let savedArgs1 = null
        const configFunction = vi.fn().mockImplementation((args) => {
          savedArgs1 = JSON.parse(JSON.stringify(args))
        })
        let savedArgs2 = null
        const configFunction2 = vi.fn().mockImplementation((args) => {
          savedArgs2 = JSON.parse(JSON.stringify(args))
          return {
            test: {
              globals: true,
            }
          }
        })
        let savedArgs3 = null
        const configFunction3 = vi.fn().mockImplementation((args) => {
          savedArgs3 = JSON.parse(JSON.stringify(args))
          return {
            test: {
              environment: 'jsdom',
            }
          }
        })

        const finalConfigFunction = basebuildfy({ configSystem: 'vitest', configs: [configFunction, configFunction2, configFunction3] })
        const finalSettings = finalConfigFunction(developmentViteEnv)

        expect(vitestSpy).toHaveBeenCalled()
        expect(savedArgs1).toMatchObject({ ...developmentViteEnv, basebuild: { defaults: {} } })
        expect(savedArgs2).toMatchObject({ ...developmentViteEnv, basebuild: { defaults: {} } })
        expect(savedArgs3).toMatchObject({
          ...developmentViteEnv,
          basebuild: {
            defaults: { test: { globals: true } }
          }
        })
        expect(finalSettings).toMatchObject({
          test: {
            globals: true,
          }
        })
      })
    })
  })

})