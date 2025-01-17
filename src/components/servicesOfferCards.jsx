import  { useState } from 'react';
import exampleImage from '../assets/images/educacion.jpeg';
import Mapa from './Mapa2';
import paseoImage from '../assets/images/paseo-2.jpeg';
import cuidadoImage from '../assets/images/cuidado.jpeg';
import peluqueriaImage from '../assets/images/peluqueria-2.jpeg';
import saludImage from '../assets/images/salud.jpeg';
import ejercicioImage from '../assets/images/ejercicio.jpeg';
import educacionImage from '../assets/images/educacion.jpeg';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
// Recuerden instalar react-calendar npm install react-calendar

// Array con las ofertas de servicio
const serviceOffer = [
  { id: '01', activity: 'Paseo de Perros', image: exampleImage, latitud: -24.7899123808212, longitud : -65.4110372508696, address: 'B1704 Ramos Mejía, Provincia de Buenos Aires', horario: '14:00 - 18:30', description: 'Paseo perros', price: '5000' },
  { id: '02', activity: 'Cuidado', image: exampleImage,latitud: -34.635659424226645, longitud : -58.36483140549988,  address: 'Brandsen 805, C1161AAQ Cdad. Autónoma de Buenos Aires', horario: '14:00 - 18:30', description: 'Cuidado', price: '5000' },
  { id: '03', activity: 'Ejercicio', image: exampleImage, latitud: -34.545235638998214, longitud : -58.44983282662615, address: 'San Lorenzo 141, A4400 Salta', horario: '14:00 - 18:30', description: 'Entrenamiento de perros', price: '5000' },
  { id: '04', activity: 'Peluqueria', image: exampleImage, latitud: -31.622089357278828, longitud : -60.69794053756765, address: 'calle falsa 789', horario: '14:00 - 18:30', description: 'Entrenamiento de perros', price: '5000' },
  { id: '05', activity: 'Salud', image: exampleImage, latitud: -32.2998376336151, longitud : -59.135887555123944, address: 'calle falsa 789', horario: '14:00 - 18:30', description: 'Entrenamiento de perros', price: '5000' },
  { id: '06', activity: 'Educación', image: exampleImage, latitud: -24.788480691782325, longitud : -65.40032253965407, address: 'calle falsa 789', horario: '14:00 - 18:30', description: 'Entrenamiento de perros', price: '5000' }
];

function Services({ onSelectService }) {
  const services = [
    { title: 'Paseo de Perros', image: paseoImage, description: 'Inserte descripción del servicio' },
    { title: 'Cuidado', image: cuidadoImage, description: 'Inserte descripción del servicio' },
    { title: 'Peluquería', image: peluqueriaImage, description: 'Inserte descripción del servicio' },
    { title: 'Salud', image: saludImage, description: 'Inserte descripción del servicio' },
    { title: 'Ejercicio', image: ejercicioImage, description: 'Inserte descripción del servicio' },
    { title: 'Educación', image: educacionImage, description: 'Inserte descripción del servicio' }
  ];

  return (
    <div className="p-4 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Busca el servicio que necesitas</h2>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="border bg-white p-6 cursor-pointer hover:text-main-blue transition duration-300 hover:border-main-blue rounded-lg shadow-md"
              onClick={() => onSelectService(service.title)} // Llama a la función de selección
            >
              <img src={service.image} alt={service.title} className='w-full h-48 object-contain mb-4' />
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ServiceOffer() {
  const [selectedService, setSelectedService] = useState(null);
  const [position, setPosition] = useState([-34.6037, -58.3816]); // Estado inicial del mapa (Buenos Aires)
  const [visibleCalendarId, setVisibleCalendarId] = useState(null); // Controla la visibilidad del calendario
  const [selectedDate, setSelectedDate] = useState(null);
  const [error, setError] = useState(null);

  const handleClickService = (latitud, longitud) => {
    setPosition([latitud, longitud]);
  };

  const handleSelectService = (serviceTitle) => {
    // Encuentra el servicio seleccionado basado en el título
    const selected = serviceOffer.find((service) => service.activity === serviceTitle);
    
    if (selected) {
      // Actualizamos posición usando latitud y longitud del servicio directamente
      setPosition([selected.latitud, selected.longitud]);
      setSelectedService(serviceTitle);
    }
  };
  
  const handleToggleCalendar = (id) => {
    setVisibleCalendarId(visibleCalendarId === id ? null : id);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleConfirmReservation = () => {
    alert(`Reserva confirmada para ${selectedDate.toLocaleDateString()}`);
    setVisibleCalendarId(null); // Ocultar el calendario después de confirmar
  };

  // Filtrar servicios según el servicio seleccionado
  const filteredServices = selectedService
    ? serviceOffer.filter((service) => service.activity === selectedService)
    : serviceOffer;

  return (
    <div>
      <Services onSelectService={handleSelectService} />
      
      <div className='flex flex-row p-4 w-full h-screen'>
          <div className='flex flex-col p-4 w-1/2 h-full overflow-y-auto gap-6'>
      {filteredServices.map((service, index) => (
        <div
          key={index}
          className='container mx-auto p-4 flex self-start flex-row border-4 rounded w-full h-74 cursor-pointer hover:border-light-blue transition duration-300'
          onClick={() => handleClickService(service.latitud, service.longitud)} // Cambia el mapa al hacer clic en la tarjeta
        >
          <div className='h-full w-2/6'>
            <img src={service.image} alt={service.activity} className="w-full h-full object-cover" />
          </div>

          <div className="md:w-4/6 p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{service.activity}</h2>
              <p className="text-gray-900 mb-4">{service.address}</p>
              <p className="text-gray-900 mb-4">Horarios: {service.horario}</p>
              <p className="text-xl font-semibold text-green-600 mb-4">ARS {service.price}</p>
              <p className="hidden">{service.latitud} {service.longitud}</p>
              {visibleCalendarId === service.id && (
                    <div className="calendar-container w-5/6 h-6/8 text-sm gap-4 p-2 border rounded-lg shadow-md bg-gray-100 transition-all duration-300 ">
                      <Calendar onChange={handleDateChange} value={selectedDate} className={'h-full w-full'} />
                      <button
                        onClick={handleConfirmReservation}
                        className=" w-full bg-primary text-white mt-4 py-2 rounded-lg hover:bg-secondary transition duration-300"
                      >
                        Confirmar Reserva
                      </button>
                    </div>
                  )}
            </div>
            <div className='flex flex-row justify-center'>
              <button onClick={() => handleToggleCalendar(service.id)} className='mt-12 mb-4 bg-main-blue px-2 py-1 border-2 rounded cursor-pointer border-gray-500 hover:bg-light-blue transition duration-300'>{visibleCalendarId === service.id ? "Cerrar" : "Reservar"}</button>
            </div>
          </div>
        </div>
      ))}
    </div>

        <div className='w-1/2 h-full p-8'>
          <Mapa position={position} /> {/* Pasar las coordenadas actualizadas al mapa */}
        </div>
      </div>
      {error && <p className="text-red-500 text-center">{error}</p>}
    </div>
  );
}

export default ServiceOffer;
