'use client'

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Created() {
    const searchParams = useSearchParams();

    useEffect(() => {
        console.log(searchParams);
        
    }, [searchParams]);

    return (
        <div className="py-4 px-5 mx-5">
            <h1>Registro completo</h1>
            <hr />
            <div>
                <div className="card text-center">
                    <div className="card-header">
                        Perfil Creado: {searchParams.get('user')}
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Correo Electrónico: {searchParams.get('email')}</h5>
                        <p className="card-text">Utilice el correo y su contraseña para iniciar sesión.</p>
                        <Link href="/auth/login" className="btn btn-primary">Iniciar Sesión</Link>
                    </div>
                    <div className="card-footer text-body-secondary">
                    </div>
                </div>
            </div>
        </div>
    );
}
