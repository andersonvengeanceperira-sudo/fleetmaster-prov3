const ctx = document.getElementById("grafico")

new Chart(ctx,{

type:"bar",

data:{

labels:["Combustível","Manutenção","Multas"],

datasets:[{

label:"Custos",

data:[3000,2000,500]

}]

}

})
