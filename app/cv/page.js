'use client'

import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
    const [user, setUser] = useState(null);
    const [cvs, setCvs] = useState([]);

    useEffect(() => {
        const user = sessionStorage.getItem('user');
        if (user) {
            setUser(JSON.parse(user));

            getCvsByCandidatoId(JSON.parse(user).id);
        }
    }, []);

    const getCvsByCandidatoId = async (id) => {
        try {
            const result = await axios.get(`http://localhost:5012/api/cvs/candidato/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('token')}`
                    }
                }
            );
            setCvs(result.data);
            console.log(result.data);

        } catch (error) {
            console.log(error);
        }
    }

    const filterCvMaxId = () => {
        if (cvs.length > 0) {
            return cvs.reduce((prev, current) => (prev.id > current.id) ? prev : current);
        }
        return null;
    }

    function convertToUTCMinus6(dateString) {
        // Parse the date string into a Date object
        const date = new Date(dateString);
    
        // Get the time in milliseconds since the Unix epoch
        const utcTime = date.getTime();
    
        // Calculate the offset in milliseconds for UTC-6
        const offset = 6 * 60 * 60 * 1000;
    
        // Adjust the time to UTC-6
        const utcMinus6Time = new Date(utcTime - offset);
    
        return utcMinus6Time.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        });
    }

    return (
        <div className="py-4 px-5 mx-5">
            <h1>Hojas de vida</h1>
            <hr />
            <div>
                <div className="card text-center">
                    <div className="card-header">
                    </div>
                    <div className="card-body">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <strong>Formación academica: </strong> {filterCvMaxId()?.formacionAcademica || 'NA'}
                            </li>
                            <li className="list-group-item">
                                <strong>Experiencia profesional: </strong> {filterCvMaxId()?.experienciaProfesional || 'NA'}
                            </li>
                            <li className="list-group-item">
                                <strong>Referencias personales: </strong> {filterCvMaxId()?.referenciasPersonales || 'NA'}
                            </li>
                            <li className="list-group-item">
                                <strong>Idiomas: </strong> {filterCvMaxId()?.idiomas || 'NA'}
                            </li>
                        </ul>
                    </div>
                    <div className="card-footer text-body-secondary">
                    </div>
                </div>
            </div>
            <h3 className="mt-5">Bitácora</h3>
            <hr />
            {cvs.length > 0 ? (
                <div className="accordion" id="accordionBitacora">
                    {cvs.map((cv) => (
                        <div key={cv.id} className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${cv.id}`} aria-expanded="false" aria-controls={`collapse${cv.id}`}>
                                    {convertToUTCMinus6(cv.fechaCreacion)}
                                </button>
                            </h2>
                            <div id={`collapse${cv.id}`} className="accordion-collapse collapse" data-bs-parent="#accordionBitacora">
                                <div className="accordion-body">
                                    <ul>
                                        <li>
                                            <strong>Formación academica: </strong> {cv?.formacionAcademica || 'NA'}
                                        </li>
                                        <li>
                                            <strong>Experiencia profesional: </strong> {cv?.experienciaProfesional || 'NA'}
                                        </li>
                                        <li>
                                            <strong>Referencias personales: </strong> {cv?.referenciasPersonales || 'NA'}
                                        </li>
                                        <li>
                                            <strong>Idiomas: </strong> {cv?.idiomas || 'NA'}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="alert alert-warning" role="alert">
                    No hay bitácora
                </div>
            )}
        </div>
    );
}
