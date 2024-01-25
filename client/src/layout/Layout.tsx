import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import Router from "@/routes/Router";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>

      <Header />
      <main>
        <Router />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
