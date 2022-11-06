import { Card, CardContent, Typography } from "@mui/material/";
import './studentInfo.css';

const StudentInformationCard = ({ heading, info }) => {
  return (
    <Card sx={{ minWidth: 275 }}  className="table-body">
      <CardContent>
        {heading.map((header, i) => (
          <div>
            <table>
                <tbody>
                    <tr className="t-row">
                        <th className="tdata thead">{header}</th>
                        <td  className="tdata">{info[i]}</td>
                    </tr>
                </tbody>
            </table>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default StudentInformationCard;
