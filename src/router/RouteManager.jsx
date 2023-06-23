import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, UserDashboard, ErrorPage } from "../pages";
import { DevTest } from "../pages/DevTest";
import { Dashboard } from "../components/Dashboard";
import { InitialDisplay, Orders } from "../components/Dashboard/DisplayArea";
import { Chat } from "../components/Chat";
import { EditProfile } from "../components/EditProfile";
import { UserMap } from "../components/UserMap";
// import { PostAmigo } from "../components/PostAmigo";
import { PostFilterByRole } from "../components/PostFilterByRole";

const CustomRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} errorElement={ErrorPage}></Route>
      <Route path="/dashboard/" element={<UserDashboard />}>
        <Route path="" element={<Dashboard />}>
          <Route path="main" element={<UserMap />}></Route>
          <Route path="heed" element={<PostFilterByRole />}></Route>
          <Route path="chat" element={<Chat />}></Route>
          {/* <Route path="map" element={<UserMap />}></Route> */}
          <Route path="profile" element={<EditProfile />}></Route>
        </Route>
      </Route>
      <Route path="/devtest/" element={<DevTest />}></Route>
    </Routes>
  </BrowserRouter>
);

export { CustomRouter };
