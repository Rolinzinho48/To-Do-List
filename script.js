let listaTarefas = []

    

function CriarTarefa(){
    
    let txtTarefa = document.getElementById("input").value
    let Tarefa = document.createElement("li")
    let Tarefa2 = document.createElement("label")
  
    let check = document.createElement("input")
    let botao = document.createElement("button")
    
    check.type = "checkbox"
    Tarefa2.innerHTML = txtTarefa
    botao.innerText = "Remover "
    

    Tarefa.appendChild(Tarefa2)
    Tarefa.appendChild(check)
    Tarefa.appendChild(botao)
   
    
    document.querySelector("ul").appendChild(Tarefa)
    listaTarefas.push(Tarefa)
}

