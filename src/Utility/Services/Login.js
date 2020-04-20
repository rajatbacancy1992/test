import {post} from "./httpInterCeptor"

export const postLogin=()=>{
  return post(`/api/user/login`).then(res=>{
      console.log("postLogin",res)
      return res
  })
}