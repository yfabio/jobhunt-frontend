import { useEffect, useState } from "react";

const ImagePicker = ({ file }) => {
  const [image, setImage] = useState();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  return (
    <>
      <div className="flex flex-col items-center justify-center rounded gap-2">
        <img
          src={image}
          alt="image"
          className="max-w-lg bg-cover rounded bg-no-repeat bg-center"
        />
      </div>
    </>
  );
};

export default ImagePicker;
