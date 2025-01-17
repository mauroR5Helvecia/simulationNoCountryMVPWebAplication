 import { BrowserRouter, Routes, Route } from "react-router-dom";
 import { AuthProvider } from "./provider/AuthProvider";
import Nav2 from "./components/Nav2";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SignIn from "./components/SignIn";
import Register from "./components/Register";
import VerifyCode from "./components/VerifyCode";
import AdminServicios from "./pages/AdminServicios";
import AuthPrestadorServicio from "./auth/AuthPrestadorServicio";
import AuthAdministrador from "./auth/AuthAdministrador";
import AuthUsuario from "./auth/AuthUsuario";
import AgregarServicio from "./pages/AgregarServicio";
import EditarServicio from "./pages/EditarServicio";
import AdminMascotas from "./pages/AdminMascotas";
import AgregarMascota from "./pages/AgregarMascota";
import MisTurnos from "./pages/MisTurnos";
import CargarTurno from "./components/CargarTurno";
import DosBotonesSeleccionPrestador from "./pages/DosBotonesSeleccionPrestador";
import SobreNosotros from "./pages/SobreNosotros";
import ContenedorServicios from "./pages/ContenedorServicios";
import MisReservasCliente from "./pages/MisReservasCliente";
import All10ServiciosRamdom from "./pages/All10ServiciosRamdom";
import Contacto from "./pages/Contacto";
import Error404 from "./pages/Error404";
import ServiceCategories from "./components/ServiceCategories";
import ServiciosPorUbicacion from "./pages/ServiciosPorUbicacion";
import AdministracionVistaPrincipal from "./pages/AdministracionVistaPrincipal";
import TusReservasPrestador from "./pages/TusReservasPrestador";

function App() {
  
  

  return (

    <>
        <BrowserRouter>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Nav2 />
          {/* Contenedor principal que ocupa el espacio restante */}
          <div className="flex-grow">
            <Routes>
              <Route path="/signin" element={<SignIn />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verify" element={<VerifyCode />} />
              <Route path="/sobreNosotros" element={<SobreNosotros />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/serviciosdisponibles" element={<ServiceCategories />} />
              <Route path="/" element={<Home />} />
              {/* Sección de administración Servicios */}
              <Route path="/agregar-servicio" element={<AuthPrestadorServicio><AgregarServicio /></AuthPrestadorServicio>} />
              <Route path="/admin-servicios" element={<AuthPrestadorServicio><AdminServicios /></AuthPrestadorServicio>} />
              <Route path="/editar-servicio/:idServicio" element={<AuthPrestadorServicio><EditarServicio /></AuthPrestadorServicio>} />
              <Route path="/seleccion-admin-turnos/:idServicio" element={<AuthPrestadorServicio><DosBotonesSeleccionPrestador /></AuthPrestadorServicio>} />
              <Route path="/cargar-turnos/:idServicio" element={<AuthPrestadorServicio><CargarTurno /></AuthPrestadorServicio>} />
              <Route path="/mis-turnos/:idServicio" element={<AuthPrestadorServicio><MisTurnos /></AuthPrestadorServicio>} />
              <Route path="/tus-reservas" element={<AuthPrestadorServicio><TusReservasPrestador/></AuthPrestadorServicio>} />

              
              {/* Traer servicios */}
              <Route path="/servicios/veterinaria" element={<ContenedorServicios titulo="Veterinaria" enumNombreServicio="VETERINARIA" />} />
              <Route path="/servicios/guarderias" element={<ContenedorServicios titulo="Guarderia de Mascotas" enumNombreServicio="CUIDADO_DE_MASCOTAS" />} />
              <Route path="/servicios/educacion" element={<ContenedorServicios titulo="Educación" enumNombreServicio="EDUCACION" />} />
              <Route path="/servicios/paseo_de_mascotas" element={<ContenedorServicios titulo="Paseo de Mascotas" enumNombreServicio="PASEO_DE_MASCOTAS" />} />
              <Route path="/servicios/peluqueria" element={<ContenedorServicios titulo="Peluqueria" enumNombreServicio="PELUQUERIA" />} />
              <Route path="/ramdom" element={<All10ServiciosRamdom />} />
              <Route path="/servicessearch" element={<ServiciosPorUbicacion/>} />
              {/* Usuario dueño mascotas */}
              <Route path="/admin-mascotas" element={<AuthUsuario><AdminMascotas /></AuthUsuario>} />
              <Route path="/agregar-mascota" element={<AuthUsuario><AgregarMascota /></AuthUsuario>} />
              <Route path="/misreservas-user" element={<AuthUsuario><MisReservasCliente /></AuthUsuario>} />
             
             {/* Administracion usuarios  */}

             
             <Route path="/admin-administrador" element={<AuthAdministrador><AdministracionVistaPrincipal /></AuthAdministrador>} />

              {/* Páginas no existentes */}
              <Route path="*" element={<Error404 />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
    
    </>

   
    
    
  );
};

export default App;
