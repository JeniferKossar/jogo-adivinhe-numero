// Variáveis globais
let numeroAleatorio = Math.floor(Math.random() * 100) + 1;
const palpites = document.querySelector('.palpites');
const ultimoResultado = document.querySelector('.ultimoResultado');
const baixoOuAlto = document.querySelector('.baixoOuAlto');
const campoPalpite = document.querySelector('.campoPalpite');
const envioPalpite = document.querySelector('.envioPalpite');
let contagemPalpites = 1;
let botaoReinicio;

// Evento de clique no botão
envioPalpite.addEventListener('click', conferirPalpite);

// Função principal
function conferirPalpite() {
    const palpiteUsuario = Number(campoPalpite.value);
    
    // Validação
    if (palpiteUsuario < 1 || palpiteUsuario > 100 || isNaN(palpiteUsuario)) {
        alert('Por favor, insira um número entre 1 e 100!');
        return;
    }

    // Primeiro palpite
    if (contagemPalpites === 1) {
        palpites.textContent = 'Palpites anteriores: ';
    }
    palpites.textContent += palpiteUsuario + ' ';

    // Verifica se acertou
    if (palpiteUsuario === numeroAleatorio) {
        ultimoResultado.textContent = `Parabéns! Você acertou em ${contagemPalpites} tentativas!`;
        ultimoResultado.style.backgroundColor = '#2ecc71';
        baixoOuAlto.textContent = '';
        configFimDeJogo();
    } else if (contagemPalpites === 10) {
        ultimoResultado.textContent = 'Fim de jogo! O número era ' + numeroAleatorio;
        baixoOuAlto.textContent = '';
        configFimDeJogo();
    } else {
        ultimoResultado.textContent = 'Errado!';
        ultimoResultado.style.backgroundColor = '#e74c3c';
        if (palpiteUsuario < numeroAleatorio) {
            baixoOuAlto.textContent = 'Seu palpite está baixo!';
        } else {
            baixoOuAlto.textContent = 'Seu palpite está alto!';
        }
    }

    contagemPalpites++;
    campoPalpite.value = '';
    campoPalpite.focus();
}

// Configura o fim do jogo
function configFimDeJogo() {
    campoPalpite.disabled = true;
    envioPalpite.disabled = true;
    botaoReinicio = document.createElement('button');
    botaoReinicio.textContent = 'Jogar novamente';
    document.querySelector('.container').appendChild(botaoReinicio);
    botaoReinicio.addEventListener('click', reiniciarJogo);
}

// Reinicia o jogo
function reiniciarJogo() {
    contagemPalpites = 1;
    numeroAleatorio = Math.floor(Math.random() * 100) + 1;
    
    // Limpa os resultados
    document.querySelectorAll('.resultados p').forEach(p => p.textContent = '');
    ultimoResultado.style.backgroundColor = 'transparent';
    
    // Remove o botão de reinício
    botaoReinicio.parentNode.removeChild(botaoReinicio);
    
    // Habilita os campos
    campoPalpite.disabled = false;
    envioPalpite.disabled = false;
    campoPalpite.value = '';
    campoPalpite.focus();
}

function conferirPalpite() {
    const palpiteUsuario = Number(campoPalpite.value); // Pega o valor digitado

    // Verifica se o palpite é válido (entre 1 e 100)
    if (palpiteUsuario < 1 || palpiteUsuario > 100 || isNaN(palpiteUsuario)) {
        alert("Por favor, digite um número entre 1 e 100!");
        return;
    }

    // Adiciona o palpite à lista de palpites anteriores
    if (contagemPalpites === 1) {
        palpites.textContent = "Palpites anteriores: ";
    }
    palpites.textContent += palpiteUsuario + " ";

    // Verifica se o palpite está correto
    if (palpiteUsuario === numeroAleatorio) {
        ultimoResultado.textContent = `🎉 Parabéns! Você acertou em ${contagemPalpites} tentativas!`;
        ultimoResultado.style.backgroundColor = "#4CAF50"; // Verde (sucesso)
        baixoOuAlto.textContent = "";
        configFimDeJogo();
    } 
    // Se o palpite estiver errado, verifica se é maior ou menor
    else {
        ultimoResultado.textContent = "❌ Errado!";
        ultimoResultado.style.backgroundColor = "#f44336"; // Vermelho (erro)
        
        // Dá a dica (maior ou menor)
        if (palpiteUsuario < numeroAleatorio) {
            baixoOuAlto.textContent = "⬆️ Seu palpite está **baixo**! Tente um número maior.";
        } else {
            baixoOuAlto.textContent = "⬇️ Seu palpite está **alto**! Tente um número menor.";
        }

        contagemPalpites++; // Incrementa a contagem de palpites
    }

    // Limpa o campo e prepara para o próximo palpite
    campoPalpite.value = "";
    campoPalpite.focus();

    // Verifica se acabaram as tentativas (10 palpites)
    if (contagemPalpites === 10) {
        ultimoResultado.textContent = "😢 Fim de jogo! O número era " + numeroAleatorio;
        baixoOuAlto.textContent = "";
        configFimDeJogo();
    }
}