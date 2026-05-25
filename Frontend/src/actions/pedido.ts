import { fetchWithAuth } from "../lib/fetchWithAuth";

const API_URL = 'http://localhost:3000';

export async function createPedidoAPI(token: string, body: { id_endereco: number }) {
  try {
    const response = await fetchWithAuth(`${API_URL}/pedido`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    return { success: true, pedido: data as PedidoType };
  } catch (error) {
    return { success: false, error: (error as Error).message || "Servidor indisponível no momento." };
  }
}

export async function getPedidosAPI(
  token: string,
  params: { page: number; limit?: number; status?: string; id_usuario?: number } = { page: 1 }
) {
  try {
    const { page, limit = 20, status, id_usuario } = params;
    let url = `${API_URL}/pedido?page=${page}&limit=${limit}`;
    if (status) url += `&status=${status}`;
    if (id_usuario) url += `&id_usuario=${id_usuario}`;

    const response = await fetchWithAuth(url, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return {
      success: true,
      pedidos: data.data as PedidoType[],
      total: data.total as number,
      totalPages: data.totalPages as number,
    };
  } catch (error) {
    return { success: false, error: (error as Error).message || "Servidor indisponível no momento." };
  }
}

export async function getPedidoAPI(body: { id_pedido: number }, token: string) {
  try {
    const response = await fetchWithAuth(`${API_URL}/pedido/${body.id_pedido}`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    return { success: true, pedido: data as PedidoType };
  } catch (error) {
    return { success: false, error: (error as Error).message || "Servidor indisponível no momento." };
  }
}

export async function updatePedidoStatusAPI(token: string, id_pedido: number, status: string) {
  try {
    const response = await fetchWithAuth(`${API_URL}/pedido/${id_pedido}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ status }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message || "Servidor indisponível no momento." };
  }
}