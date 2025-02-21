import React, { useState, useEffect } from "react";
import { useParams, useSelector } from "react-router-dom";
import { getEnrolledStudents } from "../../services/operations/courseDetailsAPI";

function EnrolledStudents() {
   const { courseId } = useParams();
   const { token } = useSelector((state) => state.auth);
   const [enrolledStudents, setEnrolledStudents] = useState(null);
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      const fetchEnrolledStudents = async () => {
         setLoading(true);
         try {
            const response = await getEnrolledStudents(courseId, token);
            if (response) {
               setEnrolledStudents(response.data);
            }
         } catch (error) {
            console.error("Error fetching enrolled students:", error);
         }
         setLoading(false);
      };
      fetchEnrolledStudents();
   }, [courseId, token]);

   // ... rest of the component remains same
}

export default EnrolledStudents;