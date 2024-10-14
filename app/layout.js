'use client'

import { usePathname } from "next/navigation";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function RootLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState(null);

  if (pathname.includes('/auth') || pathname.includes('/selection')) {
    return children;
  }

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('user');
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
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" href="/">Perfil</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/cv">Hoja de vida</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/createcv">Modificar hoja de vida</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" target="_blank" href={`http://desktop-t1sn72l/Reports/report/HojadeVida?CandidatoId=${user.id || '0'}`}>
                    <i className="bi bi-file-earmark-text-fill"></i>
                    <span className="mx-1">Reporte de hoja de vida</span>
                  </Link>
                </li>
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
