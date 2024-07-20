import React from 'react';

const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a href="/" className="btn btn-ghost text-xl">Hardware Tester</a>
        <a href="/digitizer" className="btn btn-ghost text-xl ml-4">Digitizer</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <details>
              <summary className="cursor-pointer">Dropbox</summary>
              <ul className="p-2 bg-base-100 rounded-t-none">
                <li><a href="#link1">Link 1</a></li>
                <li><a href="#link2">Link 2</a></li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
