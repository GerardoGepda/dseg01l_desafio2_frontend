'use client'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


export default function LoginLayout({ children }) {
  return (
    <html lang='es'>
      <body>
        <div className="container">
          {children}
        </div>
      </body>
    </html>
  );
}
