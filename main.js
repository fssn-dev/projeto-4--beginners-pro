//declaração de elementos
const FORM = document.querySelector('form')
const CHECKBOX = document.getElementById('checkComplemento')
const CHECK_WRAPPER = document.getElementById('checkbox')
const COMPLEMENTO_WRAPPER = document.getElementById('complemento')
const BUTTON = document.getElementById('enviar')
const RESET = document.getElementById('reset')
const INPUTS = document.querySelectorAll('input')
const SELECTS = document.querySelectorAll('select')

//declaração de vetor que receberá os objetos
const DADOS_RECEBIDOS = []

//contador de usuários
let contador = 0

//instruções a serem executadas no click do botão Enviar Dados
BUTTON.addEventListener('click', (click) => {

    //variável temporária recebe uma lista de nós entre a variável INPUTS
    let validation = [].slice.call(INPUTS, 0, -2)

    //para cada elemento da variável SELECTS
    SELECTS.forEach(element => {
        //adicione o elemento na ultima posição de validation
        validation.push(element)
    })


    let boolean = false

    //para cada posição na variável validation
    for (const key in validation) {
        //se qualquer valor de validation for '', boolean = false
        if (validation[key].value == '') {
            boolean = false
        } else {
            //senão, true
            boolean = true
        }
    }

    //se boolean NÃO for true
    if (!boolean) {
        //não faça nada

    } else {
        //senão, execute as instruções do botão

        //mostra a tabela
        elementoDisplay('tabela', 'initial')

        //insere um novo objeto na variável DADOS_RECEBIDOS
        DADOS_RECEBIDOS.push(new vetorDados(INPUTS, SELECTS))

        //formata os dados do objeto
        formatacao()

        //reseta o campo complemento
        complementoSwitch(false)

        //limpa os campos com um botão reset que náo é mostrado na página
        RESET.click()

        //limpa os dados da tabela
        limpaTabela()

        //cria tabela de acordo com um template pre-definido
        criaTabela()

        contador = contador + 1
        //contador de usuários cadastrados
        document.querySelector('p').innerText = `Quantidade de usuários cadastrados: ${contador}`
    }
})


//previne comportamento indesejável do formulário
FORM.addEventListener('submit', (submit) => {
    submit.preventDefault()
})

//se o usuário clicar na checkbox
CHECKBOX.addEventListener('change', () => {
    //esconde o checkbox, mostra o campo complemento com requerimento obrigatório
    complementoSwitch(true)
})



//função que lida com a visibilidade dos componentes relacionados ao complemento do endereço
//realiza a função ou seu inverso, de acordo com o parâmetro recebido
function complementoSwitch(boolean) {
    let checkWrapper = document.getElementById('checkbox')
    let compWrapper = document.getElementById('complemento')
    let compInput = document.getElementById('compInput')

    if (boolean) {
        checkWrapper.setAttribute('style', 'display: none;')
        compWrapper.setAttribute('style', 'display: initial;')
        compInput.setAttribute('required', '')
    } else {
        checkWrapper.setAttribute('style', 'display: initial;')
        compWrapper.setAttribute('style', 'display: none;')
        compInput.removeAttribute('required')
    }
}

//função construtora de objeto
function vetorDados(inputs, selects) {
    const date = new Date()
    {
        this.nome = inputs[0].value,
            this.email = inputs[1].value,
            this.cep = inputs[2].value,
            this.rua = inputs[3].value,
            this.bairro = inputs[4].value,
            this.cidade = inputs[5].value,
            this.telefone = inputs[6].value,
            this.numero = inputs[7].value,
            this.complemento = inputs[9].value,
            this.civil = selects[0].value,
            this.escolaridade = selects[1].value,
            this.estado = selects[2].value,
            //geração do valor data
            this.data = (date.getDate()) + '/' + (date.getMonth() + 1) + '/' + (date.getFullYear())
    }
}

//template da linha da tabela
function templateTabela(nome, email, telefone, civil, escolaridade, cep, rua,
    numero, complemento, bairro, cidade, estado, data, array, obj) {

    return `
        <td>${nome}</td>
        <td>${email}</td>
        <td>${telefone}</td>
        <td>${civil}</td>
        <td>${escolaridade}</td>
        <td>${cep}</td>
        <td>${rua}</td>
        <td>${numero}</td>
        <td>${complemento}</td>
        <td>${bairro}</td>
        <td>${cidade}</td>
        <td>${estado}</td>
        <td>${data}</td>
        <td><img src="images/trashbin_24dp.png" onclick = "lixeira(${array}.indexOf(${obj}))"></td>
    `
}


//limpa o vetor de objetos
function excluirHistorico() {
    DADOS_RECEBIDOS.splice(0)
}

//remove os dados da tabela
function limpaTabela() {
    document.getElementById('tbody').innerHTML = ''
}

//gera a tabela
function criaTabela() {
    //para cada posição do vetor, adiciona uma linha seguindo a função templateTabela
    for (const objeto of DADOS_RECEBIDOS) {
        document.getElementById('tbody').innerHTML +=
            templateTabela(
                objeto.nome,
                objeto.email,
                objeto.telefone,
                objeto.civil,
                objeto.escolaridade,
                objeto.cep,
                objeto.rua,
                objeto.numero,
                objeto.complemento,
                objeto.bairro,
                objeto.cidade,
                objeto.estado,
                objeto.data,

                //parâmetros da função atribuída ao ícone lixeira em cada linha da tabela
                'DADOS_RECEBIDOS',
                DADOS_RECEBIDOS.indexOf(objeto)
            )
    }
}

//instruções da função atrelada ao ícone lixeira por meio do atributo onclick utilizado no templateTabela()
function lixeira(indice) {
    //remove do vetor de dados os valores na mesma posição da lixeira clicada
    DADOS_RECEBIDOS.splice(indice, 1)
    //remove a tabela antiga
    limpaTabela()
    //insere nova tabela
    criaTabela()

    contador = contador - 1

    document.querySelector('p').innerText = `Quantidade de usuários cadastrados: ${contador}`

    if (DADOS_RECEBIDOS.length == 0) {
        elementoDisplay('tabela', 'none')
    }
}

//altera o display de elementos HTML recebendo o valor ID do arquivo HTML
function elementoDisplay(iDElemento, valorAtributo) {
    document.getElementById(iDElemento).style.display = valorAtributo
}

//formata os valores dos inputs recebidos
function formatacao() {
    //para cada posição no vetor
    for (const key in DADOS_RECEBIDOS) {

        //variável temporária
        let split = []

        //insere os valores na variável
        split.push(
            //normaliza o valor antes da formatação
            DADOS_RECEBIDOS[key].nome.toLowerCase()
                //divide o valor da propriedade palavra por palavra em um vetor
                .split(' '))
        //insere o valor formatado no vetor de dados
        DADOS_RECEBIDOS[key].nome =
            //mapeia a posição 0 do vetor
            split[0].map(x =>
                //primeiro caractere de cada posição
                x.charAt()
                    //convertido para letra maiúscula e concatenado com substring dos elementos sem a primeira letra
                    .toUpperCase() + x.substring(1))
                //concatena todos os elementos em uma nova string com um espaço entre eles
                .join(' ')

        let split2 = []
        split2.push(DADOS_RECEBIDOS[key].bairro.toLowerCase().split(' '))
        DADOS_RECEBIDOS[key].bairro =
            split2[0].map(x => x.charAt().toUpperCase() + x.substring(1)).join(' ')

        let split3 = []
        split3.push(DADOS_RECEBIDOS[key].cidade.toLowerCase().split(' '))
        DADOS_RECEBIDOS[key].cidade =
            split3[0].map(x => x.charAt().toUpperCase() + x.substring(1)).join(' ')

        let split4 = []
        split4.push(DADOS_RECEBIDOS[key].rua.toLowerCase().split(' '))
        DADOS_RECEBIDOS[key].rua =
            split4[0].map(x => x.charAt().toUpperCase() + x.substring(1)).join(' ')


        //formatação do cep
        DADOS_RECEBIDOS[key].cep =
            //primeiros 5 números do cep
            DADOS_RECEBIDOS[key].cep.toString().split(/(.....)/)[1]
            //concatenados com -
            + '-' +
            //concatenados com o restante do cep
            DADOS_RECEBIDOS[key].cep.toString().split(/(.....)/)[2]

        //formatação de telefone
        //se telefone possuir 10 dígitos
        if (DADOS_RECEBIDOS[key].telefone.length == 10) {

            //remove caracteres especiais indesejados devido ao loop no início da função
            DADOS_RECEBIDOS[key].telefone = DADOS_RECEBIDOS[key].telefone.replace('(', '' | ')', '' | '-', '')
            //variável recebe o dado formatado
            DADOS_RECEBIDOS[key].telefone =
                // ( concatenado com
                '(' +
                //dois primeiros números do telefone
                DADOS_RECEBIDOS[key].telefone.toString().split(/(..)/)[1]
                //concatenado com )
                + ')' +
                //concatenado com os próximos 4 números
                DADOS_RECEBIDOS[key].telefone.toString().substring(2, 6)
                //concatenado com -
                + '-' +
                //concatenado com o restante dos números
                DADOS_RECEBIDOS[key].telefone.toString().substring(6)

            //se telefone possuir 11 dígitos
        } else if (DADOS_RECEBIDOS[key].telefone.length == 11) {
            DADOS_RECEBIDOS[key].telefone = DADOS_RECEBIDOS[key].telefone.replace('(', '' | ')', '' | '-', '')
            DADOS_RECEBIDOS[key].telefone =
                '(' +
                DADOS_RECEBIDOS[key].telefone.toString().split(/(..)/)[1]
                + ')' +
                //concatenado com os próximos 5 números
                DADOS_RECEBIDOS[key].telefone.toString().substring(2, 7)
                + '-' +
                //concatenado com o restante dos números
                DADOS_RECEBIDOS[key].telefone.toString().substring(7)
        }

        // complemento é obrigatório apenas quando o campo está visível
        // caso contrário seu valor sempre será ''

        //caso complemento possua dados
        if (DADOS_RECEBIDOS[key].complemento != '') {
            let split5 = []
            split5.push(DADOS_RECEBIDOS[key].complemento.toLowerCase().split(' '))
            DADOS_RECEBIDOS[key].complemento =
                split5[0].map(x => x.charAt().toUpperCase() + x.substring(1)).join(' ')
        }
    }
}