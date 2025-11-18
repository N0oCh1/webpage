import useApi from "../hook/useApi";
import Fallback from "./Fallback";
import CampoEditable from "./CampoEditable";
import { FaPowerOff } from "react-icons/fa";
import { MdPowerOff } from "react-icons/md";

interface EnchufeCartaProps {
  codigo: string;
}

const EnchufeCarta = ({ codigo }: EnchufeCartaProps) => {
  if (!codigo) return null;
  const { data, isLoading, error, botonEncenderApagar } = useApi(codigo);
	
  return (
    <div className="flex flex-col w-full min-h-16 py-2 px-6 rounded-2xl  bg-[#bbbbbb4d] space-y-4">
      {isLoading ? (
        <Fallback />
      ) : error ? (
        <div className="flex flex-col justify-center items-center text-red-500">
          Error: {error instanceof Error ? error.message : "Error desconocido"}
        </div>
      ) : (
        <div className="flex flex-row">
          <button
            className={
							`${data?.contenido.estado ? "bg-red-400 hover:bg-red-500" : "bg-green-400 hover:bg-green-500"} 
							cursor-pointer text-white font-bold py-2 px-4 rounded w-40 text-center flex justify-center items-center mr-6`
						}
            onClick={botonEncenderApagar}
          >
						{data?.contenido.estado ? <MdPowerOff size={50} /> : <FaPowerOff size={50} />}
            
          </button>
          <div className="flex flex-col justify-center w-full">
						<CampoEditable nombreEnchufe={data?.contenido.nombre||" "} code={codigo} />
            
						<p>Código: {data?.contenido.codigoAcceso}</p>
            <p>Estado: {data?.contenido.estado ? "Encendido" : "Apagado"}</p>
            <p>Tiempo en uso: 123 horas</p>
            <p>Consumo: {data?.contenido.voltaje}W</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnchufeCarta;
