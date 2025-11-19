import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import {  type FormData, formSchema } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";

const AgregarEnchufe = () => {
  const [agregar, setAgregar] = useState(false);
  const [_, setCode] = useState<string[]>(JSON.parse(localStorage.getItem("code") || "[]"));
  const {control, handleSubmit, formState:{errors}} = useForm<FormData>(
    {resolver: zodResolver(formSchema)}
  );
  function onSubmit(data: any) {
    console.log(data);
    setCode((prevCodes)=> {
      const newCodes = [...prevCodes, data.code];
      localStorage.setItem("code", JSON.stringify(newCodes));
      return newCodes;
    });
    setAgregar(false);
    window.location.reload();
  };

  return (
    <div className="flex flex-col w-full min-h-16 py-2 px-6 rounded-2xl  bg-[#bbbbbb4d] space-y-4">
      {agregar ? (
        <form className="flex flex-col w-full" onSubmit={handleSubmit(onSubmit)}>
          <Controller 
            control={control}
            name="code"
            render={({field})=>(
              <>
                <input 
                  {...field}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                  placeholder="Código de acceso"
                />
                {errors.code && <p className="text-red-500 text-xs italic">{errors.code.message}</p>}
              </>
            )}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
            type="submit"
          >
            Agregar Enchufe
          </button>
        </form>
      ) : (
        <div className="flex flex-row justify-center items-center w-full h-full cursor-pointer">
          <FaPlus size={50} onClick={()=>setAgregar(true)}/>
        </div>
      )}
    </div>
  );
};

export default AgregarEnchufe;
