import React from 'react';
import { Link } from 'react-router-dom';

export default function Menu() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="grid grid-cols-2 gap-4 w-2/3">
        <div className="h-[150px] bg-black flex items-center justify-center rounded-lg shadow-md">
          <Link to="/stock">
            <h1 className="text-white font-bold text-xl">Check Stocks</h1>
          </Link>
        </div>
        <div className="h-[150px] bg-gray-500 flex items-center justify-center rounded-lg shadow-md">
          <Link to="/add">
            <h1 className="text-white font-bold text-xl">Add Stocks</h1>
          </Link>
        </div>
      </div>
    </div>
  );
}
