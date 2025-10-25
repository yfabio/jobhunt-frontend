import { useState, useRef, useEffect } from "react";

import { FaPen, FaSignOutAlt } from "react-icons/fa";

import Profile from "../member/Profile";
import Jobs from "../member/Jobs";
import AccountSettings from "../member/AccountSettings";
import { useAuthCtx } from "../context/AuthContext";
import Modal from "../components/Modal";
import ImagePicker from "../components/ImagePicker";
import ButtonsAction from "../components/ButtonsAction";
import MessageError from "../components/MessageError";
import imageTypes from "../util/imageTypes";

const UserPage = () => {
  const [menu, setMenu] = useState([
    {
      label: "Profile",
      selected: true,
    },
    {
      label: "Jobs",
      selected: false,
    },
    {
      label: "Account Settings",
      selected: false,
    },
  ]);

  const [tooBigFileError, setTooBigFileError] = useState(false);
  const [image, setImage] = useState();

  const imagePickerRef = useRef();

  const MAX_FILE_SIZE_MB = 1;

  const handleImage = (e) => {
    if (e.target.files && e.target.files.length === 1) {
      const file = e.target.files[0];

      if (file && imageTypes.includes(file.type)) {
        const fileSizeMB = file.size / 1024 / 1024;
        if (fileSizeMB > MAX_FILE_SIZE_MB) {
          setTooBigFileError(true);
        } else {
          setImage(file);
        }
      }
    }
  };

  const handleImagePicker = (e) => {
    imagePickerRef.current.click();
  };

  const { logout } = useAuthCtx();

  const onMenuSelected = (label) => {
    setMenu((prev) =>
      prev.map((obj) => {
        if (obj.label === label) {
          obj.selected = true;
        } else {
          obj.selected = false;
        }
        return obj;
      })
    );
  };

  const selected = menu.find((item) => item.selected);

  const renderComponent = () => {
    switch (selected.label) {
      case "Profile":
        return <Profile />;
      case "Jobs":
        return <Jobs />;
      case "Account Settings":
        return <AccountSettings />;
      default:
        return <div>Please select a menu item</div>;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(image);
    setImage(null);
    setTooBigFileError(false);
  };

  return (
    <section className="container mx-auto">
      {image && (
        <Modal
          close={() => setImage(null)}
          title={"User Image"}>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4">
            <ImagePicker file={image} />
            <ButtonsAction
              disabled={!image}
              onCancel={() => setImage(null)}
            />
          </form>
        </Modal>
      )}
      <div className="flex flex-col md:flex-row gap-4">
        <aside className="md:h-screen w-80 p-2">
          <div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col items-center justify-center w-22 h-22 rounded-full relative shadow bg-white">
                <span className="text-4xl font-bold ">{"FY"}</span>
                <button
                  onClick={handleImagePicker}
                  className="flex items-center justify-center w-6 h-6 border rounded-full cursor-pointer absolute -bottom-1 right-1">
                  <FaPen size={10} />
                </button>
                <input
                  type="file"
                  name="image"
                  id="image"
                  className="hidden"
                  accept=".png,.jpg,.jpeg"
                  ref={imagePickerRef}
                  onChange={handleImage}
                />
              </div>
              <h2 className="font-semibold text-2xl">Fabio Yamashita</h2>
              <p className="font-light text-gray-500">
                Software Developer at Tata Consultancy Services Limited
              </p>
            </div>
            <div className="my-4 border-b-[1px] border-b-slate-600"></div>
            <ul className="flex flex-col gap-3">
              {menu.map((obj) => (
                <li
                  key={obj.label}
                  onClick={() => onMenuSelected(obj.label)}
                  className={`w-full font-semibold py-2 pl-1 text-slate-600 cursor-pointer 
                 border border-transparent border-l-4 transition-colors hover:text-slate-700  hover:border-l-slate-600
                  ${obj.selected ? "border-l-slate-600" : ""}`}>
                  {obj.label}
                </li>
              ))}
            </ul>
            <div className="my-4 border-b-[1px] border-b-slate-600"></div>
            <button
              onClick={logout}
              className="group flex items-center justify-between w-full cursor-pointer">
              <span className="font-semibold text-slate-600 underline-offset-2 group-hover:underline ">
                Sign Out
              </span>
              <FaSignOutAlt size={20} />
            </button>
          </div>
        </aside>
        <div className="rounded w-full">{renderComponent()}</div>
        {tooBigFileError && (
          <Modal
            close={() => setTooBigFileError(false)}
            title={"Image Error"}>
            <MessageError>File too big, only 1MB is accepted</MessageError>
          </Modal>
        )}
      </div>
    </section>
  );
};

export default UserPage;
