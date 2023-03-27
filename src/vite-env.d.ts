/// <reference types="vite/client" />

console.log(3213123)
// 内部接口会合并
interface ImportMetaEnv {
  VITE_name: string
  VITE_age: number
}
