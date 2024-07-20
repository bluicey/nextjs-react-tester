"use client";

import React, { useState, useEffect } from 'react';

const rows = [
  [
    { key: 'Escape', label: 'Esc' },
    { key: 'F1', label: 'F1' },
    { key: 'F2', label: 'F2' },
    { key: 'F3', label: 'F3' },
    { key: 'F4', label: 'F4' },
    { key: 'F5', label: 'F5' },
    { key: 'F6', label: 'F6' },
    { key: 'F7', label: 'F7' },
    { key: 'F8', label: 'F8' },
    { key: 'F9', label: 'F9' },
    { key: 'F10', label: 'F10' },
    { key: 'F11', label: 'F11' },
    { key: 'F12', label: 'F12' },
  ],
  [
    { key: 'Backquote', label: '~' },
    { key: 'Digit1', label: '1' },
    { key: 'Digit2', label: '2' },
    { key: 'Digit3', label: '3' },
    { key: 'Digit4', label: '4' },
    { key: 'Digit5', label: '5' },
    { key: 'Digit6', label: '6' },
    { key: 'Digit7', label: '7' },
    { key: 'Digit8', label: '8' },
    { key: 'Digit9', label: '9' },
    { key: 'Digit0', label: '0' },
    { key: 'Minus', label: '-' },
    { key: 'Equal', label: '=' },
    { key: 'Backspace', label: 'Backspace' },
  ],
  [
    { key: 'Tab', label: 'Tab' },
    { key: 'KeyQ', label: 'Q' },
    { key: 'KeyW', label: 'W' },
    { key: 'KeyE', label: 'E' },
    { key: 'KeyR', label: 'R' },
    { key: 'KeyT', label: 'T' },
    { key: 'KeyY', label: 'Y' },
    { key: 'KeyU', label: 'U' },
    { key: 'KeyI', label: 'I' },
    { key: 'KeyO', label: 'O' },
    { key: 'KeyP', label: 'P' },
    { key: 'BracketLeft', label: '[' },
    { key: 'BracketRight', label: ']' },
    { key: 'Backslash', label: '\\' },
  ],
  [
    { key: 'CapsLock', label: 'Caps' },
    { key: 'KeyA', label: 'A' },
    { key: 'KeyS', label: 'S' },
    { key: 'KeyD', label: 'D' },
    { key: 'KeyF', label: 'F' },
    { key: 'KeyG', label: 'G' },
    { key: 'KeyH', label: 'H' },
    { key: 'KeyJ', label: 'J' },
    { key: 'KeyK', label: 'K' },
    { key: 'KeyL', label: 'L' },
    { key: 'Semicolon', label: ';' },
    { key: 'Quote', label: '\'' },
    { key: 'Enter', label: 'Enter' },
  ],
  [
    { key: 'ShiftLeft', label: 'Shift' },
    { key: 'KeyZ', label: 'Z' },
    { key: 'KeyX', label: 'X' },
    { key: 'KeyC', label: 'C' },
    { key: 'KeyV', label: 'V' },
    { key: 'KeyB', label: 'B' },
    { key: 'KeyN', label: 'N' },
    { key: 'KeyM', label: 'M' },
    { key: 'Comma', label: ',' },
    { key: 'Period', label: '.' },
    { key: 'Slash', label: '/' },
    { key: 'ShiftRight', label: 'Shift' },
  ],
  [
    { key: 'ControlLeft', label: 'Ctrl' },
    { key: 'AltLeft', label: 'Alt' },
    { key: 'Space', label: 'Space', className: 'flex-grow' },
    { key: 'AltRight', label: 'Alt' },
    { key: 'ControlRight', label: 'Ctrl' },
    { key: 'ArrowLeft', label: '◄' },
    { key: 'ArrowUp', label: '▲' },
    { key: 'ArrowDown', label: '▼' },
    { key: 'ArrowRight', label: '►' },
  ],
];

const ignKeys = [
  'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 
  'F11', 'F12', 'Enter', 'Tab', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 
  'ArrowRight', 'AltLeft', 'Space', 'AltRight'
];

const Keyboard: React.FC = () => {
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const keyElement = document.querySelector(`[data-key="${event.code}"]`);
      if (keyElement) {
        setActiveKeys((prev) => new Set(prev).add(event.code));
      }

      if (ignKeys.includes(event.key)) {
        event.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleClick = (code: string) => {
    setActiveKeys((prev) => {
      const newActiveKeys = new Set(prev);
      if (newActiveKeys.has(code)) {
        newActiveKeys.delete(code);
      } else {
        newActiveKeys.add(code);
      }
      return newActiveKeys;
    });
  };

  return (
    <div className="flex flex-col items-center mt-10 space-y-2">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex space-x-1">
          {row.map((key, keyIndex) => (
            <div
              key={keyIndex}
              data-key={key.key}
              onClick={() => handleClick(key.key)}
              className={`flex justify-center items-center w-12 h-12 m-1 border rounded cursor-pointer ${
                activeKeys.has(key.key) ? 'bg-blue-500' : ''
              } ${key.className ? key.className : ''}`}
            >
              {key.label}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
