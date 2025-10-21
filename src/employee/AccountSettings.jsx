import { useState } from "react";
import { FaPen } from "react-icons/fa";
import ButtonsAction from "../components/ButtonsAction";
import PasswordInput from "../components/PasswordInput";
import useValidate from "../hooks/useValidate";
import AccountSettingsEmailInput from "../model/AccountSettingsEmailInput";
import AccountSettingsPassInput from "../model/AccountSettingsPassInput";

const AccountSettings = () => {
  const [editEmail, setEditEmail] = useState(false);
  const [editPass, setEditPass] = useState(false);

  const [emailState, emailDispatch, formDataEmail] = useValidate(
    AccountSettingsEmailInput
  );

  const [passState, passDispatch, formDataPass] = useValidate(
    AccountSettingsPassInput
  );

  const handleEmailChange = (e) => {
    emailDispatch({
      type: "CHANGE",
      name: e.target.name,
      value: e.target.value,
    });
  };

  const handlePassChange = (e) => {
    passDispatch({
      type: "CHANGE",
      name: e.target.name,
      value: e.target.value,
    });
  };

  const handleSubmitEmail = (e) => {
    e.preventDefault();
    console.log(formDataEmail);
    setEditEmail(false);
  };

  const handleSubmitPassword = (e) => {
    e.preventDefault();
    console.log(formDataPass);
    setEditPass(false);
  };

  return (
    <section className="rounded p-6 border-[1px] border-gray-200">
      <h1 className="text-2xl font-bold my-20">Account Settings</h1>
      <div className="flex flex-col">
        <h2 className="font-semibold text-2xl text-slate-600 mb-4">
          Email and Password
        </h2>
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
          <p className="text-lg text-gray-500">fabio@pop.com</p>
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
                    className="block py-2 border rounded w-full pl-4"
                  />
                </div>

                <PasswordInput
                  id={"password"}
                  title={"Password"}
                  value={emailState.password.value}
                  onChange={handleEmailChange}
                />

                <ButtonsAction
                  disabled={!emailState.isFormValid}
                  onCancel={() => setEditEmail(false)}
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
                />

                <PasswordInput
                  id={"newPassword"}
                  title={"New password"}
                  value={passState.newPassword.value}
                  onChange={handlePassChange}
                />

                <PasswordInput
                  id={"reenterPassword"}
                  title={"Re-enter new password"}
                  value={passState.reenterPassword.value}
                  onChange={handlePassChange}
                />

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
