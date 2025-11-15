import { useState } from "react";

export default function Dashboard() {

  const [switchState, setSwitch] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Bienvenido al Dashboard</h1>
      <p className="text-lg text-gray-700">Has accedido correctamente al área protegida de la aplicación.</p>
      <button onClick={() => setSwitch(!switchState)}
        className={`${switchState ? "bg-green-700" : "bg-red-700"} text-white px-4 py-2 rounded mt-6 ${switchState ? "hover:bg-green-600" : "hover:bg-red-600"} transition-colors`}
      >
        {switchState ? "Encendido" : "Apagado"}
      </button>
      <div
        className="flex flex-col gap-2 bg-gray-600 text-white p-4 rounded mt-6"
      >
        <span
          className="text-left"
        >
          Tiempo en uso: 2 horas
        </span>
        <span
          className="text-left"
        >
          Consumo: 150W
        </span>
      </div>
    </div>
  );
}