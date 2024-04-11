# basebuild
Basebuild is the core project to build your own dev ecosystem. Write once, use everywhere! ;)

# Usage
`To create a basebuild child project like 'basebuild-vue'`
```typescript
import basebuild from 'basebuild'
import vue from '@vitejs/plugin-vue'
import { UserConfig } from 'vite'

export const basebuildVue = (userConfig: UserConfig) => {

  const bbVueConfigFn = ({ command, basebuildDefaults }) => {
    return {
      plugins: [
        ...basebuildDefaults.plugins, // rollup-plugin-copy plugin
        vue()
      ]
    }
  }

  return basebuild({
    configSystem: 'vite',
    configs: [
      bbVueConfigFn,
      userConfig
    ]
  })
}
```

`To use the basebuild child project in vite.config.ts`
```typescript
import basebuildVue from 'basebuild-vue'
import { splitVendorChunkPlugin } from 'vite'

export default basebuildVue(({ command, basebuildDefaults }) => {
  return {
    plugins: [
      ...basebuildDefaults.plugins,
      splitVendorChunkPlugin()
    ] // now it should be [rollup-plugin-copy, vite-plugin-vue, vite-plugin-split-vendor-chunk]
  }
})
```