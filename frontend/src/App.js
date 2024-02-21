import "./App.css";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Info from "./components/Info";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Signin />}></Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/details" element={<Info />}></Route>
        <Route path="/home" element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;
