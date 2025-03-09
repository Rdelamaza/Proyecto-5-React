import React from "react";
import Weather from "./components/weather";
import ErrorBoundary from "./components/errorBoundary";

const App = () => {
  return (
    <ErrorBoundary>
    <div className="App">
      <Weather />
    </div>
    </ErrorBoundary>
  );
};

export default App;
