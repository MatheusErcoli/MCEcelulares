export function adicionarFiltroQueryNumero(
  where: Record<string, number>,
  campo: string,
  valor?: string
) {
  if (valor && valor !== "undefined") {
    where[campo] = Number(valor);
  }
}