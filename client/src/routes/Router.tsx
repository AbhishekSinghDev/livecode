import CreateRoom from "@/pages/CreateRoom";
import Editor from "@/pages/Editor";
import Home from "@/pages/Home";
import { Route, Routes } from "react-router-dom";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/collaborate" element={<CreateRoom />} />
      <Route path="/editor/:uniqueRoomId" element={<Editor />} />
    </Routes>
  );
};

export default Router;
