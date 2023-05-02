import './styles/App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Form from './screens/form.js';
import Results from './screens/results.js';
// import { AddBox, ArrowDownward } from "@material-ui/icons";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/results" element={<Results/>} />
      </Routes>
    </>
  );
}

export default App;