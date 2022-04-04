let listaTarefas = []


    let DataBase = openDatabase("Tarefas", "1.0", "TESTE TESTE", 4048)

    DataBase.transaction(function(inicial){
         inicial.executeSql("CREATE TABLE tarefinha(id INTEGER PRIMARY KEY, conteudo VARCHAR(255))")
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
function DeletaSQL(nome){
    DataBase.transaction(function(deletar){
        deletar.executeSql("DELETE FROM tarefinha WHERE conteudo = ?",[nome])
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

function CriarTarefa(txtTarefa){
    
    let Tarefa = document.createElement("li")
    let div = document.createElement("div")
    let Tarefa2 = document.createElement("label")
  
    let check = document.createElement("input")
    let botao = document.createElement("button")

    check.addEventListener("click",sublinharTexto)
    botao.addEventListener("click",RemoverTarefa)
    
    check.type = "checkbox"
    Tarefa2.innerHTML = txtTarefa
    botao.innerText = "x"
    
  

    Tarefa.appendChild(Tarefa2)
    Tarefa.appendChild(check)
    Tarefa.appendChild(botao)
   
    
    document.querySelector("ul").appendChild(Tarefa)
    listaTarefas.push(Tarefa)
    AdicionarSQL(txtTarefa)

}

 sublinharTexto =(event) =>{
    if(event.target.checked == true){
        event.target.parentElement.children[0].style.textDecoration = "line-through"
        event.target.parentElement.children[0].style.fontStyle = "italic"
    }
    else{
        event.target.parentElement.children[0].style.textDecoration = "none"
        event.target.parentElement.children[0].style.fontStyle = ""
    }
}
function RemoverTarefa(event){
    event.target.parentElement.remove()     

    let a = event.target.parentElement.children[0].textContent

    DeletaSQL(a)

}

function GeradorTarefa(){
    let txt = document.getElementById("inputText").value
    CriarTarefa(txt)
    document.getElementById("inputText").value = ""
}

function sla(event){
    let tecla = event.keyCode
    if(tecla == 13){
        GeradorTarefa() 
    }
}

let btn = document.getElementById("botao1")
btn.addEventListener("click",GeradorTarefa);
let chama = document.querySelector("inputText")
