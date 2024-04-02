import { useEffect, useState } from "react";
import "./App.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Homepage from "./screens/Homepage/Homepage";
import LoginAndRegister from "./screens/LoginAndRegister/LoginAndRegister";
import { useSelector } from "react-redux";
import { Auth } from "./features/types/Types";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state: Auth) => state.auth.userInfo);

  useEffect(() => {
    setIsLoading(false);
  }, [user]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginAndRegister />,
    },
    {
      path: "/homepage",
      element: isLoading ? null : user ? <Homepage /> : <Navigate to="/" />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
