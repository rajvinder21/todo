
import React  from "react";
import Home from "../Navigator/Home" ;
import About from "../Navigator/About";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
   <>
   <BrowserRouter>
     <Routes>
      <Route index element={<Home/>} />
      <Route path="/about" element={<About/>}/>
 </Routes>
 </BrowserRouter>
   </>
  );
}

export default App;
