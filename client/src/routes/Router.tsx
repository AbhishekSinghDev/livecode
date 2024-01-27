import CreateRoom from "@/pages/CreateRoom";
import EditorPage from "@/pages/EditorPage";
import Home from "@/pages/Home";
import { Route, Routes } from "react-router-dom";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/collaborate" element={<CreateRoom />} />
      <Route path="/editor/:uniqueRoomId" element={<EditorPage />} />
    </Routes>
  );
};

export default Router;
