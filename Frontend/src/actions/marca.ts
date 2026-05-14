import { fetchWithAuth } from "../lib/fetchWithAuth";

const API_URL = 'http://localhost:3000';

export async function getMarcasAPI(body: { id_categoria?: number; ativo?: boolean }) {
  try {
    const params = new URLSearchParams();
    if (body.id_categoria) params.set('id_categoria', String(body.id_categoria));
    if (body.ativo !== undefined) params.set('ativo', String(body.ativo));

    const response = await fetchWithAuth(`${API_URL}/marca?${params}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    return { success: true, marcas: data };
  } catch (error) {
    return { success: false, error: (error as Error).message || "Servidor indisponível no momento." };
  }
}

export async function createMarcaAPI(token: string, formData: FormData) {
  try {
    const body = {
      nome: formData.get('nome') as string,
      ativo: formData.get('ativo') === '1',
    };

    const response = await fetchWithAuth(`${API_URL}/marca`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    return { success: true, marca: data };
  } catch (error) {
    return { success: false, error: (error as Error).message || "Servidor indisponível no momento." };
  }
}

export async function updateMarcaAPI(token: string, id_marca: number, formData: FormData) {
  try {
    const body = {
      nome: formData.get('nome') as string,
      ativo: formData.get('ativo') === '1',
    };

    const response = await fetchWithAuth(`${API_URL}/marca/${id_marca}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    return { success: true, marca: data };
  } catch (error) {
    return { success: false, error: (error as Error).message || "Servidor indisponível no momento." };
  }
}

export async function deleteMarcaAPI(token: string, id_marca: number) {
  try {
    const response = await fetchWithAuth(`${API_URL}/marca/${id_marca}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    });

    const data = response.status === 204 ? null : await response.json();
    if (!response.ok) throw new Error(data?.message);

    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message || 'Servidor indisponível no momento.' };
  }
}