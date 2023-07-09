import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, ErrorPage, ProtectedRoutes } from "../pages";
import { DevTest } from "../pages/DevTest";
import { Dashboard } from "../components/Dashboard";
import { ChatApp } from "../components/ChatApp";
import { EditProfile } from "../components/EditProfile";
import { UserMap } from "../components/UserMap";
// import { PostAmigo } from "../components/PostAmigo";
import { PostFilterByRole } from "../components/PostFilterByRole";
import PaquerGoLogo from "../components/SignIn/PaquerGoLogo";

const CustomRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} errorElement={ErrorPage}></Route>
      <Route element={<ProtectedRoutes />}>
        <Route path="/dashboard/" element={<Dashboard />}>
          <Route path="" element={<PaquerGoLogo />}></Route>
          <Route path="main" element={<UserMap />}></Route>
          <Route path="heed" element={<PostFilterByRole />}></Route>
          <Route path="chat" element={<ChatApp />}></Route>
          <Route path="profile" element={<EditProfile />}></Route>
        </Route>
      </Route>
      <Route path="/devtest/" element={<DevTest />}></Route>
    </Routes>
  </BrowserRouter>
);

export { CustomRouter };
