import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import Router from "@/routes/Router";

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Router />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
