import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link href="/" passHref legacyBehavior>
          <a className="btn btn-ghost text-xl">Hardware Tester</a>
        </Link>
        <Link href="/digitizer" passHref legacyBehavior>
          <a className="btn btn-ghost text-xl ml-4">Digitizer</a>
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <details>
              <summary className="cursor-pointer">Dropbox</summary>
              <ul className="p-2 bg-base-100 rounded-t-none">
                <li>
                  <Link href="#link1" passHref legacyBehavior>
                    <a>Link 1</a>
                  </Link>
                </li>
                <li>
                  <Link href="#link2" passHref legacyBehavior>
                    <a>Link 2</a>
                  </Link>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
