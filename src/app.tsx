import { Outlet } from "react-router-dom";

import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "react-query";
import Footer from "./components/Footer";

export function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <Header></Header>
      <ToastContainer limit={1}></ToastContainer>

      <QueryClientProvider client={queryClient}>
        <Outlet></Outlet>
        <Footer></Footer>
      </QueryClientProvider>
    </>
  );
}
