import CreateRoom from "@/pages/CreateRoom";
import Home from "@/pages/Home";
import { Route, Routes } from "react-router-dom";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/collaborate" element={<CreateRoom />} />
    </Routes>
  );
};

export default Router;
