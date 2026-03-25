import { DataSource } from 'typeorm';

export class DatabaseConnection {
  private static instance: DataSource;

  public static getInstance(): DataSource {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DataSource({
        type: 'mysql',
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 3306,
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_DATABASE || 'ai_qa',
        synchronize: false,
        logging: true,
      });
    }
    return DatabaseConnection.instance;
  }

  public static async connect(): Promise<void> {
    if (!DatabaseConnection.instance.isInitialized) {
      await DatabaseConnection.instance.initialize();
      console.log('Database connected successfully');
    }
  }

  public static async disconnect(): Promise<void> {
    if (DatabaseConnection.instance.isInitialized) {
      await DatabaseConnection.instance.destroy();
      console.log('Database disconnected');
    }
  }
}

export { DatabaseConnection as DB };
