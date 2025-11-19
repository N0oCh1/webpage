import AgregarEnchufe from "../../components/AgregarEnchufe";
import EnchufeCarta from "../../components/EnchufeCarta";

export default function Dashboard() {
  const code :string[] = JSON.parse(localStorage.getItem("code") || "[]");
  
  return (
    <div className=" bg-linear-to-bl from-indigo-800 via-purple-800 to-pink-800 w-full h-screen flex justify-center items-center">
      <div 
        className="flex flex-col gap-2 justify-center items-center"
      >
        {code.length === 0 && (
          <p className="text-white text-2xl mb-4">No hay enchufes agregados. ¡Agrega uno para comenzar!</p>
        )}
        {code.map((codigo)=>(<EnchufeCarta key={codigo} codigo={codigo} />))}
        <AgregarEnchufe />
      </div>

    </div>
  );
}