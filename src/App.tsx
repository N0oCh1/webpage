import { useForm } from 'react-hook-form';
import './App.css'
import type { FormData } from './types';
import { formSchema } from './types';
import { zodResolver } from '@hookform/resolvers/zod';

function App() {
  const ACCESS_CODE = "ABCD";

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  }); 

  const onSubmit = (data: FormData) => {
    if(data.code === ACCESS_CODE){
      alert("Código correcto");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    } else {
      alert("Código incorrecto");
    }
  };

  return (
    <div className='justify-center items-center flex'>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="code">
            Código de acceso
          </label>
           <input
            {...register('code')}
            className={`
            shadow 
            ${errors.code ? 'border-red-500' : ''}
            appearance-none 
            border rounded 
            w-full py-2 px-3
          text-gray-700 leading-tight 
            focus:outline-none focus:shadow-outline
            `}
            id="code"
            type="text"
            placeholder="Ingrese el código de acceso"
          />
          {errors.code && <p className="text-red-500 text-xs italic">{errors.code.message}</p>}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  )
}

export default App


