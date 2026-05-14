import { fetchWithAuth } from "../lib/fetchWithAuth";

const API_URL = 'http://localhost:3000';

export async function getCategoriasAPI(body?: { ativo?: boolean }) {
  try {
    const params = new URLSearchParams();
    if (body?.ativo !== undefined) params.set('ativo', String(body.ativo));

    const response = await fetchWithAuth(`${API_URL}/categoria?${params}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    return { success: true, categorias: data };
  } catch (error) {
    return { success: false, error: (error as Error).message || "Servidor indisponível no momento." };
  }
}

export async function createCategoriaAPI(token: string, formData: FormData) {
  try {
    const body = {
      nome: formData.get('nome') as string,
      descricao: formData.get('descricao') as string,
      ativo: formData.get('ativo') === '1',
    };

    const response = await fetchWithAuth(`${API_URL}/categoria`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    return { success: true, categoria: data };
  } catch (error) {
    return { success: false, error: (error as Error).message || "Servidor indisponível no momento." };
  }
}

export async function updateCategoriaAPI(token: string, id_categoria: number, formData: FormData) {
  try {
    const body = {
      nome: formData.get('nome') as string,
      descricao: formData.get('descricao') as string,
      ativo: formData.get('ativo') === '1',
    };

    const response = await fetchWithAuth(`${API_URL}/categoria/${id_categoria}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    return { success: true, categoria: data };
  } catch (error) {
    return { success: false, error: (error as Error).message || "Servidor indisponível no momento." };
  }
}

export async function deleteCategoriaAPI(token: string, id_categoria: number) {
  try {
    const response = await fetchWithAuth(`${API_URL}/categoria/${id_categoria}`, {
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