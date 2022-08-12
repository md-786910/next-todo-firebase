import React from "react";
import Image from "next/image";

function Navbar() {
  return (
    <>
      <nav className="navbar navbar-light bg-light border border-bottom-2">
        <span
          className="mx-3 navbar-brand mb-0 fs-2"
          style={{ cursor: "pointer" }}
        >
          Todo App
          <span className="mx-3">
            <Image
              src="/icon/todo.png"
              alt="logo"
              className="mt-3"
              width="40"
              height="40"
            />
          </span>
        </span>
      </nav>
    </>
  );
}

export default Navbar;
