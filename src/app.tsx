import { Outlet } from "react-router-dom";

import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "react-query";

export function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <Header></Header>
      <ToastContainer></ToastContainer>

      <QueryClientProvider client={queryClient}>
        <Outlet></Outlet>
      </QueryClientProvider>
    </>
  );
}
