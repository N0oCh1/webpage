import AgregarEnchufe from "../../components/AgregarEnchufe";
import EnchufeCarta from "../../components/EnchufeCarta";

export default function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-bl from-indigo-800 via-purple-800 to-pink-800">
      <h1 className="text-4xl font-bold mb-6 text-black">Bienvenido al Dashboard</h1>
      <p className="text-lg text-gray-700">Has accedido correctamente al área protegida de la aplicación.</p>
      <div 
        className="flex flex-col gap-2 w-full"
      >
        <EnchufeCarta codigo="2B09" />
        <EnchufeCarta codigo="31D1" />
        <EnchufeCarta codigo="C801" />
        <AgregarEnchufe />
      </div>

    </div>
  );
}