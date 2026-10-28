// Função para calcular a temperatura
function calcularVelocidade(kmh) {
    if (typeof kmh !== 'number' || isNaN(kmh)) {
        throw new Error("O valor fornecido deve ser um número.");
    }

    const velocidade = kmh / 3.6;
    let classificacao = "";
    const valor_convertido = parseFloat(velocidade.toFixed(2));

    // Ajuste nos limites considerando a temperatura convertida (Fahrenheit) ou mude para 'C' se preferir avaliar em Celsius
    if (valor_convertido < 40 ) {
        classificacao = "Baixa Velocidade";
    } else if (valor_convertido >40 && valor_convertido < 90 ) {
        classificacao = "Velocidade Moderada";
    } else {
        classificacao = "Alta Velocidade";
    }

    return { valor_convertido, classificacao };
}

module.exports = calcularVelocidade;