import { fetchWithAuth } from "../lib/fetchWithAuth";

const API_URL = 'http://localhost:3000';

export async function createEnderecoAPI(token: string, formData: FormData) {
  try {
    const body = {
      endereco: formData.get('endereco') as string,
      numero: formData.get('numero') as string,
      complemento: formData.get('complemento') as string,
      bairro: formData.get('bairro') as string,
      cidade: formData.get('cidade') as string,
      estado: formData.get('estado') as string,
      cep: formData.get('cep') as string,
    };

    const response = await fetchWithAuth(`${API_URL}/endereco`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    return { success: true, endereco: data };
  } catch (error) {
    return { success: false, error: (error as Error).message || 'Servidor indisponível no momento.' };
  }
}

export async function getEnderecosAPI(token: string, body: { id_usuario: number }) {
  try {
    const response = await fetchWithAuth(
      `${API_URL}/endereco?id_usuario=${body.id_usuario}`,
      { headers: { 'Authorization': `Bearer ${token}` } }
    );

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    return { success: true, enderecos: data };
  } catch (error) {
    return { success: false, error: (error as Error).message || "Servidor indisponível no momento." };
  }
}

export async function deleteEnderecoAPI(token: string, body: { id_endereco: number }) {
  try {
    const response = await fetchWithAuth(`${API_URL}/endereco/${body.id_endereco}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    });

    const data = response.status === 204 ? null : await response.json();
    if (!response.ok) throw new Error(data.message);

    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message || "Servidor indisponível no momento." };
  }
}