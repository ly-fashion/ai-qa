import { DataSource } from 'typeorm';
export declare class DatabaseConnection {
    private static instance;
    static getInstance(): DataSource;
    static connect(): Promise<void>;
    static disconnect(): Promise<void>;
}
export { DatabaseConnection as DB };
