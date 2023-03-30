import { defineConfig, CommonServerOptions } from 'vite';
import vue from '@vitejs/plugin-vue';
import fs from 'fs';
// 拓展之后需要引入DotenvParseOutput才能体现效果
import dotenv, { DotenvParseOutput } from 'dotenv';

interface CustomDotenvParseOutput {
  VITE_PORT: number;
  VITE_HOST: string;
  VITE_PROXYURL: string;
  VITE_PROXY: string;
}

type FinallyParseOutput = CustomDotenvParseOutput & DotenvParseOutput;

// https://vitejs.dev/config/
// defineConfig可以返回一个对象，也可以返回一个函数，但是函数的灵活度比较高
export default defineConfig((mode) => {
  const envName = '.env';
  // 动态加载env文件名
  const envFileName = `${envName}.${mode.mode}`;
  // 配置的server
  let server: CommonServerOptions = {};
  const envData = fs.readFileSync(envFileName);
  const envMap: FinallyParseOutput = dotenv.parse(envData);
  // 生产模式和开发模式的vite.config.ts配置是不同的
  if (mode.mode === 'development') {
    console.log('现在是生产者模式');
    server = {
      host: envMap.VITE_HOST,
      port: envMap.VITE_PORT,
      proxy: {
        [envMap.VITE_PROXYURL]: {
          target: envMap.VITE_PROXY
        }
      }
    };
  } else {
    server = {
      host: envMap.VITE_HOST,
      port: envMap.VITE_PORT
    };
  }
  console.log(server);
  return {
    plugins: [vue()],
    server
  };
});
