import { defineConfig, CommonServerOptions } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'fs'
import path from 'path'
// 拓展之后需要引入DotenvParseOutput才能体现效果
import dotenv, { DotenvParseOutput } from 'dotenv'

// 因为DotenvParseOutput底层value要求时string类型, 因此number类型就不合适, 因此就不能使用接口继承拓展接口
// export interface DotenvParseOutput {
//   [name: string]: string;
// }
interface CustomDotenvParseOutput {
  VITE_PORT: number
  VITE_HOST: string
  VITE_PROXYURL: string
  VITE_PROXY: string
}

type FinallyParseOutput = CustomDotenvParseOutput & DotenvParseOutput

// https://vitejs.dev/config/
// defineConfig可以返回一个对象，也可以返回一个函数，但是函数的灵活度比较高
export default defineConfig((mode) => {
  const envName = '.env'
  // 动态加载env文件名
  const envFileName = `${envName}.${mode.mode}`
  // 配置的server
  let server: CommonServerOptions = {}
  const envData = fs.readFileSync(envFileName)
  const envMap: FinallyParseOutput = dotenv.parse(envData)
  // 生产模式和开发模式的vite.config.ts配置是不同的
  if (mode.mode === 'development') {
    server = {
      host: envMap.VITE_HOST,
      port: envMap.VITE_PORT,
      proxy: {
        [envMap.VITE_PROXYURL]: {
          target: envMap.VITE_PROXY
        }
      }
    }
  } else {
    server = {
      host: envMap.VITE_HOST,
      port: envMap.VITE_PORT
    }
  }
  return {
    plugins: [vue()],
    server,
    resolve: {
      alias: {
        // 和 tsconfig.json 中 paths设置别名的区别，
        //  paths 主要用于编译期间别名的设置。
        // 而 vite.config.ts  中别名的设置主要用于
        // yarn dev 和 yarn build 时检测 项目中的@路径
        // ts别名配置只能保证编译期间正常运行，运行期间需要 vite 构建工具来识别，
        '@': path.resolve(__dirname, 'src')
      }
    }
  }
})
