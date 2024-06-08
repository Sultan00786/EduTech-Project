import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdCancel } from "react-icons/md";

function ChipInput({
  label,
  placeholder,
  name,
  register,
  errors,
  tagList,
  setTagList,
}) {
  // console.log(tagList);
  const handlerPressKey = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      // console.log("Enter button press, the value is:", event.target.value);
      const tagvalue = event.target.value.trim();
      if (tagvalue === "") toast.error("Enter atleast one tag");
      else {
        const buffer = [...tagList, tagvalue];
        setTagList(buffer);
        event.target.value = "";
      }
    }
  };

  const handlerDeleteTag = (data) => {
    // console.log(data);
    const filterTag = tagList.filter((tag) => tag !== data);
    setTagList(filterTag);
  };

  return (
    <div>
      <div className="flex flex-col gap-1">
        <label htmlFor={name} className="lable-style">
          {label}
        </label>

        <div className=" max-w-[300px] ">
          {tagList.length > 0 && (
            <div className="flex gap-1 flex-wrap">
              {tagList.map((tag) => (
                <div className=" bg-yellow-400 text-richblack-5 px-2 text-md rounded-full flex gap-2 items-center">
                  <p> {tag} </p>
                  <div
                    className=" cursor-pointer"
                    onClick={() => handlerDeleteTag(tag)}
                  >
                    <MdCancel />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <input
          onKeyDown={handlerPressKey}
          className="form-style"
          name={name}
          id={name}
          placeholder={placeholder}
          {...register(name, { require: true })}
        />
        {errors.name && <span>Course Tag is required</span>}
      </div>
    </div>
  );
}

export default ChipInput;
