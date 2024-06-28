import React from "react";
import { Link } from "react-router-dom";

export default function NavbarButton({ cn, path, label }) {
  // return <a className={cn} href={link}>{label}</a>
  return (
    <Link className={cn} to={path}>
      {label}
    </Link>
  );
}
