import { fetchWithAuth } from "../lib/fetchWithAuth";

const API_URL = 'http://localhost:3000';

export async function getUsuarioAPI(token: string) {
  try {
    const response = await fetchWithAuth(`${API_URL}/usuario/me`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return { success: true, usuario: data as UsuarioType };
  } catch (error) {
    return { success: false, usuario: null, error: (error as Error).message || "Servidor indisponível no momento." };
  }
}

export async function getUsuariosAPI(token: string, page: number) {
  try {
    const response = await fetchWithAuth(`${API_URL}/usuario?page=${page}`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return {
      success: true,
      usuarios: data.data as UsuarioType[],
      totalPages: data.totalPages as number,
      total: data.total as number,
    };
  } catch (error) {
    return { success: false, usuarios: [] as UsuarioType[], totalPages: 1, total: 0, error: (error as Error).message || "Servidor indisponível no momento." };
  }
}

export async function deleteUsuarioAPI(token: string) {
  try {
    const response = await fetchWithAuth(`${API_URL}/usuario/me`, {
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

export async function updateUsuarioAPI(token: string, formData: FormData) {
  try {
    const body = {
      nome: formData.get('nome') as string,
      telefone: formData.get('telefone') as string,
    };
    const response = await fetchWithAuth(`${API_URL}/usuario/me`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message || "Servidor indisponível no momento." };
  }
}