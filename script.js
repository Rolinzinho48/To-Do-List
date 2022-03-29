let listaTarefas = []


    let DataBase = openDatabase("Tarefas", "1.0", "TESTE TESTE", 4048)

    DataBase.transaction(function(inicial){
         inicial.executeSql("CREATE TABLE tarefinha(id INTEGER PRIMARY KEY, conteudo VARCHAR(255))")
         console.log("A")
    })


    DataBase.transaction (function (tx) { 
        tx.executeSql ('SELECT * FROM tarefinha', [], function (tx, results) {
            let len = results.rows.length;
            for(let i = 0;i<len;i++){
                listarTarefas(results.rows.item(i).conteudo)
            }
        })
    })
    
function AdicionarSQL(conteudo){

    DataBase.transaction(function(inserir){
        inserir.executeSql("INSERT INTO tarefinha(conteudo) VALUES(?)",[conteudo])
    })
    
}

function listarTarefas(txtTarefa){
    let Tarefa = document.createElement("li")
    let Tarefa2 = document.createElement("label")
  
    let check = document.createElement("input")
    let botao = document.createElement("button")

    botao.addEventListener("click",RemoverTarefa)
    
    check.type = "checkbox"
    Tarefa2.innerHTML = txtTarefa
    botao.innerText = "Remover "
    

    Tarefa.appendChild(Tarefa2)
    Tarefa.appendChild(check)
    Tarefa.appendChild(botao)
   
    
    document.querySelector("ul").appendChild(Tarefa)
}

function CriarTarefa(){
    
    let txtTarefa = document.getElementById("inputText").value
    let Tarefa = document.createElement("li")
    let Tarefa2 = document.createElement("label")
  
    let check = document.createElement("input")
    let botao = document.createElement("button")

    botao.addEventListener("click",RemoverTarefa)
    
    check.type = "checkbox"
    Tarefa2.innerHTML = txtTarefa
    botao.innerText = "Remover "
    

    Tarefa.appendChild(Tarefa2)
    Tarefa.appendChild(check)
    Tarefa.appendChild(botao)
   
    
    document.querySelector("ul").appendChild(Tarefa)
    listaTarefas.push(Tarefa)
    AdicionarSQL(txtTarefa)
}

function RemoverTarefa(event){
    event.target.parentElement.remove()  
}


let btn = document.getElementById("botao1")
btn.addEventListener("click",CriarTarefa);
