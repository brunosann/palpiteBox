import React from "react";
import styles from "./style.module.css";
import Link from "next/link";

const Header = () => {
  return (
    <React.Fragment>
      <div className="bg-gray-200 p-4">
        <div className="container mx-auto">
          <h1 className="text-6xl text-center">PalpiteBox</h1>
        </div>
      </div>
      <div className="bg-gray-300 p-2 shadow-md">
        <nav className="container mx-auto text-center">
          <Link href="/">
            <a className="px-2 hover:underline">Home</a>
          </Link>
          <Link href="/sobre">
            <a className="px-2 hover:underline">Sobre</a>
          </Link>
          <Link href="/contato">
            <a className="px-2 hover:underline">Contato</a>
          </Link>
          <Link href="/pesquisa">
            <a className="px-2 hover:underline">Pesquisa</a>
          </Link>
        </nav>
      </div>
    </React.Fragment>
  );
};

export default Header;
