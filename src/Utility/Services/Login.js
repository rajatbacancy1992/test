import {post} from "./httpInterCeptor"

export const postLogin=(form)=>{
  return post(`/api/user/login`,form).then(res=>{
      console.log("postLogin",res)
      return res
  })
}