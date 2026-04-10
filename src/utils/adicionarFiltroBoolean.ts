export function adicionarFiltroBoolean(
    where: Record<string, number | boolean>,
    campo: string,
    valor?: string
) {
    if (valor === "true") {
        where[campo] = true;
    }
}