import {post} from "../httpInterCeptor"

export const postSignUp=(form={})=>{
    return post(`/api/user/signup`,form).then(res=>{
        console.log("postSignUp",res)
        return res
    })
}