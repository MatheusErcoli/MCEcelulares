export function adicionarFiltroNumero(
    where: Record<string, number | boolean>,
    campo: string,
    valor?: string
) {
    if (valor && valor !== "undefined") {
        where[campo] = Number(valor);
    }
}