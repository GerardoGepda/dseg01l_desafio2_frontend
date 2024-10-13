'use client'

import { useRouter } from "next/navigation";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


export default function RootLayout({ children }) {
    const router = useRouter();

  const handleLogout = (e) => {
    e.preventDefault();
    router.push('/auth/login');
  }

  return (
    <html lang='es'>
      <body>
        <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">DSE Desafio 3</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              </ul>
              <form className="d-flex" role="search">
                <button onClick={handleLogout} className="btn btn-outline-light">Cerrar Sesión</button>
              </form>
            </div>
          </div>
        </nav>
        <div className="container">
          {children}
        </div>
      </body>
    </html>
  );
}
