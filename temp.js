// Função para calcular a temperatura
function calcularTemp(C) {
    if (typeof C !== 'number' || isNaN(C)) {
        throw new Error("O valor fornecido deve ser um número.");
    }

    const temp = (C * 9 / 5) + 32;
    let classificacao = "";
    const valor_convertido = parseFloat(temp.toFixed(2));

    // Ajuste nos limites considerando a temperatura convertida (Fahrenheit) ou mude para 'C' se preferir avaliar em Celsius
    if (valor_convertido <= 50) {
        classificacao = "Frio";
    } else if (valor_convertido <= 77) {
        classificacao = "Agradável";
    } else {
        classificacao = "Quente";
    }

    return { valor_convertido, classificacao };
}

module.exports = calcularTemp;