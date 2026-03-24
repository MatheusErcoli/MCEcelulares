import app from "./app";
import sequelize from "./config/database";
import { definirRelacionamentos } from "./models/relacionamentos";

const port = 3000;

async function start() {
  try {
    definirRelacionamentos();
    
    await sequelize.sync();

    app.listen(port, () => {
      console.log('====================================');
      console.log("Servidor rodando na porta " + port);
      console.log('====================================');
    });
  } catch (err) {
    console.error('Erro ao iniciar o servidor ou sincronizar o banco:', err);
    process.exit(1);
  }
}

start();