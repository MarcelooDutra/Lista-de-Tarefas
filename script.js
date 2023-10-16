const inputTarefa = document.querySelector('.nova_tarefa')
const botaoTarefa = document.querySelector('.btn_tarefa')
const listaTarefa = document.querySelector('.lista_tarefa')


//pegando o evento do enter.
inputTarefa.addEventListener('keypress', (e)=>{
  if(e.keyCode === 13){
    if(!inputTarefa.value) return
    criaTarefa(inputTarefa.value)
  }
})

//cria-se uma funcao para criar a li.
const criaLi = ()=>{
    const li = document.createElement('li')
    return li
}

//cria-se uma funcao para limpar e focar no input apos add tarefa.
const limpaImput = ()=>{
    inputTarefa.value = ''
    inputTarefa.focus()
}

//criando o botao apagar com cada tarefa.
const criaBotaoApagar = (li)=>{
    li.innerText += ' '
    const botaoApagar = document.createElement('button')
    botaoApagar.innerText = 'apagar'
    botaoApagar.setAttribute('class', 'apagar')
    li.appendChild(botaoApagar)
}

//cria-se uma função para criar tarefa.
const criaTarefa = (textoInput)=>{
    const li = criaLi()
    li.innerHTML = textoInput
    listaTarefa.appendChild(li)
    limpaImput()
    criaBotaoApagar(li)
    salvarTarefas()
}

//pegando o valor do input com o clique do botão.
botaoTarefa.addEventListener('click', ()=>{
    if(!inputTarefa.value) return
    criaTarefa(inputTarefa.value)
})

document.addEventListener('click', (e)=>{
    const el = e.target

    if(el.classList.contains('apagar')){
        el.parentElement.remove()
        salvarTarefas()
    }
})

//cria-se uma funcao para salvar tarefas.
const salvarTarefas = ()=>{
    const liTarefas = listaTarefa.querySelectorAll('li')
    const listaDeTarefas = []

    for(let listaTaref of liTarefas){
        let tarefaTexto = listaTaref.innerText
        tarefaTexto = tarefaTexto.replace('apagar', '').trim()
        listaDeTarefas.push(tarefaTexto)
    }
    const tarefaJson = JSON.stringify(listaDeTarefas)
    localStorage.setItem('tarefas', tarefaJson)
}

const trasListaTarefas = ()=>{
    const listaDasTarefas = localStorage.getItem('tarefas')
    const listaDeTarefas = JSON.parse(listaDasTarefas)

   for(let tarefas of listaDeTarefas){
    criaTarefa(tarefas)
   }
}
trasListaTarefas()