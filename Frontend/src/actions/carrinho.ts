import { fetchWithAuth } from "../lib/fetchWithAuth";

const API_URL = 'http://localhost:3000';

export async function createCarrinhoAPI(token: string) {
  try {
    const response = await fetchWithAuth(`${API_URL}/carrinho`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message);

    return {
      success: true,
      id_carrinho: data.id_carrinho
    };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message || "Servidor indisponível no momento."
    };
  }
}

export async function getCarrinhoAPI(token: string) {
  try {
    const response = await fetchWithAuth(`${API_URL}/carrinho/me`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = response.status === 204 ? null : await response.json();

    if (!response.ok) throw new Error("Carrinho não encontrado");

    return {
      success: true,
      carrinho: data
    };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message || "Servidor indisponível no momento."
    };
  }
}

export async function createItemCarrinhoAPI(
  token: string,
  body: { id_carrinho: number; id_produto: number }
) {
  try {
    const response = await fetchWithAuth(`${API_URL}/itemcarrinho`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message);

    return {
      success: true,
      id_produto: data.id_produto,
      preco_unitario: data.preco_unitario
    };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message || "Servidor indisponível no momento."
    };
  }
}

export async function updateItemCarrinhoAPI(
  token: string,
  body: { id_item_carrinho: number; quantidade: number }
) {
  try {
    const response = await fetchWithAuth(`${API_URL}/itemcarrinho/${body.id_item_carrinho}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ quantidade: body.quantidade })
    });

    if (response.status === 204) return { success: true };

    const data = await response.json();

    if (!response.ok) throw new Error(data.message);

    return {
      success: true,
      id_produto: data.id_produto,
      preco_unitario: data.preco_unitario
    };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message || "Servidor indisponível no momento."
    };
  }
}

export async function deleteItemCarrinhoAPI(
  token: string,
  body: { id_item_carrinho: number }
) {
  try {
    const response = await fetchWithAuth(`${API_URL}/itemcarrinho/${body.id_item_carrinho}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });

    const data = response.status === 204 ? null : await response.json();

    if (!response.ok) throw new Error(data.message);

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message || "Servidor indisponível no momento."
    };
  }
}