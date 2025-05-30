"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
    
      onClick={() => signOut()}
      style={{
        position: "absolute",
        top: "1rem",
        right: "1rem",
        padding: "0.5rem 1rem",
        background: "#ef4444",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
      }}
    >
      Logout
    </button>
  );
}
