import { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";
import ButtonsAction from "../components/ButtonsAction";
import PasswordInput from "../components/PasswordInput";
import useValidate from "../hooks/useValidate";
import EmailInput from "../model/business/EmailInput";
import PassInput from "../model/business/PassInput";
import MessageBoxError from "../components/MessageBoxError";
import MessageError from "../components/MessageError";
import { useAuthCtx } from "../context/AuthContext";

const AccountSettings = () => {
  const [editEmail, setEditEmail] = useState(false);
  const [editPass, setEditPass] = useState(false);

  /**
   * This state shows the error messages when the user tries to changer
   * his or her email, they must type their current password to allow this
   * action to proceed.
   */
  const [errorEmailMessages, setErrorEmailMessages] = useState([]);

  const [emailState, emailDispatch, formDataEmail] = useValidate(EmailInput);

  /**
   *
   * This state is used to manage the password change, and unlike email the password
   * change handle error messages differently from email change.
   */
  const [passState, passDispatch, formDataPass] = useValidate(PassInput);

  const { user } = useAuthCtx();

  const handleEmailChange = (e) => {
    emailDispatch({
      type: "CHANGE",
      name: e.target.name,
      value: e.target.value,
    });
  };

  const handleEmailTouch = (e) => {
    emailDispatch({ type: "TOUCH", name: e.target.name, touched: true });
    if (e.target.name === "email") {
      setErrorEmailMessages([]);
    } else if (e.target.name === "password") {
      setErrorEmailMessages([]);
    }
  };

  useEffect(() => {
    if (emailState && emailState.email.touched && !emailState.email.isValid) {
      setErrorEmailMessages((prev) => [
        ...new Set([...prev, "Email is required"]),
      ]);
    }
  }, [emailState]);

  useEffect(() => {
    if (
      emailState &&
      emailState.password.touched &&
      !emailState.password.isValid
    ) {
      setErrorEmailMessages((prev) => [
        ...new Set([...prev, "Password is required"]),
      ]);
    }
  }, [emailState]);

  const handleEmailCancel = () => {
    setEditEmail(false);
    setErrorEmailMessages([null]);
  };

  const handleSubmitEmail = (e) => {
    e.preventDefault();
    console.log(formDataEmail);
    setEditEmail(false);
    setErrorEmailMessages([]);
  };

  // Password handlers

  const handlePassChange = (e) => {
    passDispatch({
      type: "CHANGE",
      name: e.target.name,
      value: e.target.value,
    });
  };

  const handlePassTouch = (e) => {
    passDispatch({ type: "TOUCH", name: e.target.name, touched: true });
  };

  const handleSubmitPassword = (e) => {
    e.preventDefault();
    console.log(formDataPass);
    setEditPass(false);
  };

  return (
    <section className="w-full rounded p-6 border-[1px] border-gray-200">
      <h1 className="text-2xl font-bold my-20">Account Settings</h1>
      <div className="flex flex-col">
        <h2 className="font-semibold text-2xl text-slate-600 mb-4">
          Email and Password
        </h2>
        {errorEmailMessages.map((message) => (
          <MessageBoxError
            key={message}
            message={message}
          />
        ))}
        <div className="flex flex-col">
          <div className="flex items-center justify-between gap-4">
            <small
              htmlFor="email"
              className="text-sm">
              Email
            </small>
            {!editEmail && (
              <button
                onClick={() => setEditEmail(true)}
                className="p-2 rounded hover:bg-gray-300">
                <FaPen size={16} />
              </button>
            )}
          </div>
          <p className="text-lg text-gray-500">{`${user.role}@pop.com`}</p>
          {editEmail && (
            <form onSubmit={handleSubmitEmail}>
              <div className="space-y-4">
                <div className="flex flex-col space-y-1">
                  <label
                    htmlFor="email"
                    className="font-light text-sm">
                    New Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    value={emailState.email.value}
                    onChange={handleEmailChange}
                    onBlur={handleEmailTouch}
                    className={`block py-2 border rounded w-full pl-4`}
                  />
                </div>

                <PasswordInput
                  id={"password"}
                  title={"Password"}
                  placeholder="Current Password"
                  value={emailState.password.value}
                  onChange={handleEmailChange}
                  onBlur={handleEmailTouch}
                />

                <ButtonsAction
                  disabled={!emailState.isFormValid}
                  onCancel={handleEmailCancel}
                />
              </div>
            </form>
          )}
        </div>
        {/* PASSWORD CHANGE */}
        <div className="flex flex-col mt-4">
          <div className="flex items-center justify-between gap-4">
            <small className="text-sm">Current Password</small>
            {!editPass && (
              <button
                onClick={() => setEditPass(true)}
                className="p-2 rounded hover:bg-gray-300">
                <FaPen size={16} />
              </button>
            )}
          </div>
          {!editPass && <p className="text-lg">*************</p>}
          {editPass && (
            <form onSubmit={handleSubmitPassword}>
              <div className="space-y-4">
                <PasswordInput
                  id={"currentPass"}
                  title={"Re-enter your current password"}
                  value={passState.currentPass.value}
                  onChange={handlePassChange}
                  onBlur={handlePassTouch}
                  isValid={
                    passState.currentPass.touched &&
                    !passState.currentPass.isValid
                  }
                />
                {passState.currentPass.touched &&
                  !passState.currentPass.isValid && (
                    <MessageError>
                      Current password must be at least 4 characters, no spaces
                    </MessageError>
                  )}

                <PasswordInput
                  id={"newPassword"}
                  title={"New password"}
                  value={passState.newPassword.value}
                  onChange={handlePassChange}
                  onBlur={handlePassTouch}
                  isValid={
                    passState.newPassword.touched &&
                    !passState.newPassword.isValid
                  }
                />
                {passState.newPassword.touched &&
                  !passState.newPassword.isValid && (
                    <MessageError>
                      New password must be at least 4 characters, no spaces
                    </MessageError>
                  )}

                <PasswordInput
                  id={"reenterPassword"}
                  title={"Re-enter new password"}
                  value={passState.reenterPassword.value}
                  onChange={handlePassChange}
                  onBlur={handlePassTouch}
                  isValid={
                    passState.reenterPassword.touched &&
                    !passState.reenterPassword.isValid
                  }
                />
                {passState.reenterPassword.touched &&
                  !passState.reenterPassword.isValid && (
                    <MessageError>
                      Re-enter new password must be at least 4 characters, no
                      spaces
                    </MessageError>
                  )}

                <ButtonsAction
                  disabled={!passState.isFormValid}
                  onCancel={() => setEditPass(false)}
                />
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default AccountSettings;
