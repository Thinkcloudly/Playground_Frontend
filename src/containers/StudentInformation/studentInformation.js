import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import StudentInformationCard from "../../components/StudentInformationCard";
import "./student.css";
import Loader from "./../../components/loader";
import { useSearchParams } from "react-router-dom";
import UserProfile from "../../components/userProfile";

const StudentInformation = () => {
  const [columns, setColumns] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [payment, setPayment] = useState([]);
  const [courses, setCourses] = useState(null);
  const [studentName, setStudentName] = useState(null);
  const [searchParams] = useSearchParams();
  const studentEmail = searchParams.get("email");

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {
      const courses = [],
        paymentStatus = [];
      const result = await axios.get(
        `http://localhost:4000/student-data?spreadsheetId=1Z1YOITDrdFO9GsyCIKbo41tMwzM1rUOxJ9HuTJ-DRAE&range=In Progress&studentEmail=${studentEmail}`
      );
      const heading = result.data.slice(0, 1)[0].slice(3);

      setColumns(heading);
      const studentInfo = result.data.slice(1);
      setStudentName(studentInfo[0][0]);
      const data = studentInfo.map((info) => {
        courses.push(info[2]);
        paymentStatus.push(info[3].toLowerCase());
        return info.slice(3);
      });
      setTableData(data);
      setCourses(courses);
      setPayment(paymentStatus);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="user">
      <UserProfile
        payment={payment}
        name={studentName}
        email={studentEmail}
        heading={columns}
        courseData={tableData}
        courses={courses}
      />
    </div>
  );
};

export default StudentInformation;
