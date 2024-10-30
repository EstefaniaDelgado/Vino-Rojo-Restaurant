const cron = require('node-cron');
const axios = require('axios'); // Para hacer peticiones HTTP desde Node.js

// Ejecuta la tarea cada 10 minutos
cron.schedule('*/10 * * * *', async () => {
  try {
    const response = await axios.get('https://vino-rojo-restaurant.onrender.com/foods');
    console.log('Petición exitosa:', response.data);
  } catch (error) {
    console.error('Error en la petición:', error);
  }
});
