import React, { useEffect, useState } from "react";

function RequirementFied({
  label,
  name,
  register,
  errors,
  setValue,
  getValue,
}) {
  const [requirement, setRequirement] = useState("");
  const [requirementList, setRequirementList] = useState([]);

  const handleAddRequirement = () => {
    if (requirement) {
      setRequirementList([...requirementList, requirement]);
      // console.log(requirementList);
      setRequirement("");
    }
  };

  const handleRemoveRequirement = (index) => {
    const updatedRequirementList = [...requirementList];
    updatedRequirementList.splice(index, 1);
    setRequirementList(updatedRequirementList);
  };

  useEffect(() => {
    setValue(name, requirementList);
  }, [requirementList]);

  return (
    <>
      <div className="flex flex-col gap-1">
        <label className="lable-style" htmlFor={name}>
          {" "}
          {label} <sup>*</sup>{" "}
        </label>
        <input
          type="text"
          id={name}
          name={name}
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          className="form-style"
        />

        <div>
          <button
            type="button"
            onClick={handleAddRequirement}
            className=" font-semibold text-yellow-50"
          >
            Add
          </button>
        </div>

        {requirementList.length > 0 && (
          <ul>
            {requirementList.map((item, index) => (
              <li
                key={index}
                className=" flex items-center gap-1 text-richblack-5"
              >
                <span>{item}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveRequirement(index)}
                  className=" text-xs text-pure-greys-300"
                >
                  clear
                </button>
              </li>
            ))}
          </ul>
        )}
        {errors.name && <span>{label} is required</span>}
      </div>
    </>
  );
}

export default RequirementFied;
