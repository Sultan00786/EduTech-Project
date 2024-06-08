import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setCourse } from "../../../../../slices/courseSlice";
import { updateSubSection } from "../../../../../services/operations/courseDetailsAPI";
import { RxCross1 } from "react-icons/rx";
import Iconbtn from "../../../../common/Iconbtn";
import { createSubSection } from "../../../../../services/operations/courseDetailsAPI";
import Upload from "./Upload";

function SubSecion({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (view || edit) {
      setValue("lectureTitle", modalData.title);
      setValue("lectureDesc", modalData.description);
      setValue("lectureVideo", modalData.videoUrl);
    }
  }, []);

  const handleEditSubSection = async () => {
    const currentValues = getValues();
    const formData = new FormData();

    formData.append("sectionId", modalData.sectionId);
    formData.append("subSectionId", modalData._id);
    formData.append("courseId", course._id);

    if (currentValues.lectureDesc !== modalData.description)
      formData.append("description", currentValues.lectureDesc);

    if (currentValues.lectureTitle !== modalData.title)
      formData.append("title", currentValues.lectureTitle);

    if (currentValues.lectureVideo !== modalData.videoUrl)
      formData.append("video", currentValues.lectureVideo);

    setLoading(true);
    const result = await updateSubSection(formData, token);
    if (result) dispatch(setCourse(result));
    setModalData(null);
    setLoading(false);
  };

  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.description ||
      currentValues.lectureVideo !== modalData.videoUrl
    ) {
      return true;
    } else {
      return false;
    }
  };

  const onSubmit = async (data) => {
    if (view) return;

    if (edit) {
      // edit kardo
      if (!isFormUpdated) toast.error("No change made to the form !!!");
      else handleEditSubSection();
      return;
    }

    // subsection create kardo
    const formData = new FormData();
    formData.append("sectionId", modalData);
    formData.append("title", data.lectureTitle);
    formData.append("description", data.lectureDesc);
    formData.append("video", data.lectureVideo);
    formData.append("courseId", course._id);

    setLoading(true);
    const result = await createSubSection(formData, token);
    if (result) {
      // TODO
      dispatch(setCourse(result));
    }

    setModalData(null);
    setLoading(false);
  };

  const handlerPrevent = (event) => {
    // console.log("Helo");
    event.preventDefault();
  };

  return (
    <div className=" fixed inset-0 scroll-smooth place-items-center overflow-auto w-screen z-[200] bg-white bg-opacity-10 backdrop-blur-sm">
      <div className=" max-w-[700px] w-11/12 mx-auto rounded-lg border border-richblack-400 bg-richblack-800">
        <div className=" bg-richblack-700 flex items-center justify-between p-3">
          <p className=" text-richblue-5 font-bold text-2xl">
            {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
          </p>
          <button
            className=" text-richblue-5 font-bold"
            onClick={() => (!loading ? setModalData(null) : {})}
          >
            <RxCross1 />
          </button>
        </div>

        <form
          className=" p-14 flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label htmlFor="lectureVideo">
            <Upload
              id="lectureVideo"
              name="lectureVideo"
              label={"Lecture Video"}
              register={register}
              setValue={setValue}
              errors={errors}
              video={true}
              viewData={view ? modalData.videoUrl : null}
              editData={edit ? modalData.videoUrl : null}
            />
          </label>

          <div>
            <label htmlFor="lectureTitle" className="lable-style">
              Lecture Title
            </label>
            <input
              id="lectureTitle"
              name="lectureTitle"
              placeholder="Enter Lecture Title"
              {...register("lectureTitle", { required: true })}
              className=" w-full form-style"
            />
            {errors.lectureTitle && <span>Lecture Title is required</span>}
          </div>

          <div>
            <label htmlFor="lectureDesc" className="lable-style">
              Lecture Description
            </label>
            <textarea
              id="lectureDesc"
              name="lectureDesc"
              placeholder="Enter Lecture Description"
              {...register("lectureDesc", { required: true })}
              className=" w-full min-h-[130px] form-style"
            />
            {errors.lectureDesc && <span>Lecture Description is required</span>}
          </div>

          {!view && (
            <div>
              <Iconbtn
                text={loading ? "Loading..." : edit ? "Save Change" : "Save"}
                type="submit"
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default SubSecion;
