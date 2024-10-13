'use client'

import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    try {
      // requesto by axios to host: localhost:5012/api/login
      const result = await axios.post('http://localhost:5012/api/auth/login', data);
      console.log(result);
      // guardando los datos en sessionStorage
      sessionStorage.setItem('user', JSON.stringify(result.data.candidato));
      sessionStorage.setItem('token', result.data.token);

      router.push(`/`);
    } catch (error) {
      console.log(error);
      alert("Error al iniciar sesión")
    }
  }

  return (
    <div className="py-4 px-5 mx-5">
      <h1>Login</h1>
      <hr/>
      <form onSubmit={handleOnSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Código de usuario</label>
          <input type="email" name="email" minLength={10} className="form-control" id="exampleInputEmail1"/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" name="contrasena" minLength={8} className="form-control" id="exampleInputPassword1" />
        </div>
        <div className="d-flex flex-row">
          <div className="flex-grow-1">
            <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
            <Link href="/auth/newaccount" className="btn btn-link">Registrarse</Link>
          </div>
            <Link href="/selection" className="btn btn-link">Ingreso de Personal de proceso de selección</Link>
        </div>
      </form>
    </div>
  );
}
