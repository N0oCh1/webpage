import type { EnchufeData } from "../types";
import { useMutation, useQuery } from "@tanstack/react-query";

export default function useApi(codigo: string) {
  const apiUrl = import.meta.env.ApiUrl || 'http://anthonyr-001-site1.stempurl.com/Enchufe_Api/Enchufe';
  if (!codigo) {
    return { data: null, isLoading: false };
  }
  const { data, isLoading, error, refetch } = useQuery<EnchufeData>({
    queryKey: ['enchufe', codigo],
    queryFn: async () => {
      try {
        const response = await fetch(`${apiUrl}/obtener/${codigo}`, {
          method: 'GET',
        });
        if (!response.ok) {
          throw new Error('Enchufe no encontrado');
        }
        return response.json();
      }
      catch (error) {
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const EncendidoApagado = useMutation({
      mutationKey: ['updateEnchufe', codigo],
      mutationFn: async () => {
        try {
            await fetch(`${apiUrl}/updEstado`, {
            method: `PATCH`,
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              codigoAcceso: codigo,
              nombre: data?.contenido.nombre,
              voltaje: data?.contenido.voltaje ,
              estado: !data?.contenido.estado,
            }),
          });
        }
        catch (error) {
          throw error;
        }
      },
      onSuccess: () => {
        refetch();
      }
    });

  const CambiarNombre = useMutation({
      mutationKey: ['updateNombre', codigo],
      mutationFn: async (nuevoNombre: string) => {
        try {
            await fetch(`${apiUrl}/updNombre`, {
            method: `PATCH`,
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              codigoAcceso: codigo,
              nombre: nuevoNombre,
              voltaje: data?.contenido.voltaje ,
              estado: data?.contenido.estado,
            }),
          });
        }
        catch (error) {
          throw error;
        } 
      },
      onSuccess: () => {
        refetch();
      }
    })  

  const botonEncenderApagar = async () => {
    EncendidoApagado.mutate();
  }
  const cambiarNombre = async (nuevoNombre: string) => {
    CambiarNombre.mutate(nuevoNombre);
  }
  return { data, isLoading, error, botonEncenderApagar, cambiarNombre }
}