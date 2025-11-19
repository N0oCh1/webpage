import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const apiUrl = import.meta.env.ApiUrl || 'http://anthonyr-001-site1.stempurl.com/Enchufe_Api/Enchufe';
    const body = req.body;
    try {
        const response = await fetch(`${apiUrl}/updNombre`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                codigoAcceso: body.codigoAcceso,
                nombre: body.nombre,
                voltaje: body.voltaje,
                estado: body.estado,
            }),
        });
        if (!response.ok) {
            return res.status(400).json({ message: 'Error al actualizar el nombre' });
        }
        return res.status(200).json({ message: 'Nombre actualizado correctamente' });
    } catch (error) {
        return res.status(500).json({ message: 'Error del servidor' });
    }
}