'use client'

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function NewAccount() {
  const router = useRouter();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append('codigo', '00');
    const data = Object.fromEntries(formData.entries());

    if (data.contrasena !== data.contrasena2) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      // requesto by axios to host: localhost:5012/api/login
      const result = await axios.post('http://localhost:5012/api/candidatos', data);
      console.log(result);
      e.target.reset();
      
      router.push(`/auth/created?email=${result.data.email}&user=${result.data.nombre + ' ' + result.data.apellidos}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="py-4 px-5 mx-5">
      <h1>Registrarse</h1>
      <hr/>
      <form onSubmit={handleOnSubmit}>
        <div className="row">
            <div className="col-6">
                <div className="mb-3">
                    <label htmlFor="nameId" className="form-label">Nombre</label>
                    <input type="text" name="nombre" minLength={5} maxLength={50} className="form-control" id="nameId" required/>
                </div>
            </div>
            <div className="col-6">
                <div className="mb-3">
                    <label htmlFor="lastNameId" className="form-label">Apellidos</label>
                    <input type="text" name="apellidos" minLength={10} maxLength={200} className="form-control" id="lastNameId" required/>
                </div>
            </div>
            <div className="col-12">
                <div className="mb-3">
                    <label label htmlFor="emailId" className="form-label">Correo Electrónico</label>
                    <input type="email" name="email" className="form-control" id="emailId" required/>
                </div>
            </div>
            <div className="col-6">
                <div className="mb-3">
                    <label htmlFor="phoneId" className="form-label">Telefono</label>
                    <input type="tel" name="telefono" minLength={8} maxLength={8} pattern="^\d{8}$" className="form-control" id="phoneId" placeholder="00000000" required/>
                </div>
            </div>
            <div className="col-6">
                <div className="mb-3">
                    <label label htmlFor="fecNacId" className="form-label">Fecha de Nacimiento</label>
                    <input type="date" name="fechaNacimiento" className="form-control" id="fecNacId" required/>
                </div>
            </div>
            <div className="col-6">
                <div className="mb-3">
                    <label htmlFor="passwordId" className="form-label">Crear contraseña</label>
                    <input type="password" name="contrasena" minLength={8} className="form-control" id="passwordId" required/>
                </div>
            </div>
            <div className="col-6">
                <div className="mb-3">
                    <label htmlFor="passwordConfirmId" className="form-label">Confirmar contraseña</label>
                    <input type="password" name="contrasena2" minLength={8} className="form-control" id="passwordConfirmId" required/>
                </div>
            </div>
        </div>
        <button type="submit" className="btn btn-primary">Enviar</button>
        <Link href="/auth/login" className="btn btn-link">¿Ya tienes cuenta?, Inicia Sesión</Link>
      </form>
    </div>
  );
}
