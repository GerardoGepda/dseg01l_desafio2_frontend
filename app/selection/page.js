'use client'

import { useEffect, useState } from "react";

export default function Selection() {
    useEffect(() => {

    }, []);

    return (
        <div className="py-4 px-5 mx-5">
            <h1>Reportes</h1>
            <hr />
            <div>
                <div className="card text-center">
                    <div className="card-header">
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Usuarios registrados</h5>
                                        <p className="card-text">Listado de usuarios registrados en el sistema.</p>
                                        <a href="http://desktop-t1sn72l/Reports/report/UsuariosRegistrados" target="_blank" className="btn btn-primary">Ver Reporte</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Hojas de vida de candidatos</h5>
                                        <p className="card-text">Resumen de hojas de vida de los candidatos registrados.</p>
                                        <a href="http://desktop-t1sn72l/Reports/report/HojasdeVida" target="_blank" className="btn btn-primary">Ver Reporte</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer text-body-secondary">
                    </div>
                </div>
            </div>
        </div>
    );
}
