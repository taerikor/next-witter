import React from "react";
import Link from "next/link";
import { NextPage } from "next";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: NextPage<AppLayoutProps> = ({ children }) => {
  return (
    <div>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/signin">
        <a>Sign In</a>
      </Link>
      <Link href="/signup">
        <a>Sign Up</a>
      </Link>
      <Link href="/profile">
        <a>Profile</a>
      </Link>
      {children}
    </div>
  );
};

export default AppLayout;
