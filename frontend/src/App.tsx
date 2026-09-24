import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster richColors position="top-right"/>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<RegisterPage/>}/>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
