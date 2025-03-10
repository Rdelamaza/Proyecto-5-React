// src/components/Home.js
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full mx-auto text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Bienvenido a la ClimApp
        </h1>
        <p className="text-lg text-gray-700 mb-6">
            
        </p>
        <Link
            to="/weather"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
            Ver Pronostico
        </Link>
        </div>
    </div>
);
};

export default Home;