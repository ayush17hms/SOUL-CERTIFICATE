import "./App.css";
import Index2 from "./index2";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AfterLogin from "./AfterLogin";
import VerifyCertificate from "./VerifyCertificate";
import HomePage from "./HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/UserDetails" element={<AfterLogin />} />
        <Route path="/Verify" element={<VerifyCertificate />} />
        <Route path="/login" element={<Index2 />} />
                
      </Routes>
    </BrowserRouter>
  );
}

export default App;
