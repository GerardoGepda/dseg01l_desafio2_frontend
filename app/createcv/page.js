'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
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

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        //append date
        formData.append('fechaCreacion', new Date().toISOString());
        formData.append('camposActualizados', 'NA');
        const data = Object.fromEntries(formData.entries());
    
        try {
          // requesto by axios to host: localhost:5012/api/login
          const result = await axios.post('http://localhost:5012/api/cvs', {...data, estado: true, candidatoId: user.id},
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            }
          );
          console.log(result);
          e.target.reset();
          
          router.push('/cv');
        } catch (error) {
          console.log(error);
        }
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
                        <form onSubmit={handleOnSubmit}>
                            <div className="row">
                                <div className="col-6">
                                    <div className="mb-3">
                                        <label htmlFor="academicaId" className="form-label">Formación academica:</label>
                                        <textarea name="formacionAcademica" minLength={10} className="form-control" id="academicaId" required defaultValue={filterCvMaxId()?.formacionAcademica || ""}/>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="mb-3">
                                        <label htmlFor="expProfId" className="form-label">Experiencia profesional:</label>
                                        <textarea name="experienciaProfesional" minLength={10} className="form-control" id="expProfId" required defaultValue={filterCvMaxId()?.experienciaProfesional || ""}/>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="mb-3">
                                        <label htmlFor="refPerId" className="form-label">Referencias personales:</label>
                                        <textarea name="referenciasPersonales" minLength={10} className="form-control" id="refPerId" required defaultValue={filterCvMaxId()?.referenciasPersonales || ""}/>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="mb-3">
                                        <label htmlFor="languagesId" className="form-label">Idiomas:</label>
                                        <textarea name="idiomas" minLength={5} className="form-control" id="languagesId" defaultValue={filterCvMaxId()?.idiomas || ""} />
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary">Guardar</button>
                        </form>
                    </div>
                    <div className="card-footer text-body-secondary">
                    </div>
                </div>
            </div>
        </div>
    );
}
