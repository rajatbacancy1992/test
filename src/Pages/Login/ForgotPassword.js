import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PublicUrl } from "../../Utility/constant";
import { postGetOtpByEmail, postOtpVerify } from "../../Utility/Services/Login";
import { cloneDeep } from "lodash";
import Input from "../../Components/Common/Input";
import { ts, te } from "../../Utility/ReduxToaster";
import OtpInput from "react-otp-input";
const initForgotPassword = {
  form: { Email: "", OTP: "", errors: { Email: null, OTP: null } },
  emailVerifyLoading: false,
  otpVerifyLoading: false,
  emailVerify: false,
};

export const ForgotPassword = () => {
  const [state, setState] = useState(cloneDeep(initForgotPassword));
  let { Email, errors, OTP } = state.form;
  let { emailVerifyLoading, emailVerify, otpVerifyLoading } = state;

  const JqueryCode = () => {
    window.$(window).on("load", function () {
      setTimeout(function () {
        window.$(".loader").fadeOut();
      }, 1000);
    });
    window.$(".js-toggle-password").click(function (e) {
      e.preventDefault();
      if (
        window.$(window.$(this).attr("data-target")).attr("type") == "password"
      ) {
        window.$(window.$(this).attr("data-target")).attr("type", "text");
        window.$(this).addClass("ic-eye-slash hide-password");
      } else {
        window.$(window.$(this).attr("data-target")).attr("type", "password");
        window.$(this).removeClass("ic-eye-slash hide-password");
      }
    });
    window.$(".js-pin-navigation").keyup(function (e) {
      if (window.$(this).val().length == 1) {
        window.$(this).parent().next().find(".input-pin").focus();
      }
    });
    window.$(".js-pin-navigation").keydown(function (e) {
      if (e.keyCode == 8) {
        if (!window.$(this).val()) {
          window.$(this).parent().prev().find(".input-pin").focus();
        }
      }
    });
    window.$(".js-show-otp-block").click(function (e) {
      e.preventDefault();
      window.$(this).parent().slideUp(100);
      window.$(window.$(this).attr("data-target")).slideDown();
    });
  };

  useEffect(() => {
    JqueryCode();
  }, [emailVerify]);
  const VerifyOtp = () => {
    state.otpVerifyLoading = true;
    setState({ ...state });
    let otp = "";
    otp += window.$(".otp-1").val();
    otp += window.$(".otp-2").val();
    otp += window.$(".otp-3").val();
    otp += window.$(".otp-4").val();
    otp += window.$(".otp-5").val();
    otp += window.$(".otp-6").val();
    postOtpVerify({ OTP: otp }).then((res) => {
      if (res.error) {
        state.otpVerifyLoading = false;
        setState({ ...state });
        return;
      }
      if (res.data.status == 200) {
        ts(res.data.message);
      } else {
        te(res.data.message);
      }
      state.otpVerifyLoading = false;
      setState({ ...state });
    });
  };
  const GetOtpByEmail = () => {
    state.emailVerifyLoading = true;
    setState({ ...state });
    postGetOtpByEmail({ Email: Email }).then((res) => {
      if (res.error) {
        state.emailVerifyLoading = false;
        state.emailVerify = false;
        setState({ ...state });
        return;
      }
      if (res.data.status == 200) {
        ts(res.data.message);
        state.emailVerify = true;
        
      } else {
        state.emailVerify = false;
        te(res.data.message);
      }
      state.emailVerifyLoading = false;
      setState({ ...state });
    });
  };
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
  return (
    <>
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
              <form
                class="login-form"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <p class="forgot-text">
                  We will send you an email that will help you create a new
                  password for your account.
                </p>
                <div class="form-group">
                  <Input
                    name="Email"
                    onChangeFunc={onInputChange}
                    validationFunc={onInputValidate}
                    value={Email}
                    reqType="email"
                    error={errors.Email}
                    title="Email"
                    placeholder="Email Address"
                    disabled={emailVerify}
                  />
                  {emailVerify && (
                    <div class="text-right resend-otp">
                      <a
                        href="#!"
                        class="text-link text-sm mt-1 d-inline-block"
                        onClick={() => {
                          if (!emailVerifyLoading) {
                            GetOtpByEmail();
                          }
                        }}
                      >
                        Resend OTP
                      </a>
                    </div>
                  )}
                </div>
                {!emailVerify && (
                  <div class="form-group double">
                    <button
                      href="#!"
                      data-target={`${".otp-block,.resend-otp"}`}
                      class={`btn btn-primary btn-block text-uppercase ${emailVerify&&"js-show-otp-block login-button"}`}
                      onClick={() => {
                        if (Email && !errors.Email) {
                          GetOtpByEmail();
                        }
                      }}
                      disabled={emailVerifyLoading}
                    >
                      {emailVerifyLoading ? "Please wait..." : "Send"}
                    </button>
                  </div>
                )}
                {emailVerify && (
                  <div class="otp-block">
                    <div class="form-group">
                      <label class="label-md">OTP</label>
                      <div class="form-row">
                        <div class="col">
                          <input
                            type="text"
                            class="form-control input-pin js-pin-navigation otp-1"
                            maxlength="1"
                          />
                        </div>
                        <div class="col">
                          <input
                            type="text"
                            class="form-control input-pin js-pin-navigation otp-2"
                            maxlength="1"
                          />
                        </div>
                        <div class="col">
                          <input
                            type="text"
                            class="form-control input-pin js-pin-navigation otp-3"
                            maxlength="1"
                          />
                        </div>
                        <div class="col">
                          <input
                            type="text"
                            class="form-control input-pin js-pin-navigation otp-4"
                            maxlength="1"
                          />
                        </div>
                        <div class="col">
                          <input
                            type="text"
                            class="form-control input-pin js-pin-navigation otp-5"
                            maxlength="1"
                          />
                        </div>
                        <div class="col">
                          <input
                            type="text"
                            class="form-control input-pin js-pin-navigation otp-6"
                            maxlength="1"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="form-group double">
                      <a
                        href="Javascript:void()"
                        class="btn btn-primary btn-block text-uppercase login-button"
                        onClick={VerifyOtp}
                        disabled={otpVerifyLoading}
                      >
                        {otpVerifyLoading ? "Please wait..." : "Submit"}
                      </a>
                    </div>
                  </div>
                )}
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
    </>
  );
};
