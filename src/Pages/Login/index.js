import React, { useState, useEffect } from "react";
import Input from "../../Components/Common/Input";
import { cloneDeep } from "lodash";
import { getFormDetails } from "../../Utility/Helper";
import { te } from "../../Utility/ReduxToaster";
const initLogin = {
  form: {
    username: "",
    password: "",
    errors: { username: null, password: null },
  },
};
export const Login = () => {
  let [state, setState] = useState({ ...cloneDeep(initLogin) });
  let { username, password, errors } = state.form;
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
  };
  return (
    <>
      {" "}
      <div className="container border">
        <form onSubmit={OnSubmit}>
          <div className="row">
            <div className="col-lg-12">
              <Input
                placeholder="Username or Email address"
                title="Username or Email Address"
                className="form-control"
                onChangeFunc={onInputChange}
                name="username"
                value={username}
                error={errors.username}
                isReq={true}
                validationFunc={onInputValidate}
              />
            </div>
            <div className="col-lg-12">
              <Input
                placeholder="Password"
                title="Password"
                onChangeFunc={onInputChange}
                name="password"
                value={password}
                error={errors.password}
                isReq={true}
                validationFunc={onInputValidate}
              />
            </div>
            <div className="col-lg-12 text-center">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </div>
        </form>
      </div>{" "}
    </>
  );
};
