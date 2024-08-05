//variáveis para controlar se aparecem ou não, futuramente
let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1-rigth');
let numeros = document.querySelector('.d-1-3');

//variáveis de controle de ambiente ou seja, qual etapa da votação eu estou
let etapaAtual = 0;

//variável que vai controlar qual numero está sendo digitado na tela
let numero = '';

//variável para controlar o voto em branco
let votoBranco = false;

//variável que vai guarda os votos e mandar caso queira
let votos = [];

//função que vai começar cada etapa
function comecaEtapa() {
    let etapa = etapas[etapaAtual];
    let numeroHtml = '';
    numero = '';
    votoBranco = false;

    //loop para aumentar os quadrados dos numeros para digitar
    for(let i=0; i<etapa.numeros; i++) {
        //condição para colocar a div piscando
        if(i === 0) {
            numeroHtml += '<div class="numero pisca"></div>';
        }else {
            numeroHtml += '<div class="numero"></div>';
        }
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}

//função que vai atualizar os numeros na tela
function atualizarInterface() {
    let etapa = etapas[etapaAtual];
    //função para procurar se tem algum candidato com o mesmo numero digitado
    let candidato = etapa.candidatos.filter((item) => {
        if(item.numero === numero) {
            return true;
        }else {
            return false;
        }
    });
    //condição para quando achar um candidato
    if(candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nme: ${candidato.nome}<br/>Partido: ${candidato.partido}`;

        //variavel para guardar as fotos do candidato e depois mostrar na tela
        let fotosHtml = '';
        //loop para montar as fotos dos candidatos
        for(let i in candidato.fotos) {
            
            //condição para aparecer a foto do prefeito e o vice pequeno
            if(candidato.fotos[i].small) {
                fotosHtml += `<div class="d-1-image small"> <img src="images/${candidato.fotos[i].url}" alt=""/>${candidato.fotos[i].legenda}</div>`;
            }else {
                fotosHtml += `<div class="d-1-image"> <img src="images/${candidato.fotos[i].url}" alt=""/>${candidato.fotos[i].legenda}</div>`;
            }
        }
        lateral.innerHTML = fotosHtml;
    }else{
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>';
    }
}

//funções de clique dos botões
function clicou(n) {
    //variável que vai procurar o numero lisca
    let elNumero = document.querySelector('.numero.pisca');
    //condição para saber se pode digitar
    if(elNumero !== null) {
        elNumero.innerHTML = n;
        numero = `${numero}${n}`;

        //depois que clicar ele vai tirar a classe pisca
        elNumero.classList.remove('pisca');
        if(elNumero.nextElementSibling !== null) {
            //ação que vai pegar a proxima div
            elNumero.nextElementSibling.classList.add('pisca');
        }else{
            atualizarInterface();
        }
    }
}
function corrige() {
    comecaEtapa();
}
function branco() {
    //função para votar em branco
    numero= '';
    votoBranco = true;
    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';
    numeros.innerHTML = '';
    descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>';
    lateral.innerHTML = '';
    /*ou pode fazer assim, verificando se tem algo escrito para poder votar em branco: 
    if(numero === '') {
        votoBranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>';
    }else {
        alert('Para votar em BRANCO não pode ter digitado nehum número!')
    }
    */    
}
function confirme() {
    let etapa = etapas[etapaAtual];

    //variavél para controlar a mudança de etapa
    let votoConfimado = false;
    
    //condição para confirmar o voto em branco
    if(votoBranco === true) {
        votoConfimado = true;

        //salvando voto branco na variável
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        });
    }else if(numero.length === etapa.numeros) {
        votoConfimado = true;
        
        //salvando esse voto na variável com o numero
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        });
    }
    //condição para passar de etapa
    if(votoConfimado) {
        etapaAtual ++;
        if(etapas[etapaAtual] !== undefined) {
            comecaEtapa();
        }else {
            document.querySelector('.tela').innerHTML = '<div class="aviso--gigante pisca">FIM</div>';

            //para ver os votos na tela
            console.log(votos);
        }
    }
}

comecaEtapa();