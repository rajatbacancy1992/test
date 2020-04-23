import React from "react"
import {Switch,BrowserRouter,Route} from  "react-router-dom" 
import { PublicUrl, AdminUrl, UserUrl } from "../Utility/constant"
import {Login,ForgotPassword, ChangePassword } from "../Pages/index"
import {AdminSignUp} from "../Pages/Admin"
export class Routes extends React.Component{

    render()
    {
        return<>
        <BrowserRouter>
        <Route  exact path={"/"} component={Login}/>
        <AdminRoute/>
            <UserRoute/>
          
       
        </BrowserRouter>
        </>
    }
}
const UserRoute=()=>{
    return <>
     <Switch>     
       
            <Route  exact path={PublicUrl.login} component={Login}/>
            <Route  exact path={UserUrl.forgot_password} component={ForgotPassword}/>
            <Route  exact path={UserUrl.change_password} component={ChangePassword}/>
    </Switch>

           
     </>
}
const AdminRoute=()=>{
    return<>
    <Switch>
    <Route  exact path={AdminUrl.signup} component={AdminSignUp}/>
    <Route  exact path={AdminUrl.change_password} component={ForgotPassword}/>
    <Route  exact path={AdminUrl.change_password} component={ChangePassword}/>
   </Switch>
    </>
}