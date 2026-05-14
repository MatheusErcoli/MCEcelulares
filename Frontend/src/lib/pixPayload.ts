function campo(id: string, valor: string) {
    const tamanho = valor.length.toString().padStart(2, '0');
    return `${id}${tamanho}${valor}`;
}

export function gerarPixPayload({
    chave,
    nome,
    cidade,
    valor,
    txid = '***',
}: {
    chave: string;
    nome: string;
    cidade: string;
    valor: number;
    txid?: string;
}) {
    const merchantAccount = campo('00', 'BR.GOV.BCB.PIX') + campo('01', chave);
    const valorStr = valor.toFixed(2);

    const payload =
        campo('00', '01') +
        campo('26', merchantAccount) +
        campo('52', '0000') +
        campo('53', '986') +
        campo('54', valorStr) +
        campo('58', 'BR') +
        campo('59', nome.slice(0, 25)) +
        campo('60', cidade.slice(0, 15)) +
        campo('62', campo('05', txid.slice(0, 25)));

    const payloadSemCRC = payload + '6304';
    let crc = 0xFFFF;
    for (const char of payloadSemCRC) {
        crc ^= char.charCodeAt(0) << 8;
        for (let i = 0; i < 8; i++) {
            crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
        }
    }
    const crcHex = (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');

    return payloadSemCRC + crcHex;
}