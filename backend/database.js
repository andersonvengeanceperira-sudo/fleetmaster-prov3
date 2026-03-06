const sqlite3 = require("sqlite3").verbose()

const db = new sqlite3.Database("./fleetmaster.db")

db.serialize(()=>{

db.run(`
CREATE TABLE IF NOT EXISTS usuarios(
id INTEGER PRIMARY KEY AUTOINCREMENT,
nome TEXT,
email TEXT,
senha TEXT
)
`)

db.run(`
CREATE TABLE IF NOT EXISTS veiculos(
id INTEGER PRIMARY KEY AUTOINCREMENT,
placa TEXT,
modelo TEXT,
marca TEXT,
ano INTEGER
)
`)

db.run(`
CREATE TABLE IF NOT EXISTS condutores(
id INTEGER PRIMARY KEY AUTOINCREMENT,
nome TEXT,
cnh TEXT,
validade TEXT
)
`)

db.run(`
CREATE TABLE IF NOT EXISTS combustivel(
id INTEGER PRIMARY KEY AUTOINCREMENT,
data TEXT,
hora TEXT,
placa TEXT,
modelo TEXT,
condutor TEXT,
litros REAL,
valor REAL
)
`)

db.run(`
CREATE TABLE IF NOT EXISTS manutencao(
id INTEGER PRIMARY KEY AUTOINCREMENT,
data TEXT,
hora TEXT,
placa TEXT,
modelo TEXT,
descricao TEXT,
valor REAL
)
`)

db.run(`
CREATE TABLE IF NOT EXISTS multas(
id INTEGER PRIMARY KEY AUTOINCREMENT,
data TEXT,
placa TEXT,
condutor TEXT,
descricao TEXT,
valor REAL
)
`)

})

module.exports = db
