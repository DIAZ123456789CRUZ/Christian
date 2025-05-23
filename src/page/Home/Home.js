import React from "react";
import logo2 from './logo2.jpg'
export function Home() {
  return (
    <div className="home-intro text-center py-5">
      <h1 className="display-4 mb-4">Equipos profesionales para el mantenimiento de computo</h1>
      <p className="lead mb-4">
        En <strong>kitClic</strong> proveemos los mejores productos y herramientas 
        especializadas para el mantenimiento preventivo y correctivo de tus equipos 
        de cómputo. Garantizamos el máximo rendimiento y prolongamos la vida útil 
        de tus dispositivos.
      </p>
      <div className="features">
        <h2 className="h4 mb-3">¿Por qué elegirnos?</h2>
        <ul className="list-unstyled">
          <li className="mb-2">✅ Productos de limpieza profesionales para hardware</li>
          <li className="mb-2">✅ Kits de mantenimiento completo</li>
          <li className="mb-2">✅ Herramientas de precisión</li>
          <li className="mb-2">✅ Componentes de repuesto de calidad</li>
          <li className="mb-2">✅ Información técnica especializada</li>
         
        </ul>
        <img src={logo2} alt="holis" className="img"/> 
      </div>
    </div>
  );
}
