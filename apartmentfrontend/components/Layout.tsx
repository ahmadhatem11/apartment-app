// src/components/Layout.tsx
import React from "react";
import Image from "next/image";
import styles from "../styles/Layout.module.css";
import logo from "../public/nawy.svg";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <header className={styles.header}>
        <Image
          src={logo}
          alt="Company Logo"
          width={100}
          height={60}
          style={{ paddingLeft: "30px" }}
        />
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
