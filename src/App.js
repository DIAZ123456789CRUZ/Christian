//import {Ejemplo01} from './components/ejemplos'
import { BrowserRouter } from "react-router-dom";
import { Rutas } from "./routes";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Rutas/>
    </BrowserRouter>
  );
}

export default App; 