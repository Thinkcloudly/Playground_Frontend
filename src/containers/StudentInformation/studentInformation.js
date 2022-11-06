import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import StudentInformationCard from "../../components/StudentInformationCard";
import './student.css';
import Loader from './../../components/loader';
import { useSearchParams } from 'react-router-dom';

const StudentInformation = () => {
  const [columns, setColumns] = useState([]);
  const [tableData, setTableData] = useState([]);
    const [searchParams] = useSearchParams();

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {
      const result = await axios.get(
        `http://localhost:4000/student-data?spreadsheetId=1Z1YOITDrdFO9GsyCIKbo41tMwzM1rUOxJ9HuTJ-DRAE&range=Sheet1&studentEmail=${searchParams.get('email')}`
      );
      setColumns(result.data.slice(0, 1)[0]);
      setTableData(result.data.slice(1));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex">
      {tableData?.length ? tableData.map((data) => (
        <StudentInformationCard heading={columns || []} info={data || []} />
      )) : <Loader showLoader={!tableData.length}  />}
    </div>
  );
};

export default StudentInformation;
