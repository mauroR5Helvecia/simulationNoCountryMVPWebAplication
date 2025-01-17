import { useNavigate } from "react-router-dom";
import dogImage from "../assets/DogCatNight.png";
import servicesWork from "../assets/servicesWork.png";

const BannerLogIn = () => {
  const navigate = useNavigate();

  const handleNavigateToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="container flex justify-center space-x-2 mt-28">
      <div className="card bg-secondary shadow-md rounded-md flex lg:flex-row flex-col-reverse font-semibold">
        <div className="flex flex-col mt-7">
          <h2 className="text-white">¿Queres empezar a ser parte de nuestra comunidad?</h2>
          <button
            onClick={handleNavigateToRegister}
            className="bg-white text-secondary rounded-lg mt-4 px-4 py-2 text-sm hover:bg-secondary transition duration-300 ease-in-out hover:text-white hover:border-white border-2 hover:scale-105"
          >
            Agregar mascota
          </button>
        </div>
        <div className="lg:mt-4 ">
          <img src={dogImage} alt="dog"/>
        </div>
      </div>
      <div className="card bg-secondary shadow-md rounded-md flex lg:flex-row flex-col-reverse font-semibold p-4 mr-3">
        <div className="flex flex-col mt-7">
          <h2 className="text-white">¿Queres empezar a ser parte de nuestra comunidad?</h2>
          <button
            onClick={handleNavigateToRegister}
            className="bg-white text-secondary rounded-lg mt-4 px-4 py-2 text-sm hover:bg-secondary transition duration-300 ease-in-out hover:text-white hover:border-white border-2 hover:scale-105"
          >
            Agregar servicio
          </button>
        </div>
        <div className="mt-4">
          <img src={servicesWork} alt="working" />
        </div>
      </div>
    </div>
  );
};

export default BannerLogIn;

