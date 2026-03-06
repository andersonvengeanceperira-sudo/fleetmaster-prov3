const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const multer = require("multer")
const XLSX = require("xlsx")

const db = require("./database")

const app = express()

app.use(cors())
app.use(bodyParser.json())

const upload = multer({dest:"uploads/"})

app.get("/",(req,res)=>{
res.send("FleetMaster ERP API")
})

/* CADASTRO VEICULOS */

app.post("/veiculos",(req,res)=>{

const {placa,modelo,marca,ano} = req.body

db.run(
"INSERT INTO veiculos(placa,modelo,marca,ano) VALUES(?,?,?,?)",
[placa,modelo,marca,ano],
function(err){

if(err) res.send(err)
else res.send({status:"ok"})

})

})

/* CADASTRO CONDUTORES */

app.post("/condutores",(req,res)=>{

const {nome,cnh,validade} = req.body

db.run(
"INSERT INTO condutores(nome,cnh,validade) VALUES(?,?,?)",
[nome,cnh,validade],
function(err){

if(err) res.send(err)
else res.send({status:"ok"})

})

})

/* COMBUSTIVEL */

app.post("/combustivel",(req,res)=>{

const {data,hora,placa,modelo,condutor,litros,valor} = req.body

db.run(
`INSERT INTO combustivel
(data,hora,placa,modelo,condutor,litros,valor)
VALUES(?,?,?,?,?,?,?)`,
[data,hora,placa,modelo,condutor,litros,valor],
function(err){

if(err) res.send(err)
else res.send({status:"ok"})

})

})

/* MANUTENCAO */

app.post("/manutencao",(req,res)=>{

const {data,hora,placa,modelo,descricao,valor} = req.body

db.run(
`INSERT INTO manutencao
(data,hora,placa,modelo,descricao,valor)
VALUES(?,?,?,?,?,?)`,
[data,hora,placa,modelo,descricao,valor],
function(err){

if(err) res.send(err)
else res.send({status:"ok"})

})

})

/* MULTAS */

app.post("/multas",(req,res)=>{

const {data,placa,condutor,descricao,valor} = req.body

db.run(
`INSERT INTO multas
(data,placa,condutor,descricao,valor)
VALUES(?,?,?,?,?)`,
[data,placa,condutor,descricao,valor],
function(err){

if(err) res.send(err)
else res.send({status:"ok"})

})

})

/* UPLOAD DOCUMENTOS */

app.post("/documentos",upload.single("arquivo"),(req,res)=>{

res.send("Documento enviado")

})

/* EXPORTAR EXCEL */

app.get("/exportar",(req,res)=>{

db.all("SELECT * FROM combustivel",(err,rows)=>{

const ws = XLSX.utils.json_to_sheet(rows)

const wb = XLSX.utils.book_new()

XLSX.utils.book_append_sheet(wb,ws,"Combustivel")

XLSX.writeFile(wb,"relatorio.xlsx")

res.send("Planilha gerada")

})

})

app.listen(3000,()=>{
console.log("Servidor rodando")
})
