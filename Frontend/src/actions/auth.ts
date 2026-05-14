const API_URL = 'http://localhost:3000';

export async function loginAPI(formData: FormData) {
  try {
    const body = {
      email: formData.get('email') as string,
      senha: formData.get('senha') as string,
    };

    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    return {
      success: true,
      id_usuario: data.id_usuario as number,
      nome: data.nome,
      token: data.token as string,
      admin: data.admin as boolean,
    };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message || "Servidor indisponível no momento.",
    };
  }
}

export async function signupAPI(formData: FormData) {
  try {
    const body = {
      nome: formData.get('nome') as string,
      email: formData.get('email') as string,
      senha: formData.get('senha') as string,
      cpf: formData.get('cpf') as string,
      telefone: formData.get('telefone') as string,
    };

    const response = await fetch(`${API_URL}/usuario`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message || "Servidor indisponível no momento.",
    };
  }
}