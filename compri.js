// Função para calcular a temperatura
function calcularTemp(m) {
    if (typeof m !== 'number' || isNaN(m)) {
        throw new Error("O valor fornecido deve ser um número.");
    }

    const valor_convertido = m * 3.28084;
    let classificacao = "";

    // Ajuste nos limites considerando a temperatura convertida (Fahrenheit) ou mude para 'C' se preferir avaliar em Celsius
    if (valor_convertido < 5) {
        classificacao = "Curto";
    } else if (valor_convertido > 5 && valor_convertido < 50) {
        classificacao = "Médio";
    } else {
        classificacao = "Longo";
    }

    return { valor_convertido, classificacao };
}

module.exports = calcularTemp;