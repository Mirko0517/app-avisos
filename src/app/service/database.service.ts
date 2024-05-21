import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Aviso } from '../models/aviso.model';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private dbConnection: SQLiteDBConnection | undefined;
  private sqlite: SQLiteConnection | undefined;

  constructor() {
    this.init().catch(error => console.error("Error initializing database:", error));
  }

  async init() {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
    this.dbConnection = await this.sqlite.createConnection('avisos', false, 'no-encryption', 1, false);
    await this.dbConnection.open();
    await this.dbConnection.execute(`
      CREATE TABLE IF NOT EXISTS avisos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT,
        descripcion TEXT,
        fecha TEXT,
        foto TEXT
      );
    `);
  }

  async agregarAviso(aviso: { titulo: string; descripcion: string; fecha: string; foto: string }) {
    if (!this.dbConnection) {
      console.error("Database connection is not initialized.");
      return;
    }
    const statement = `INSERT INTO avisos (titulo, descripcion, fecha, foto) VALUES (?, ?, ?, ?)`;
    const values = [aviso.titulo, aviso.descripcion, aviso.fecha, aviso.foto];
    await this.dbConnection.run(statement, values);
  }

  async obtenerAvisos(): Promise<Aviso[]> {
  if (!this.dbConnection) {
    console.error("Database connection is not initialized.");
    return []; // Return an empty array instead of undefined
  }
  const result = await this.dbConnection.query(`SELECT name FROM sqlite_master WHERE type='table' AND name='avisos';`);
  if (!result.values || result.values.length === 0) {
    console.error("Table 'avisos' does not exist.");
    return []; // Return an empty array instead of undefined
  }
  const avisos = await this.dbConnection.query('SELECT * FROM avisos');
  return avisos.values ? avisos.values as Aviso[] : []; // Ensure an empty array is returned if values is undefined
}

  async eliminarAviso(id: number) {
  if (!this.dbConnection) {
    console.error("Database connection is not initialized.");
    return;
  }
  const statement = `DELETE FROM avisos WHERE id = ?`;
  await this.dbConnection.run(statement, [id]);
}
}
