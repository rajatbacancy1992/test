import React from "react"
import {Switch,BrowserRouter,Route} from  "react-router-dom" 
import { PublicUrl, AdminUrl } from "../Utility/constant"
import {Login } from "../Pages/index"
import {AdminSignUp} from "../Pages/Admin"
export class Routes extends React.Component{

    render()
    {
        return<>
        <BrowserRouter>
       
        <AdminRoute/>
            <UserRoute/>
          
       
        </BrowserRouter>
        </>
    }
}
const UserRoute=()=>{
    return <>
     <Switch>     
          <Route exact path={PublicUrl.home} component={()=>{
                return(<>Landing...</>)
            }}
            />
            <Route  exact path={PublicUrl.login} component={Login}/>
    </Switch>

           
     </>
}
const AdminRoute=()=>{
    return<>
    <Switch>
    <Route  exact path={AdminUrl.signup} component={AdminSignUp}/>
   </Switch>
    </>
}