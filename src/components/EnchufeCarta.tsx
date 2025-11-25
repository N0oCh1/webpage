import useApi from "../hook/useApi";
import Fallback from "./Fallback";
import CampoEditable from "./CampoEditable";
import { FaPowerOff } from "react-icons/fa";
import { MdPowerOff } from "react-icons/md";
import BotonBorrar from "./BotonBorrar";
import useMQTT from "../hook/useMQTT";

interface EnchufeCartaProps {
  codigo: string;
}

const EnchufeCarta = ({ codigo }: EnchufeCartaProps) => {
  if (!codigo) return null;
  //const { data, isLoading, error, botonEncenderApagar } = useApi(codigo);
  const { nombre, estado, watts, BotonSwitch, error, isLoading, codigoAcceso } = useMQTT(codigo);
  
  function BorrarEchufe () {
    const codes :string[] = JSON.parse(localStorage.getItem("code") || "[]");
    const nuevosCodes = codes.filter(c => c !== codigo);
    localStorage.setItem("code", JSON.stringify(nuevosCodes));
    window.location.reload();
  }

  return (
    <div className="flex flex-col w-full min-w-[25%] max-w-[50%]: min-h-16 py-6 px-6 rounded-2xl  bg-[#bbbbbb4d] space-y-4">
      {isLoading ? (
        <Fallback />
      ) : error ? (
        <div className="flex flex-col justify-center items-center text-red-500 relative">
          Error: {error instanceof Error ? error.message : "Error desconocido"}
          <BotonBorrar onClick={BorrarEchufe} />
        </div>
      ) : (
        <div className="flex flex-row relative">
          <button
            className={
							`${estado === "1" ? "bg-red-400 hover:bg-red-500" : "bg-green-400 hover:bg-green-500"} 
							cursor-pointer text-white font-bold py-2 px-4 rounded w-40 text-center flex justify-center items-center mr-6`
						}
            onClick={BotonSwitch}
          >
						{estado === "1" ? <MdPowerOff size={50} /> : <FaPowerOff size={50} />}
            
          </button>
          <div className="flex flex-col justify-center w-full">
						<CampoEditable nombreEnchufe={nombre} code={codigo} />
						<p>Código: {codigoAcceso}</p>
            <p>Estado: {estado === "1" ? "Encendido" : "Apagado"}</p>
            <p>Tiempo en uso: 123 horas</p>
            <p>Consumo: {watts}W</p>
          </div>
          <BotonBorrar onClick={BorrarEchufe} />
        </div>
      )}
    </div>
  );
};

export default EnchufeCarta;
