import type { VercelRequest,VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const apiUrl = process.env.VITE_ApiUrl || 'http://anthonyr-001-site1.stempurl.com/Enchufe_Api/Enchufe';
    const { id } = req.query;
    try {
        const response = await fetch(`${apiUrl}/obtener/${id}`, {
            method: 'GET',
        });
        if (!response.ok) {
            return res.status(404).json({ message: 'Enchufe no encontrado' });
        }
        const data = await response.json();
        return res.status(200).json(data);
    
    } catch (error) {
        return res.status(500).json({ message: 'Error del servidor' });
    }
}