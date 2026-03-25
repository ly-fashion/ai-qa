"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB = exports.DatabaseConnection = void 0;
const typeorm_1 = require("typeorm");
class DatabaseConnection {
    static instance;
    static getInstance() {
        if (!DatabaseConnection.instance) {
            DatabaseConnection.instance = new typeorm_1.DataSource({
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
    static async connect() {
        if (!DatabaseConnection.instance.isInitialized) {
            await DatabaseConnection.instance.initialize();
            console.log('Database connected successfully');
        }
    }
    static async disconnect() {
        if (DatabaseConnection.instance.isInitialized) {
            await DatabaseConnection.instance.destroy();
            console.log('Database disconnected');
        }
    }
}
exports.DatabaseConnection = DatabaseConnection;
exports.DB = DatabaseConnection;
//# sourceMappingURL=index.js.map