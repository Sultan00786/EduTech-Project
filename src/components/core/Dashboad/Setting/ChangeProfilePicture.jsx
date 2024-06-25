import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineFileUpload } from "react-icons/md";
import { changeProfilePicture } from "../../../../services/operations/SettingsAPI";

function ChangeProfilePicture() {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const inputFile = useRef(null);
  const [imgFile, setImgFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);

  const clickHandler = () => {
    inputFile.current.click();
  };

  function changeHandler(e) {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      setImgFile(file);
      previewFile(file);
    }
  }

  function previewFile(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result); // it store source url of the file
    };
  }

  function handleFileUpload() {
    try {
      console.log("Uploading....");
      const formData = new FormData();
      console.log("formData: \n", imgFile);

      formData.append("displayPicture", imgFile); // append function take input as key-value paire
      dispatch(changeProfilePicture(token, formData));
    } catch (error) {
      console.log("ERROR MESSAGE in handleFileUpload - ", error.message);
    }
  }

  useEffect(() => {
    if (imgFile) previewFile(imgFile);
  }, [imgFile]);

  return (
    <div className="flex flex-row items gap-x-3 rounded-md border-[1px] border-richblack-700 bg-richblack-800 px-10 py-7 text-richblack-5">
      <img
        className="aspect-square w-[78px] rounded-full object-cover"
        src={previewSource ? previewSource : user?.image}
      />

      <div className=" flex flex-col text-richblack-5 font-semibold gap-3">
        <h3>Change Profile Picture</h3>

        <div className=" flex items-center gap-x-4 text-[16px]">
          <input
            type="file"
            ref={inputFile}
            className=" hidden"
            onChange={changeHandler}
            accept="image/png, image/gif, image/jpeg"
          />

          <div
            className=" bg-richblack-700 text-[16px] text-richblack-200 font-semibold px-3 py-1 rounded-md "
            onClick={clickHandler}
          >
            Select
          </div>

          <div
            onClick={handleFileUpload}
            className="flex gap-x-2 items-center bg-yellow-50 text-black text-[16px] font-semibold px-2 py-1 rounded-md"
          >
            <p>Upload</p>
            <MdOutlineFileUpload />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangeProfilePicture;
