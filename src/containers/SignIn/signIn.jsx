import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader";
import SnackBar from "../../components/SnackBar";
import { snackBarAlertLevels } from "../../configs/constants";
import AwsAmplifyCongnitoAuth from "../../utils/AwsAmplifyCognitoAuth";
const theme = createTheme();

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();

  const signIn = async () => {
    try {
      if (!email || !password) {
        setShowAlert(true);
        setShowLoader(false);
        return;
      }
      const amplifyAuth = new AwsAmplifyCongnitoAuth();
      await amplifyAuth.signInToCognito(email, password);
      navigate("/");
    } catch (e) {
      console.error("Error while signing in", e);
      setShowAlert(true);
    } finally {
      setShowLoader(false);
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowLoader(true);
    await signIn();
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
        <Loader
          showLoader={showLoader}
          message="Signing in..."
        />
      </Container>
      <SnackBar 
      show={showAlert}
      message="Invalid Email or Password"
      onClose={() => setShowAlert(false)}
      level={snackBarAlertLevels.error}
      />
    </ThemeProvider>
  );
}
