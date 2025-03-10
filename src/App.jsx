import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Weather from "./components/weather";
import ErrorBoundary from "./components/ErrorBoundary";

const App = () => {
  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/weather" element={<Weather />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
};

export default App;