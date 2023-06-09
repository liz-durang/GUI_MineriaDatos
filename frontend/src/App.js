import React from "react";
import { HashRouter, Route, Routes } from 'react-router-dom';

import { HomePage } from "./pages/HomePage";
import { EdaPage } from "./pages/EdaPage";
import { PcaPage } from "./pages/PcaPage";
import { ArbolesPage } from "./pages/ArbolesPage/";
import { Menu } from "./Components/Menu";
import { Footer } from "./Components/Footer";
import { NavbarOff } from "./Components/NavbarOff";
import { ForestPage } from "./pages/ForestPage";
import { ClusterPage } from "./pages/ClusterPage";

import './App.css';


function App() {

  return (
    <div className="project">
      <NavbarOff/>

      <HashRouter>
        <div className="content">
          <Menu/>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/eda" element={<EdaPage/>}/>
            <Route path="/pca" element={<PcaPage/>}/>
            <Route path="/arboles" element={<ArbolesPage/>}/>
            <Route path="/bosques" element={<ForestPage/>}/>
            <Route path="/clusters" element={<ClusterPage/>}/>
            <Route path="*" element={<p>404 Not Found </p>}/>
            
          </Routes>
        </div>
          
      </HashRouter>

      <Footer/>
    </div>
  );
}

export default App;
