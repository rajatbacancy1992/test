import React, { useEffect, useState } from "react";
import { cloneDeep } from "lodash";
import Input from "../../Components/Common/Input";
const initChangePassword = {
  form: {
    NewPassword: "",
    ConifrmPassword: "",
    errors: { NewPassword: null, ConifrmPassword: null },
  },
  loading: false,
};
export const ChangePassword = () => {
  const [state, setState] = useState(cloneDeep(initChangePassword));
  let { NewPassword, ConifrmPassword, errors } = state.form;
  let { loading } = state;
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
  };
  useEffect(() => {
    JqueryCode();
  }, []);
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
      ("ConifrmPassword" == name && NewPassword != ConifrmPassword) ||
      (NewPassword && ConifrmPassword && NewPassword != ConifrmPassword)
    ) {
      errors["ConifrmPassword"] = "Those password didn't match. Try again.";
    } else {
      errors["ConifrmPassword"] = "";
    }
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
              <form class="login-form">
                <div class="form-group">
                  <label class="label-md">New Password</label>
                  <div class="input-icon-group">
                    <Input
                      type={"password"}
                      name="NewPassword"
                      onChangeFunc={onInputChange}
                      validationFunc={onInputValidate}
                      value={NewPassword}
                      error={errors.NewPassword}
                      title="New Password"
                      placeholder="New Password"
                      isLabel={false}
                      id="js-toggle-new-password"
                      isReq={true}
                    />
                    <a
                      class="ic-eye icon cursor-pointer js-toggle-password"
                      href="#!"
                      data-target="#js-toggle-new-password"
                    ></a>
                  </div>
                </div>
                <div class="form-group">
                  <label class="label-md">Confirm New Password</label>
                  <div class="input-icon-group">
                    <Input
                      type={"password"}
                      name="ConifrmPassword"
                      onChangeFunc={onInputChange}
                      validationFunc={onInputValidate}
                      value={ConifrmPassword}
                      error={errors.ConifrmPassword}
                      title="Conifrm New Password"
                      placeholder="Conifrm New Password"
                      isLabel={false}
                      id="js-toggle-confirm-new-password"
                      isReq={true}
                    />
                    <a
                      class="ic-eye icon cursor-pointer js-toggle-password"
                      href="#!"
                      data-target="#js-toggle-confirm-new-password"
                    ></a>
                  </div>
                </div>
                <div class="form-group mb-0">
                  <a
                    href="login.html"
                    class="btn btn-primary btn-block text-uppercase login-button"
                  >
                    {loading ? "Please wait..." : "Submit"}
                  </a>
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
