import React from 'react';
import '@/app/layout'
import Navbar from "@/componets/navbar/Navbar";
import DrawingCanvas from '@/componets/draw/DrawingCanvas';

const DigitizerPage: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-4">
        <h1 className="space-between text-2xl  font-bold">Draw here</h1>
        <DrawingCanvas />
      </div>
    </div>
  );
};

export default DigitizerPage;