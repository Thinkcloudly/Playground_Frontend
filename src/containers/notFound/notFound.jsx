import { useNavigate } from "react-router-dom";
import { Button, Box } from "@mui/material";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >      <h1>404: Not Found</h1>
      <Button variant="contained" onClick={() => navigate("/")}>Dashboard</Button>
    </Box>
  );
};

export default NotFound;
