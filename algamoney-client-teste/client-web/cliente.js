// 1. Inputs
// 1.1 Inputs Autenticação
var email_input = document.getElementsByName('email');
var senha_input = document.getElementsByName('senha');
// 1.2 Input Categoria
var categoria_input = document.getElementsByName('categoria');

// 2. Resultado
var conteudo = document.getElementById('conteudo');


const CLIENT = 'http://localhost:8888';
const API = 'http://localhost:8080';

// Categorias:

function listar_categorias() {
  let requisicao = new XMLHttpRequest();
  let email = email_input[0].value;
  let senha = senha_input[0].value;

  try {
    let token = obter_access_token(email, senha);

    requisicao.addEventListener('load', requisicao_listener);
    requisicao.open('GET', API.concat('/categorias'));
    requisicao.setRequestHeader('Authorization', 'Bearer ' + token.access_token);

    requisicao.send();
    console.log(requisicao.responseText);
  } catch(erro) {
    console.log(erro);
  }
}

function cadastrar_categoria() {
  let requisicao = new XMLHttpRequest();
  let email = email_input[0].value;
  let senha = senha_input[0].value;
  let categoria = categoria_input[0].value;

  try {
    let token = obter_access_token(email, senha);

    requisicao.addEventListener('load', requisicao_listener);
    requisicao.open('POST', API.concat('/categorias'));
    requisicao.setRequestHeader('Content-type', 'application/json');
    requisicao.setRequestHeader('Authorization', 'Bearer ' + token.access_token);

    requisicao.send(JSON.stringify({"nome" : categoria}));
    console.log(requisicao.responseText);
  } catch(erro) {
    console.log(erro);
  }
}

// TODO Pessoas
// TODO Lançamentos


//-----------------------------------------------------------------------------
// Token
function obter_access_token(email, senha) {
		let requisicao = new XMLHttpRequest();
    let resposta;
    requisicao.open('POST', 'http://localhost:8080/oauth/token', false);
		requisicao.setRequestHeader('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');
		requisicao.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		requisicao.send('client_id=angular&username=' + email + '&password=' + senha +'&grant_type=password');

    resposta = JSON.parse(requisicao.response);

    if(!('access_token' in resposta)) {
      throw "Acesso inválido";
    }

    return resposta;
}

// Listener
function requisicao_listener() {
  conteudo.innerHTML = this.responseText;
}
