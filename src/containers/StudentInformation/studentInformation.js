import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import "./student.css";
import { useSearchParams } from "react-router-dom";
import UserProfile from "../../components/userProfile";
import { courseStatusTabs } from "../../components/userProfile/userUtils";

const StudentInformation = () => {
  const [searchParams] = useSearchParams();
  const [selectedTab, setSelectedTab] = useState(0);
  const [studentData, setStudentData] = useState({});
  const [showCourseDataLoader, setShowCourseDataLoader] = useState(false);
  const [showUi, setShowUi] = useState(false);

  const studentEmail = searchParams.get("email");

  useEffect(() => {
    fetchStudentData();
  }, [selectedTab]);

  const fetchStudentData = async () => {
    try {
      setShowCourseDataLoader(true);
      const courses = [],
      payment = [];
      const result = await axios.get(
        `${process.env.REACT_APP_GOOGLE_SHEET_BACKEND_URL}student-data?spreadsheetId=${process.env.REACT_APP_STUDENT_SHEET_ID}&range=${Object.values(courseStatusTabs)[selectedTab]}&studentEmail=${studentEmail}`
      );
      const heading = result.data.slice(0, 1)[0].slice(3);

      const studentInfo = result.data.slice(1);
      const courseData = studentInfo.map((info) => {
        courses.push(info[2]);
        payment.push(info[3].toLowerCase());
        return info.slice(3);
      });
      setStudentData({
        courseData,
        courses,
        payment,
        heading,
        name: studentInfo[0][0],
        email: studentEmail
      })
    } catch (e) {
      console.error(e);
    } finally {
      setShowCourseDataLoader(false);
      setShowUi(true);
    }
  };

  return (
    <div className="user">
      <UserProfile
        studentData={studentData}
        selectedTab={selectedTab}
        handleTabChange={(e, newValue) => setSelectedTab(newValue)}
        showCourseDataLoader={showCourseDataLoader}
        showUi={showUi}
      />
    </div>
  );
};

export default StudentInformation;
