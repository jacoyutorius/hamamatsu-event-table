import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Register from "./Register";
import About from "./About";
// import Login from "./Login";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/`} element={<Home />} />
        <Route path={`/about/`} element={<About />} />
        <Route path={`/register/`} element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
