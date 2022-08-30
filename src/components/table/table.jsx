import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function BasicTable({ columns, rowData }) {
  const getTableColumns = () => {
    return (
      <TableRow style={{backgroundColor: '#dfdfdf'}}>
        {columns.map((columnData) => (
          <TableCell>{columnData}</TableCell>
        ))}
      </TableRow>
    );
  };

  const getTableRow = () => {
    return rowData.map((data) => {
      const arr = Object.values(data);
      return (
        <TableRow>
          {arr.map((val) => (
            <TableCell >{val}</TableCell>
          ))}
        </TableRow>
      );
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>{getTableColumns()}</TableHead>
        <TableBody>{getTableRow()}</TableBody>
      </Table>
    </TableContainer>
  );
}
