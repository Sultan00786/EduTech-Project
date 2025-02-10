import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BiSolidDownArrow } from "react-icons/bi";
import { ImParagraphRight } from "react-icons/im";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxDropdownMenu } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import {
   deleteSection,
   deleteSubSection,
} from "../../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../slices/courseSlice";
import ConfirmationModal from "../../../../common/ConfirmationModal";
import Iconbtn from "../../../../common/Iconbtn";
import SubSection from "./SubSecion";

function NestedView({ handleChangeEditSectionName }) {
   const { course } = useSelector((state) => state.course);
   const { token } = useSelector((state) => state.auth);
   const dispatch = useDispatch();

   const [addSubsection, setAddSubSection] = useState(null);
   const [viewSubsection, setViewSubsection] = useState(null);
   const [editSubsection, setEditSubsection] = useState(null);
   const [confirmationModal, setConfirmationModal] = useState(null);

   async function hadleDeleteSection(sectionId) {
      const result = await deleteSection({
         sectionId,
         courseId: course._id,
         token,
      });
      if (result) dispatch(setCourse(result));
      setConfirmationModal(null);
   }

   async function hadleDeleteSubSection(subSectionId, sectionId, courseId) {
      const result = await deleteSubSection({
         courseId,
         subSectionId,
         sectionId,
         token,
      });
      // console.log("result .. ", result);
      if (result) dispatch(setCourse(result));
      setConfirmationModal(null);
   }

   const handleClickSubsec = (data) => {
      setAddSubSection(null);
      setEditSubsection(null);
      setViewSubsection(data);
   };

   return (
      <div>
         <div className=" mt-5 mb-5 rounded-lg bg-richblack-700 p-6 px-8">
            <div className="flex flex-col gap-3">
               {course?.courseContent?.map((section) => (
                  <details key={section._id} className="flex flex-col" open>
                     <summary className="flex gap-x-3 items-center justify-between border-b-2">
                        <div className="flex items-center gap-x-2">
                           <RxDropdownMenu />
                           <p> {section.sectionName} </p>
                        </div>

                        <div className=" flex items-center gap-2">
                           <button
                              onClick={() => {
                                 handleChangeEditSectionName(
                                    section._id,
                                    section.sectionName
                                 );
                              }}
                           >
                              <MdEdit />
                           </button>
                           <button
                              onClick={() => {
                                 setConfirmationModal({
                                    text1: "Delete this Section",
                                    text2: "All the lectures in this section will be deleted",
                                    btn1Text: "Delete",
                                    btn2Text: "Cancle",
                                    btn1Handler: () =>
                                       hadleDeleteSection(section._id),
                                    btn2Handler: () =>
                                       setConfirmationModal(null),
                                 });
                              }}
                           >
                              <RiDeleteBin6Line />
                           </button>
                           <span>|</span>
                           <BiSolidDownArrow className=" text-blue-50 cursor-pointer" />
                        </div>
                     </summary>
                     <div className=" text-white">
                        <div className="flex flex-col pl-5">
                           {section.subSection.map((data) => (
                              <div
                                 key={data?._id}
                                 onClick={() => handleClickSubsec(data)}
                                 className="flex items-center justify-between gap-x-3 pt-2 border-b-2 pr-[35px]"
                              >
                                 <div className="flex items-center gap-x-2">
                                    <div className=" text-[10px] ">
                                       <ImParagraphRight />
                                    </div>
                                    <p> {data?.title} </p>
                                 </div>

                                 <div
                                    onClick={(e) => e.stopPropagation()}
                                    className=" flex items-center gap-x-3"
                                 >
                                    <button
                                       onClick={() =>
                                          setEditSubsection({
                                             ...data,
                                             sectionId: section._id,
                                          })
                                       }
                                    >
                                       <MdEdit />
                                    </button>
                                    <button
                                       onClick={() => {
                                          setConfirmationModal({
                                             text1: "Delete this Section",
                                             text2: "All the lectures in this section will be deleted",
                                             btn1Text: "Delete",
                                             btn2Text: "Cancle",
                                             btn1Handler: () =>
                                                hadleDeleteSubSection(
                                                   data._id,
                                                   section._id,
                                                   course._id
                                                ),
                                             btn2Handler: () =>
                                                setConfirmationModal(null),
                                          });
                                       }}
                                    >
                                       <RiDeleteBin6Line />
                                    </button>
                                 </div>
                              </div>
                           ))}
                        </div>

                        <div className="pl-5 pt-2 flex justify-end pb-2">
                           {/* <button
                              onClick={() => setAddSubSection(section._id)}
                              className=" mt-4 flex items-center gap-x-2 text-yellow-50"
                           >
                              <AiOutlinePlus />
                              <p>Add Lecture</p>
                           </button> */}
                           <Iconbtn
                              type="Submit"
                              text={"Add"}
                              outline={true}
                              customClasses={
                                 "text-yellow-50 flex flex-row items-center gap-x-2"
                              }
                              onClick={() => setAddSubSection(section._id)}
                           ></Iconbtn>
                        </div>
                     </div>
                  </details>
               ))}
            </div>

            <div className=" relative">
               {addSubsection && (
                  <SubSection
                     modalData={addSubsection}
                     setModalData={setAddSubSection}
                     add={true}
                  />
               )}
               {viewSubsection && (
                  <SubSection
                     modalData={viewSubsection}
                     setModalData={setViewSubsection}
                     view={true}
                  />
               )}
               {editSubsection && (
                  <SubSection
                     modalData={editSubsection}
                     setModalData={setEditSubsection}
                     edit={true}
                  />
               )}
            </div>

            <div>
               {confirmationModal ? (
                  <ConfirmationModal modalData={confirmationModal} />
               ) : (
                  <div />
               )}
            </div>
         </div>
      </div>
   );
}

export default NestedView;
