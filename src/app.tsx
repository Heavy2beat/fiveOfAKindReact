import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

import Header from "./components/Header";
import { ToastContainer } from "react-toastify";

export function App() {
  return (
    <>
      <Header></Header>
      <ToastContainer></ToastContainer>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
}
