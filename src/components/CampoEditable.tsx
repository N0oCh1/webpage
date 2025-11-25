import { useState } from "react";
//import useApi from "../hook/useApi";
import { Controller, useForm } from "react-hook-form";
import { AiFillEdit } from "react-icons/ai";
import { IoIosSave } from "react-icons/io";
import useMQTT from "../hook/useMQTT";

interface CampoEditableProps {
  nombreEnchufe: string;
  code: string;
}

const CampoEditable = ({ nombreEnchufe, code }: CampoEditableProps) => {  
  const [editar, setEditar] = useState<boolean>(false);
  //const { cambiarNombre } = useApi(code)
  const { CambiarNombre } = useMQTT(code);

  const {handleSubmit, control} = useForm()

  function handleGuardar(data: any) {
   CambiarNombre(data.nombreEnchufe);
    setEditar(false);
  }
  return(
      editar ? (
        <form onSubmit={handleSubmit(handleGuardar)} 
        className="flex flex-row justify-center items-center gap-2"
        >
          <Controller
            name="nombreEnchufe"
            control={control}
            defaultValue={nombreEnchufe}
            render={({ field })=>(
              <input {...field}  className="text-2xl font-bold text-center border border-white rounded-md bg-[#a1a1a1a4]"/>
            )}
          />
          <button
            className="cursor-pointer "
            type="submit"
            arial-label="Guardar nombre del enchufe"
          >
            <IoIosSave size={25} />
          </button>
        </form>
      ) : (
        <div className="flex flex-row justify-center items-center gap-2">
          <h2 className="text-2xl font-bold ">
            {nombreEnchufe}
          </h2>
          <button
            className="cursor-pointer text-2xl font-bold"
            onClick={() => setEditar(!editar)}
            aria-label="Editar nombre del enchufe"
          >
            <AiFillEdit size={25} />
          </button>
        </div>
      )
  )
}

export default CampoEditable;