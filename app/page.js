'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (user) {
      setUser(JSON.parse(user));
    } else {
      router.push('/auth/login');
    }
  }, []);

  return (
    <div className="py-4 px-5 mx-5">
      <h1>Perfil</h1>
      <hr />
      <div>
        <div className="card text-center">
          <div className="card-header">
          </div>
          <div className="card-body">
            <h5 className="card-title">{user?.nombre + ' ' + user?.apellidos}</h5>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <strong>Código: </strong> {user?.codigo}
              </li>
              <li className="list-group-item">
                <strong>Nombre: </strong> {user?.nombre}
              </li>
              <li className="list-group-item">
                <strong>Apellidos: </strong> {user?.apellidos}
              </li>
              <li className="list-group-item">
                <strong>Télefono: </strong> {user?.telefono}
              </li>
              <li className="list-group-item">
                <strong>Email: </strong> {user?.email}
              </li>
              <li className="list-group-item">
                <strong>Fecha de nacimiento: </strong> {user?.fechaNacimiento.split('T')[0]}
              </li>
            </ul>
          </div>
          <div className="card-footer text-body-secondary">
          </div>
        </div>
      </div>
    </div>
  );
}
