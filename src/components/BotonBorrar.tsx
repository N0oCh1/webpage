import { MdOutlineCancel } from "react-icons/md";

interface BotonBorrarProps {
  onClick?: () => void;
}

const BotonBorrar = ({ onClick }: BotonBorrarProps) => {
  return (
    <button onClick={onClick} className="absolute top-2 right-2 cursor-pointer hover:text-amber-50">
      <MdOutlineCancel size = {20}/>
    </button>
  );
};

export default BotonBorrar;
