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
import { useDispatch } from "react-redux";
import { useRegisterMutation } from "../../features/users/usersApiSlice";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../../features/authSlice";
import { OverridableStringUnion } from "@mui/types";
import SnackbarComponent from "../Snackbar/SnackbarComponent";

const Register = () => {
  interface UserRegister {
    username: string;
    password: string;
    repassword: string;
  }

  const dispatch = useDispatch();
  const [registerUser] = useRegisterMutation();
  const navigate = useNavigate();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [severity, setSeverity] =
    useState<OverridableStringUnion<AlertColor, AlertPropsColorOverrides>>(
      "success"
    );
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

  const [userRegister, setUserRegister] = useState<UserRegister>({
    username: "",
    password: "",
    repassword: "",
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent) => {
    event.preventDefault();
  };
  const handleChangeInputRegister = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUserRegister({ ...userRegister, [e.target.name]: e.target.value });
  };

  const handleSubmitRegister = async () => {
    if (userRegister.password === userRegister.repassword) {
      try {
        const res = await registerUser(userRegister).unwrap();
        dispatch(setCredentials(res));
        navigate("/homepage", { replace: true });
        handleOpen();
        setSeverity("success");
        setSnackMessage("User successfully created!");
      } catch (error) {
        setSnackMessage("Error: " + error.data.message);
        setSeverity("error");
        handleOpen();
      }
    } else {
      setSnackMessage("Passwords not match");
      setSeverity("error");
      handleOpen();
    }
  };

  return (
    <div className="container-box">
      <h2>REGISTER</h2>
      <Box
        sx={{
          maxWidth: "100%",
        }}
      >
        <TextField
          margin="normal"
          fullWidth
          id="outlined-basic"
          label="Username"
          variant="outlined"
          value={userRegister.username}
          name="username"
          onChange={handleChangeInputRegister}
        />
        <FormControl
          sx={{ m: 0, width: "100%" }}
          variant="outlined"
          margin="normal"
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            value={userRegister.password}
            name="password"
            onChange={handleChangeInputRegister}
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
        <FormControl
          sx={{ mt: 1, width: "100%" }}
          variant="outlined"
          margin="normal"
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Confirm Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            value={userRegister.repassword}
            name="repassword"
            onChange={handleChangeInputRegister}
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
      <Button variant="outlined" onClick={handleSubmitRegister}>
        Register
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

export default Register;
