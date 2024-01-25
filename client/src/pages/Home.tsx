import { Button } from "@/components/ui/button";
import logo from "/public/logo-main.svg";

import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="sm:h-[87vh] h-[80vh]">
      <div className="max-w-screen-xl mx-auto h-full">
        <div className="flex flex-col items-center justify-center h-full gap-4">
          <div className="flex items-center justify-center gap-6">
            <img
              src={logo}
              alt="livecode logo"
              className="md:h-44 sm:h-28 h-20"
            />
            <span className="md:text-5xl sm:text-3xl text-2xl font-mono font-bold">
              Livecode
            </span>
          </div>
          <p className="text-center sm:text-xl text-sm md:w-[60vw] w-[80vw] font-poppins">
            Welcome to LiveCode, the groundbreaking platform that enables
            collaborative coding in real-time, transcending geographical
            barriers for seamless, instantaneous collaboration among coders
            worldwide.
          </p>

          <Button
            onClick={(e) => {
              e.preventDefault();
              navigate("/collaborate");
            }}
          >
            Collaborate
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Home;
