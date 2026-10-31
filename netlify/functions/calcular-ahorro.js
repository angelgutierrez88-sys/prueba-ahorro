exports.handler = async (event, context) => {
  // Cabeceras de seguridad para que la web pueda conectarse
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Respuesta a la verificación del navegador
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Método no permitido' }) };
  }

  try {
    const { meta, actual, ahorroMensual } = JSON.parse(event.body);

    const faltante = meta - actual;
    
    if (faltante <= 0) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ meses: 0, mensaje: "¡Felicidades! Ya alcanzaste tu meta." })
      };
    }

    // 🔒 FÓRMULA SECRETA: Interés compuesto del 1.5% mensual
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
