import "./LoginAndRegister.scss";
import Register from "../../components/Register/Register";
import Login from "../../components/Login/Login";

const LoginAndRegister = () => {
  return (
    <div className="container-register-login">
      <Login />
      <Register />
    </div>
  );
};

export default LoginAndRegister;
