import {post} from "./httpInterCeptor"

export const postLogin=(form)=>{
  return post(`/api/user/login`,form).then(res=>{
      console.log("postLogin",res)
      return res
  })
}

export const postGetOtpByEmail=(form={})=>{
  return post(`/api/user/getotp`,form).then(res=>{
    console.log("postGetOtpByEmail",res)
    return res
})
}