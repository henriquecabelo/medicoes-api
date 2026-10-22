// Função para calcular a temperatura
function calcularVelocidade(km) {
    if (typeof km !== 'number' || isNaN(km)) {
        throw new Error("O valor fornecido deve ser um número.");
    }

    const valor_convertido = km / 3.6;
    let classificacao = "";

    // Ajuste nos limites considerando a temperatura convertida (Fahrenheit) ou mude para 'C' se preferir avaliar em Celsius
    if (valor_convertido = km < 40 ) {
        classificacao = "Baixa Velocidade";
    } else if (valor_convertido >40 && valor_convertido < 90 ) {
        classificacao = "Velocidade Moderada";
    } else {
        classificacao = "Alta Velocidade";
    }

    return { valor_convertido, classificacao };
}

module.exports = calcularVelocidade;