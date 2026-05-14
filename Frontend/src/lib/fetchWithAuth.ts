export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  let res: Response;

  try {
    res = await fetch(url, options);
  } catch (err) {
    if (err instanceof TypeError) {
      throw new Error('Servidor indisponível no momento. Tente novamente mais tarde.');
    }
    throw err;
  }

  if (res.status === 401) {
    window.dispatchEvent(new Event('auth:logout'));
  }

  return res;
}