import React, { useState, useEffect } from "react";
import Input from "../../Components/Common/Input";
import { cloneDeep } from "lodash";
import { getFormDetails } from "../../Utility/Helper";
import { te, ts } from "../../Utility/ReduxToaster";
import { post } from "../../Utility/Services/httpInterCeptor";
import { postLogin } from "../../Utility/Services/Login";
import {connect} from "react-redux"
import {syncLogin} from "../../Redux/Action/Login";
import {Link } from "react-router-dom"
import { AdminUrl, PublicUrl, UserUrl } from "../../Utility/constant";
const initLogin = {
  form: {
    username: "",
    password: "",
    errors: { username: null, password: null },
  },
  loading: false,
  passwordShow: false,
  keepMeLogin: false,
};
export const LoginComponent = (props) => {
  let [state, setState] = useState({ ...cloneDeep(initLogin) });
  let {syncLogin}=props
  let { loading, passwordShow, keepMeLogin } = state;
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
    if (obj) {
      state.loading = true;
      setState({ ...state });
      postLogin(state.form).then((res) => {
        if (res.error) {
          return;
        }
        if(res.data.status==200)
        {
          ts(res.data.message)
          syncLogin(res)
          localStorage.setItem("token",res.data.token)
        }else
        {
          te(res.data.message)
         
        }
        state.loading=false;
       
        setState({...state})
      });
    }
  };
  const ResetForm = () => {
    localStorage.setItem("keepMeLogin",false)
    setState(cloneDeep(initLogin));
  };
  const PasswordShow = () => {
    state.passwordShow = !passwordShow;
    setState({ ...state });
  };
  const KeepMeLogin = () => {
    state.keepMeLogin = !state.keepMeLogin;
    localStorage.setItem("keepMeLogin",   state.keepMeLogin);
    setState({ ...state });
  };
  return (
    <>
      <div class="login-wrapper">
        <div class="login-block">
          <div class="login-background">
            <img
              class="img-fluid background-img"
              src="images/login-bg.jpg"
              alt=""
            />
          </div>
          <div class="login-form-block">
            <div class="form-block">
              <div class="logo-block">
                <img src="images/logo.png" alt="" class="logo-img" />
              </div>
              <form class="login-form" onSubmit={OnSubmit}>
                <ul class="nav nav-tabs login-as-tabs">
                  <li class="nav-item" onClick={ResetForm}>
                    <a
                      class="nav-link active"
                      data-toggle="tab"
                      href="#as-user"
                    >
                      As a User
                    </a>
                    <span class="active-line"></span>
                  </li>
                  <li class="nav-item" onClick={ResetForm}>
                    <a class="nav-link" data-toggle="tab" href="#as-admin">
                      As a Admin
                    </a>
                    <span class="active-line"></span>
                  </li>
                </ul>
                <div class="tab-content">
                  <div class="tab-pane active" id="as-user">
                    <div class="form-group">
                      <Input
                        placeholder="Email"
                        title="Email"
                        className="form-control"
                        onChangeFunc={onInputChange}
                        name="username"
                        value={username}
                        error={errors.username}
                        isReq={true}
                        //reqType="email"
                        validationFunc={onInputValidate}
                      />
                    </div>
                    <div class="form-group">
                      <label class="label-md">Password *</label>
                      <div class="input-icon-group">
                        <Input
                          type={passwordShow ? "text" : "password"}
                          placeholder="Password"
                          title="Password"
                          onChangeFunc={onInputChange}
                          name="password"
                          value={password}
                          error={errors.password}
                          isReq={true}
                          validationFunc={onInputValidate}
                          isLabel={false}
                        />
                        <a
                          class="ic-eye icon cursor-pointer js-toggle-password"
                          href="javascript:void(0)"
                          //  data-target="#js-toggle-password"
                          onClick={PasswordShow}
                        ></a>
                      </div>
                    </div>
                    <div class="form-group double">
                      <button class="btn btn-primary btn-block text-uppercase login-button" disabled={loading}>
                      {loading?"Please wait...":"Login"} 
                      </button>
                      <div class="form-row align-items-center">
                        <div class="col left">
                          <label class="custom-control text-secondary custom-checkbox">
                            <input
                              id="my-input"
                              class="custom-control-input"
                              type="checkbox"
                              name=""
                              value="true"
                              checked={keepMeLogin}
                              onClick={() => {
                                KeepMeLogin();
                              }}
                            />
                            <span for="my-input" class="custom-control-label">
                              Keep me logged in
                            </span>
                          </label>
                        </div>
                        <div class="col right">
                          <Link
                            to={UserUrl.forgot_password}
                            class="text-secondary forgot-text"
                          >
                            {" "}
                            Forgot Password?
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="tab-pane fade" id="as-admin">
                    <div class="form-group">
                      <Input
                        placeholder="Email"
                        title="Email"
                        className="form-control"
                        onChangeFunc={onInputChange}
                        name="username"
                        value={username}
                        error={errors.username}
                        isReq={true}
                       // reqType="email"
                        validationFunc={onInputValidate}
                      />
                    </div>
                    <div class="form-group">
                      <label class="label-md">Password</label>
                      <div class="input-icon-group">
                        <Input
                          type={passwordShow ? "text" : "password"}
                          placeholder="Password"
                          title="Password"
                          onChangeFunc={onInputChange}
                          name="password"
                          value={password}
                          error={errors.password}
                          isReq={true}
                          validationFunc={onInputValidate}
                          isLabel={false}
                        />
                        <a
                          class="ic-eye icon cursor-pointer js-toggle-password"
                          href="#!"
                          // data-target="#js-toggle-password"
                          onClick={PasswordShow}
                        ></a>
                      </div>
                    </div>
                    <div class="form-group double">
                      <button class="btn btn-primary btn-block text-uppercase login-button" disabled={loading}>
                     {loading?"Please wait...":"Login"}
                      </button>
                      <div class="form-row align-items-center">
                        <div class="col left">
                          <label class="custom-control text-secondary custom-checkbox">
                            <input
                              id="my-input"
                              class="custom-control-input"
                              type="checkbox"
                              name=""
                              value="true"
                              checked={keepMeLogin}
                              onClick={KeepMeLogin}
                            />
                            <span for="my-input" class="custom-control-label">
                              Keep me logged in
                            </span>
                          </label>
                        </div>
                        <div class="col right">
                          <Link
                            to={AdminUrl.forgot_password}
                            class="text-secondary forgot-text"
                          >
                            {" "}
                            Forgot Password?
                          </Link>
                        </div>
                      </div>
                    </div>
                    <p class="new-user-text text-secondary">
                      New User?{" "}
                      <Link to={AdminUrl.signup} class="text-link">
                        Create Account
                      </Link>
                    </p>
                  </div>
                </div>
              </form>
              <p class="copyright-text text-secondary">
                Copyright © 2020 Quarkza. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
 
};
export const Login=connect(state=>state,{syncLogin})(LoginComponent)