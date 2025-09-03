import React from "react";
import { Link } from "react-router-dom";

export default function NavbarButton({ cn, path, label }) {
  // return <a className={cn} href={link}>{label}</a>
  return (
    <Link className="no-underline px-5 py-0.5 mr-4 bg-" to={path}>
      {label}
    </Link>
  );
}
