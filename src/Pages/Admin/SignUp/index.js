import React, { useState } from "react";
import Input from "../../../Components/Common/Input";
import { cloneDeep } from "lodash";
import { getFormDetails } from "../../../Utility/Helper";
import { te, ts } from "../../../Utility/ReduxToaster";
import { postSignUp } from "../../../Utility/Services/Admin/signup";
const initSignUp = {
  form: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    errors:{ 
    firstName: null,
    lastName: null,
    email: null,
    password: null,
}
  },
  loading: false,
};
export const AdminSignUp = () => {
  let [state, setState] = useState({ ...cloneDeep(initSignUp) });
  let { loading } = state;
  let { username, password,firstName,lastName,email, conifrmPassword,errors } = state.form;
  let onInputChange = (name, value, error = undefined) => {
    const { form } = state;
    form[name] = value;
    if (error !== undefined) {
      let { errors } = form;
      errors[name] = error;
    }
    setState({ ...state, form });
  };
  // handle validation
  let onInputValidate = (name, error) => {
    let { errors } = state.form;
    if(name=="conifrmPassword"&&conifrmPassword&&conifrmPassword!=password)
    {
        error="Those password didn't match. Try again."
    }
    errors[name] = error;
    setState({ ...state, form: state.form });
  };
  const OnSubmit = (e) => {
    e.preventDefault();
    const { form, loading } = state;
    let obj = getFormDetails(form, onInputValidate);
    if (!obj) {
      te("Please enter required information");
      return false;
    }
    if (obj) {
      state.loading = true;
      setState({ ...state });
      let obj=cloneDeep(state.form);
      delete obj.errors
      postSignUp(obj).then((res) => {
        if (res.error) {
          return;
        }
       if(res.data.status==200)
       {
           ts(res.data.message)
       }else
       {
           te(res.data.message)
       }
       state.loading=false
       setState({...state})
      });
    }
  };

  return (
    <>
      <div className="container">
          <form onSubmit={OnSubmit}>
        <div className="row">
          <div className="col-lg-12">
            <Input 
            isReq={true} 
            validationFunc={onInputValidate} 
            placeholder="First Name" 
            value={firstName} 
            name="firstName" 
            error={errors.firstName} 
            onChangeFunc={onInputChange} 
            title="First Name"
            />
          </div>
          <div className="col-lg-12">
            <Input 
            placeholder="Last Name" 
            isReq={true} 
            value={lastName}  
            name="lastName" 
            error={errors.lastName} 
            onChangeFunc={onInputChange} 
            validationFunc={onInputValidate} 
            title="Last Name"
            />
          </div>
          <div className="col-lg-12">
            <Input 
            placeholder="Email Address" 
            isReq={true} 
            value={email} 
            name="email" 
            error={errors.email} 
            onChangeFunc={onInputChange} 
            validationFunc={onInputValidate}
            title="Email Address"
            reqType="email"
            />
          </div>
          <div className="col-lg-12">
            <Input 
            placeholder="Password" 
            isReq={true} 
            value={password} 
            name="password" 
            error={errors.password} 
            onChangeFunc={onInputChange} 
            validationFunc={onInputValidate}
            title="Password"
            />
          </div>
          <div className="col-lg-12">
            <Input 
            title="Conifrm Password"
            placeholder="Conifrm Password" 
            isReq={true}  
            value={conifrmPassword} 
            error={errors.conifrmPassword} 
            name="conifrmPassword" 
            onChangeFunc={onInputChange} 
            validationFunc={onInputValidate}
            />
          </div>
          <div className="col-lg-12 text-center">
  <button className="btn btn-primary" disabled={loading}>
      {loading?"Please wait...":"Signup" }</button>
          </div>
        </div>
        </form>
      </div>
    </>
  );
};
