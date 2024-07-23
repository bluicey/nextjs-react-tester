"use client";

import React, { useState } from 'react';
import Keyboard from '@/componets/keyboard/Keyboard';
import WinKey from '@/componets/keyboard/WinKey';
import Applekey from '@/componets/keyboard/AppleKey';

function Tabs() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="container mx-auto mt-10">
      <div className="tabs">
        <button
          className={`tab tab-lifted ${activeTab === 0 ? 'tab-active' : ''}`}
          onClick={() => setActiveTab(0)}
        >
          Chrome 
        </button>
        <button
          className={`tab tab-lifted ${activeTab === 1 ? 'tab-active' : ''}`}
          onClick={() => setActiveTab(1)}
        >
          Window
        </button>
        <button
          className={`tab tab-lifted ${activeTab === 2 ? 'tab-active' : ''}`}
          onClick={() => setActiveTab(2)}
        >
          Apple
        </button>
      </div>
      <div className="p-4 mt-4 border-t">
        {activeTab === 0 && <Keyboard />}
        {activeTab === 1 && <WinKey />}
        {activeTab === 2 && <Applekey />}
      </div>
    </div>
  );
}

export default Tabs;
