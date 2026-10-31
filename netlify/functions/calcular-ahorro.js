exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Método no permitido' };
  }

  try {
    const { meta, actual, ahorroMensual } = JSON.parse(event.body);

    // 🔒 TU LÓGICA SECRETA AQUÍ
    const faltante = meta - actual;
    
    if (faltante <= 0) {
      return {
        statusCode: 200,
        body: JSON.stringify({ meses: 0, mensaje: "¡Felicidades! Ya alcanzaste tu meta." })
      };
    }

    // Fórmula secreta: Añadimos un pequeño interés compuesto simulado del 1.5% mensual
    const interesMensual = 0.015; 
    let meses = 0;
    let acumulado = actual;

    while (acumulado < meta && meses < 1200) {
      acumulado = (acumulado + ahorroMensual) * (1 + interesMensual);
      meses++;
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ meses: meses })
    };
  } catch (error) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Datos inválidos' }) };
  }
};
