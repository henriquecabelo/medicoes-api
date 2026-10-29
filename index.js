const express = require('express');
const db = require('./db');
const app = express();
const calcularTemp = require('./temp.js');
const calcularVelocidade = require('./velocidade.js');
const calcularComprimento = require('./compri.js');
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('A API está operacional');
});

// Listar todas as medições
app.get('/medicao', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM medicoes');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro Interno do Servidor",
      detalhes: error.message
    });
  }
});

app.get('/medicao/alta-velocidade', async (req, res) => {
   
  try {
    const [rows] = await db.execute('SELECT * FROM medicoes WHERE classificacao = "Alta Velocidade"');
    if (rows.length === 0) {
      return res.status(404).json({
        mensagem: "Registro de velocidade não encontrada"
      });
    }
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro Interno do Servidor",
      detalhes: error.message
    });
  }
});

// Buscar medição por ID
app.get('/medicao/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.execute('SELECT * FROM medicoes WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({
        mensagem: "Medição ( ID ) não encontrada (1)"
      });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro Interno do Servidor",
      detalhes: error.message
    });
  }
});

// Criar nova medição
app.post('/medicao', async (req, res) => {
  const { descricao, tipo, valor } = req.body;
  
  if (!descricao || !tipo || valor === undefined) {
    return res.status(400).json({
      mensagem: "Verifique se todos os campos estão preenchidos"
    });
  }

  const { valor_convertido, classificacao } = calcularTemp(Number(valor));
  const unidade_original = "Celsius";
  const unidade_convertida = "Fahrenheit";

  try {
    const [result] = await db.execute(
      'INSERT INTO medicoes (descricao, tipo, valor_original, unidade_original, valor_convertido, unidade_convertida, classificacao) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [descricao, tipo, valor, unidade_original, valor_convertido, unidade_convertida, classificacao]
    );
    
    res.status(201).json({
      id: result.insertId,
      descricao,
      tipo,
      valor_original: valor,
      unidade_original,
      valor_convertido,
      unidade_convertida,
      classificacao
    });
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro Interno do Servidor",
      detalhes: error.message
    });
  }
});
// Criar nova velocidade medição
app.post('/medicao/velocidade', async (req, res) => {
  const { descricao, tipo, valor } = req.body;
  
  if (!descricao || !tipo || valor === undefined) {
    return res.status(400).json({
      mensagem: "Verifique se todos os campos estão preenchidos"
    });
  }

  const { valor_convertido, classificacao } = calcularVelocidade(Number(valor));
  const unidade_original = "km/h";
  const unidade_convertida = "m/s";

  try {
    const [result] = await db.execute(
      'INSERT INTO medicoes (descricao, tipo, valor_original, unidade_original, valor_convertido, unidade_convertida, classificacao) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [descricao, tipo, valor, unidade_original, valor_convertido, unidade_convertida, classificacao]
    );
    
    res.status(201).json({
      id: result.insertId,
      descricao,
      tipo,
      valor_original: valor,
      unidade_original,
      valor_convertido,
      unidade_convertida,
      classificacao
    });
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro Interno do Servidor",
      detalhes: error.message
    });
  }
});
// Criar nova comprimento medição
app.post('/medicao/comprimento', async (req, res) => {
  const { descricao, tipo, valor } = req.body;
  
  if (!descricao || !tipo || valor === undefined) {
    return res.status(400).json({
      mensagem: "Verifique se todos os campos estão preenchidos"
    });
  }

  const { valor_convertido, classificacao } = calcularComprimento(Number(valor));
  const unidade_original = "Metros";
  const unidade_convertida = "Pés";

  try {
    const [result] = await db.execute(
      'INSERT INTO medicoes (descricao, tipo, valor_original, unidade_original, valor_convertido, unidade_convertida, classificacao) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [descricao, tipo, valor, unidade_original, valor_convertido, unidade_convertida, classificacao]
    );
    
    res.status(201).json({
      id: result.insertId,
      descricao,
      tipo,
      valor_original: valor,
      unidade_original,
      valor_convertido,
      unidade_convertida,
      classificacao
    });
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro Interno do Servidor",
      detalhes: error.message
    });
  }
});

// Atualizar medição 
app.put('/medicao/:id', async (req, res) => {
  const { id } = req.params;
  const { descricao, tipo, valor } = req.body;

  // 1. Validação inicial de campos obrigatórios
  if (!descricao || !tipo || valor === undefined || !id) {
    return res.status(400).json({
      mensagem: "Verifique se todos os campos estão preenchidos"
    });
  }

  // 2. Inicializa as variáveis com let para permitir reatribuição
  let unidade_original = "";
  let unidade_convertida = "";
  let valor_convertido = null;
  let classificacao = "";

  // 3. Regra de negócio baseada no tipo
  if (tipo === "Temperatura") {
    // Remove o "const" daqui para usar as variáveis do escopo superior
    const resultadoTemp = calcularTemp(Number(valor));
    valor_convertido = resultadoTemp.valor_convertido;
    classificacao = resultadoTemp.classificacao;
    
    unidade_original = "Celsius";
    unidade_convertida = "Fahrenheit";
  }
  // 3. Regra de negócio baseada no tipo
  if (tipo === "Velocidade") {
    // Remove o "const" daqui para usar as variáveis do escopo superior
    const resultadoTemp = calcularVelocidade(Number(valor));
    valor_convertido = resultadoTemp.valor_convertido;
    classificacao = resultadoTemp.classificacao;
    
    unidade_original = "KM/H";
    unidade_convertida = "M/S";
  }
  if (tipo === "Comprimento") {
    // Remove o "const" daqui para usar as variáveis do escopo superior
    const resultadoTemp = calcularComprimento(Number(valor));
    valor_convertido = resultadoTemp.valor_convertido;
    classificacao = resultadoTemp.classificacao;
    
    unidade_original = "Metros";
    unidade_convertida = "Pés";
  }

  try {
    // 4. Executa a atualização no banco de dados
    const [result] = await db.execute(
      'UPDATE medicoes SET descricao = ?, tipo = ?, valor_original = ?, unidade_original = ?, valor_convertido = ?, unidade_convertida = ?, classificacao = ? WHERE id = ?',
      [descricao, tipo, valor, unidade_original, valor_convertido, unidade_convertida, classificacao, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensagem: "Medição não encontrada para atualização"
      });
    }

    // 5. Resposta de sucesso
    res.status(200).json({
      mensagem: "Medição atualizada com sucesso.",
      id,
      descricao,
      tipo,
      valor_original: valor,
      unidade_original,
      valor_convertido,
      unidade_convertida,
      classificacao
    });
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro Interno do Servidor",
      detalhes: error.message
    });
  }
});

// Deletar medição
app.delete('/medicao/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.execute('DELETE FROM medicoes WHERE id = ?', [id]);
    if (rows.affectedRows === 0) {
      return res.status(404).json({
        mensagem: "Medição não encontrada"
      });
    }
    res.status(200).json({ mensagem: "Medição apagada com sucesso" });
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro Interno do Servidor",
      detalhes: error.message
    });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});