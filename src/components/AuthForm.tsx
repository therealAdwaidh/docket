"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";


export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isRegister) {
       const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ email, password }),
         headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
      alert("Registration failed");
      return;
    }

    }

    const result = await signIn("credentials", {
    redirect: false,
    email,
    password,
  });

    
   if (result?.ok) {
    window.location.href = "/"; // force redirect to home
  } else {
    alert("Login failed");
  }
  }

  return (
    <div className="auth-container">
      <h2 className="auth-heading">{isRegister ? "Register" : "Login"}</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          placeholder="Email"
          className="auth-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="auth-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="auth-button">
          {isRegister ? "Register" : "Login"}
        </button>
      </form>
      <p className="auth-toggle">
        {isRegister ? "Already have an account?" : "No account yet?"}{" "}
        <button className="auth-link" onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "Login" : "Register"}
        </button>
      </p>
    </div>
  );
}
