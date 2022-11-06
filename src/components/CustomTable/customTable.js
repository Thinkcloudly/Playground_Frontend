import "./customTable.css";

const CustomTable = ({ columns, data }) => {
  return (
    <div className="table-container">
    <table className="custom-table">
      <thead className="heading">
        <tr className="table-item">
          {columns.map((value) => (
            <th  className="table-item">{value}</th>
          ))}
        </tr>
      </thead>
      <tbody className="t-body">
        {data.map((row) => (
          <tr  className="table-item">
            {row.map((value) => (
              <td  className="table-item" >{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default CustomTable;
