import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  AlertColor,
  AlertPropsColorOverrides,
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useLoginMutation } from "../../features/users/usersApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";
import SnackbarComponent from "../Snackbar/SnackbarComponent";
import { OverridableStringUnion } from "@mui/types";
import { UserLogin } from "../../features/types/Types";

const Login = () => {
  const [loginUser] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [severity, setSeverity] =
    useState<OverridableStringUnion<AlertColor, AlertPropsColorOverrides>>(
      "success"
    );

  const [userLogin, setUserLogin] = useState<UserLogin>({
    username: "",
    password: "",
  });
  const [snackMessage, setSnackMessage] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  const handleOpen = () => {
    setOpenSnackbar(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  const handleChangeInputLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
  };

  const handleSubmitLogin = async () => {
    try {
      const res = await loginUser(userLogin).unwrap();
      dispatch(setCredentials(res));
      navigate("/homepage", { replace: true });
      handleOpen();
      setSeverity("success");
      setSnackMessage("Successfully login!");
    } catch (error) {
      setSnackMessage("Error: " + error.data.message);
      setSeverity("error");
      handleOpen();
    }
  };
  return (
    <div className="container-box container-login">
      <Box
        sx={{
          maxWidth: "100%",
        }}
      >
        <h2>LOG IN TO YOUR ACCOUNT</h2>
        <TextField
          fullWidth
          margin="normal"
          id="outlined-basic"
          label="Username"
          variant="outlined"
          value={userLogin.username}
          name="username"
          onChange={handleChangeInputLogin}
        />
        <FormControl
          sx={{ m: 0, width: "100%" }}
          margin="normal"
          variant="outlined"
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            value={userLogin.password}
            name="password"
            onChange={handleChangeInputLogin}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
      </Box>
      <Button variant="outlined" onClick={handleSubmitLogin}>
        Login
      </Button>
      <SnackbarComponent
        open={openSnackbar}
        handleClose={handleClose}
        snackbarMessage={snackMessage}
        severity={severity}
      />
    </div>
  );
};

export default Login;
