import React, { useState } from "react";
import Input from "../../../Components/Common/Input";
import { cloneDeep } from "lodash";
import { getFormDetails } from "../../../Utility/Helper";
import { te, ts } from "../../../Utility/ReduxToaster";
import { postSignUp } from "../../../Utility/Services/Admin/signup";
import { PublicUrl } from "../../../Utility/constant";
import { Link } from "react-router-dom";
const initSignUp = {
  form: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    errors: {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      conifrmPassword:null
    },
  },
  loading: false,
  showPassword:false
};
export const AdminSignUp = () => {
  let [state, setState] = useState({ ...cloneDeep(initSignUp) });
  let { loading,showPassword } = state;
  let {
    username,
    password,
    firstName,
    lastName,
    email,
    conifrmPassword,
    errors,
  } = state.form;
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
    if (
      name == "conifrmPassword" &&
      conifrmPassword &&
      conifrmPassword != password
    ) {
      error = "Those password didn't match. Try again.";
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
      let obj = cloneDeep(state.form);
      delete obj.errors;
      postSignUp(obj).then((res) => {
        if (res.error) {
          state.loading = false;
          setState({ ...state });
          return;
        }
        if (res.data.status == 200) {
          ts(res.data.message);
        } else {
          te(res.data.message);
        }
        state.loading = false;
        setState({ ...state });
      });
    }
  };
  const ShowPassword=()=>{
    state.showPassword=!showPassword
    setState({...state})
  }
  return (
    <div class="login-wrapper">
      <div class="login-block">
        <div class="login-background">
          <img
            class="img-fluid background-img"
            src="/images/login-bg.jpg"
            alt=""
          />
        </div>
        <div class="login-form-block">
          <div class="form-block">
            <div class="logo-block">
              <img src="/images/logo.png" alt="" class="logo-img" />
            </div>
            <form class="login-form" onSubmit={OnSubmit}>
              <div class="row">
                <div class="col-sm-6">
                  <div class="form-group">
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
                </div>
                <div class="col-sm-6">
                  <div class="form-group">
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
                </div>
                <div class="col-12">
                  <div class="form-group">
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
                </div>
                <div class="col-xl-6 win-md-12">
                  <div class="form-group">
                    <label class="label-md">Password *</label>
                    <div class="input-icon-group">
                      <Input
                       type={showPassword?"text":"password"}
                        placeholder="Password"
                        isReq={true}
                        value={password}
                        name="password"
                        error={errors.password}
                        onChangeFunc={onInputChange}
                        validationFunc={onInputValidate}
                        title="Password"
                        isLabel={false}
                        onClick={ShowPassword}
                      />
                      <a
                        class="ic-eye icon cursor-pointer js-toggle-password"
                        href="#!"
                        data-target="#js-toggle-password"
                        onClick={ShowPassword}
                      ></a>
                    </div>
                  </div>
                </div>
                <div class="col-xl-6 win-md-12">
                  <div class="form-group">
                    <label class="label-md">Confirm Password *</label>
                    <div class="input-icon-group">
                      <Input
                      type={showPassword?"text":"password"}
                        title="Conifrm Password"
                        placeholder="Conifrm Password"
                        isReq={true}
                        value={conifrmPassword}
                        error={errors.conifrmPassword}
                        name="conifrmPassword"
                        onChangeFunc={onInputChange}
                        validationFunc={onInputValidate}
                        isLabel={false}
                      />
                      <a
                        class="ic-eye icon cursor-pointer js-toggle-password"
                        href="#!"
                        onClick={ShowPassword}
                        //data-target="#js-toggle-confirm-password"
                      ></a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group double">
                <button class="btn btn-primary btn-block text-uppercase login-button">
                  {loading ? "Please wait..." : "Register"}
                </button>
              </div>
              <div class="text-center">
                <Link
                  class="mx-auto new-user-text text-black backto-login"
                  to={PublicUrl.login}
                >
                  <ic class="ic-long-arrow-left icon"></ic> Back to Login
                </Link>
              </div>
            </form>
            <p class="copyright-text text-secondary">
              Copyright © 2020 Quarkza. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
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
                {loading ? "Please wait..." : "Signup"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
