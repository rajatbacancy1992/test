import React from "react"
import {Switch,BrowserRouter,Route} from  "react-router-dom" 
import { PublicUrl } from "../Utility/constant"
import {Login } from "../Pages/index"
export class Routes extends React.Component{

    render()
    {
        return<>
        <BrowserRouter>
        <Switch>
            <Route exact path={PublicUrl.home} component={()=>{
                return(<>   Landing...</>)
            }}
            />
            <Route  exact path={PublicUrl.login} component={Login}/>
        </Switch>
        </BrowserRouter>
        </>
    }
}