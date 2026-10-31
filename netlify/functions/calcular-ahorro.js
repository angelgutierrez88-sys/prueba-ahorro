exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const data = JSON.parse(event.body);
    
    // Convertimos el texto a números reales
    const meta = Number(data.meta);
    const actual = Number(data.actual);
    const ahorroMensual = Number(data.ahorroMensual);

    const faltante = meta - actual;
    
    if (faltante <= 0) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ meses: 0 })
      };
    }

    const interesMensual = 0.015; 
    let meses = 0;
    let acumulado = actual;

    while (acumulado < meta && meses < 1200) {
      acumulado = (acumulado + ahorroMensual) * (1 + interesMensual);
      meses++;
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ meses: meses })
    };
  } catch (error) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Datos inválidos' }) };
  }
};
