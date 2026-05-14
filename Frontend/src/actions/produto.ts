import { fetchWithAuth } from "../lib/fetchWithAuth";

const API_URL = 'http://localhost:3000';

export async function getProdutoAPI(body: { id_produto: number }) {
  try {
    const response = await fetchWithAuth(`${API_URL}/produto/${body.id_produto}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    return { success: true, produto: data };
  } catch (error) {
    return { success: false, error: (error as Error).message || "Servidor indisponível no momento." };
  }
}

export async function getProdutosAPI(body: {
  page?: number;
  id_categoria?: string;
  id_marca?: string;
  destaque?: boolean;
  ativo?: boolean;
}) {
  try {
    const params = new URLSearchParams();
    if (body.page !== undefined) params.set('page', String(body.page));
    if (body.id_categoria !== undefined) params.set('id_categoria', body.id_categoria);
    if (body.id_marca !== undefined) params.set('id_marca', body.id_marca);
    if (body.destaque !== undefined) params.set('destaque', String(body.destaque));
    if (body.ativo !== undefined) params.set('ativo', String(body.ativo));
    
    const response = await fetchWithAuth(`${API_URL}/produto?${params}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    return {
      success: true,
      produtos: data.data,
      total: data.total,
      totalPages: data.totalPages,
    };
  } catch (error) {
    return { success: false, error: (error as Error).message || "Servidor indisponível no momento." };
  }
}

export async function createProdutoAPI(token: string, formData: FormData) {
  try {
    const body = {
      nome: formData.get('nome') as string,
      descricao: formData.get('descricao') as string,
      preco: Number(formData.get('preco')),
      estoque: Number(formData.get('estoque')),
      imagem: formData.get('imagem') as string,
      destaque: formData.get('destaque') === '1',
      ativo: formData.get('ativo') === '1',
      id_marca: Number(formData.get('id_marca')),
      id_categoria: Number(formData.get('id_categoria')),
    };

    const response = await fetchWithAuth(`${API_URL}/produto`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    return { success: true, produto: data };
  } catch (error) {
    return { success: false, error: (error as Error).message || "Servidor indisponível no momento." };
  }
}

export async function updateProdutoAPI(token: string, id_produto: number, formData: FormData) {
  try {
    const body = {
      nome: formData.get('nome') as string,
      descricao: formData.get('descricao') as string,
      preco: Number(formData.get('preco')),
      estoque: Number(formData.get('estoque')),
      imagem: formData.get('imagem') as string,
      destaque: formData.get('destaque') === '1',
      ativo: formData.get('ativo') === '1',
      id_marca: Number(formData.get('id_marca')),
      id_categoria: Number(formData.get('id_categoria')),
    };

    const response = await fetchWithAuth(`${API_URL}/produto/${id_produto}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    return { success: true, produto: data };
  } catch (error) {
    return { success: false, error: (error as Error).message || "Servidor indisponível no momento." };
  }
}

export async function deleteProdutoAPI(token: string, id_produto: number) {
  try {
    const response = await fetchWithAuth(`${API_URL}/produto/${id_produto}`, {
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