import { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";

import useValidate from "../hooks/useValidate";
import ProfileInputs from "../model/business/ProfileInput";
import ButtonsAction from "../components/ButtonsAction";

import { useAuthCtx } from "../context/AuthContext";
import { toast } from "react-toastify";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [state, dispatch, formData] = useValidate(ProfileInputs);
  const [businesProfile, setBusinessProfile] = useState({
    id: null,
    name: "",
    industry: "",
    location: "",
  });

  const { user } = useAuthCtx();

  useEffect(() => {
    const loadBusinessProfile = async () => {
      try {
        const res = await fetch("/api/api/v1/businesses/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (res.ok) {
          const { data } = await res.json();
          setBusinessProfile(data);
        } else {
          const { message } = await res.json();
          toast.error(message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    loadBusinessProfile();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (state.isFormValid) {
      try {
        setLoading(true);
        let res;
        if (businesProfile.id && edit) {
          res = await fetch(
            `/api/api/v1/businesses/profile/${businesProfile.id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
              body: JSON.stringify(formData),
            }
          );
        } else {
          res = await fetch("/api/api/v1/businesses/profile", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify(formData),
          });
        }
        if (res.ok) {
          const { data } = await res.json();
          setBusinessProfile(data);
          if (businesProfile.id && edit) {
            toast.success("Profile updated successfully");
          } else {
            toast.success("Profile created successfully");
          }
        } else {
          const { message } = await res.json();
          toast.error(message);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(true);
        setEdit(false);
      }
    }
  };

  const handleChange = (e) => {
    dispatch({ type: "CHANGE", name: e.target.name, value: e.target.value });
  };

  const handleTouch = (e) => {
    dispatch({ type: "TOUCH", name: e.target.name, touched: true });
  };

  const handleCancel = () => {
    setEdit(false);
  };

  return (
    <>
      <section className="w-full rounded p-6 border-[1px] border-gray-200">
        <h1 className="text-2xl font-bold my-20">Business Profile</h1>
        <div className="flex items-center gap-4">
          <h2 className="font-semibold text-2xl text-slate-600">
            My information
          </h2>
          {!edit && (
            <button
              onClick={() => setEdit(true)}
              className="group p-2 cursor-pointer hover:bg-indigo-600 rounded-full">
              <FaPen
                size={16}
                className="group-hover:text-white"
              />
            </button>
          )}
        </div>
        <form
          onSubmit={submitHandler}
          className="flex flex-col gap-2 mt-4">
          <div>
            <label
              htmlFor="name"
              className="text-sm">
              Name
            </label>
            {edit && (
              <input
                type="text"
                name="name"
                id="name"
                value={state.name.value}
                onChange={handleChange}
                onBlur={handleTouch}
                placeholder="Company Name"
                className={`block w-full pl-4 py-2 border outline-none  rounded transition-colors duration-200
              ${
                state.name.touched && !state.name.isValid
                  ? "border-red-500 bg-red-100 placeholder:text-red-600"
                  : ""
              }`}
              />
            )}
            {!edit && <p className="text-lg">{businesProfile.name}</p>}
            {edit && state.name.touched && !state.name.isValid && (
              <span className="text-red-500 text-sm">Name is required</span>
            )}
          </div>

          <div>
            <label
              htmlFor="location"
              className="text-sm">
              Location
            </label>
            {edit && (
              <input
                type="text"
                name="location"
                id="location"
                value={state.location.value}
                onChange={handleChange}
                onBlur={handleTouch}
                placeholder="Location"
                className={`block w-full pl-4 py-2 border outline-none  rounded transition-colors duration-200 
                  ${
                    state.location.touched && !state.location.isValid
                      ? "border-red-500 bg-red-100 placeholder:text-red-600"
                      : ""
                  }`}
              />
            )}
            {!edit && <p className="text-lg">{businesProfile.location}</p>}
            {edit && state.location.touched && !state.location.isValid && (
              <span className="text-red-500 text-sm">Location is required</span>
            )}
          </div>

          <div>
            <label
              htmlFor="industry"
              className="text-sm">
              Industry
            </label>
            {edit && (
              <select
                id="industry"
                name="industry"
                value={state.industry.value}
                onChange={handleChange}
                className="block w-full py-2">
                <option value="None">None</option>
                <option value="Tech">Tech</option>
                <option value="Consulting">Consulting</option>
                <option value="Accounting">Accounting</option>
                <option value="Finance">Finance</option>
                <option value="Advertising">Advertising</option>
                <option value="Marketing">Marketing</option>
                <option value="Logistics">Logistics</option>
                <option value="Banking">Banking</option>
              </select>
            )}
            {!edit && <p className="text-lg">{businesProfile.industry}</p>}
          </div>

          {edit && (
            <ButtonsAction
              disabled={!state.isFormValid}
              onCancel={handleCancel}
            />
          )}
        </form>
      </section>
    </>
  );
};

export default Profile;
