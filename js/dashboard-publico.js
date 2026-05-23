/* =========================================================
   PAINEL DE CHAMADAS - SISTEMA COMPLETO
   VERSÃO ESTÁVEL COM VOZ FEMININA PT-BR
========================================================= */

/* =========================================================
   DATA E HORA
========================================================= */

function atualizarHorario() {

    const agora = new Date();

    const dia = String(
        agora.getDate()
    ).padStart(2, '0');

    const mes = String(
        agora.getMonth() + 1
    ).padStart(2, '0');

    const ano = agora.getFullYear();

    const hora = String(
        agora.getHours()
    ).padStart(2, '0');

    const minuto = String(
        agora.getMinutes()
    ).padStart(2, '0');

    document.getElementById(
        'dataAtual'
    ).innerHTML =
        `${dia}/${mes}/${ano}`;

    document.getElementById(
        'horaAtual'
    ).innerHTML =
        `${hora}:${minuto}`;

}

setInterval(
    atualizarHorario,
    1000
);

atualizarHorario();

/* =========================================================
   ELEMENTOS
========================================================= */

const senhaAtual =
    document.getElementById(
        'senhaAtual'
    );

const salaAtual =
    document.getElementById(
        'salaAtual'
    );

const pacienteAtual =
    document.getElementById(
        'pacienteAtual'
    );

const listaChamadas =
    document.querySelector(
        '.lista-chamadas'
    );

const tabelaFila =
    document.getElementById(
        'filaTabela'
    );

/* =========================================================
   FILA DE ATENDIMENTO
========================================================= */

const fila = [

    {
        senha: 'A023',
        prioridade: '1° Prioridade',
        cor: 'vermelho',
        paciente: 'Maria da Silva',
        sala: '2'
    },

    {
        senha: 'B015',
        prioridade: '2° Prioridade',
        cor: 'amarelo',
        paciente: 'João Pedro',
        sala: '1'
    },

    {
        senha: 'C008',
        prioridade: 'Pouca Urgência',
        cor: 'verde',
        paciente: 'Ana Paula',
        sala: '3'
    },

    {
        senha: 'A024',
        prioridade: '1° Prioridade',
        cor: 'vermelho',
        paciente: 'Carlos Alberto',
        sala: '4'
    }

];

/* =========================================================
   CONTROLE
========================================================= */

let indice = 0;

let chamadas = [];

let sistemaIniciado = false;

let vozSelecionada = null;

/* =========================================================
   CARREGAR VOZES
========================================================= */

async function carregarVozes() {

    return new Promise((resolve) => {

        let tentativas = 0;

        const intervalo = setInterval(() => {

            const vozes =
                speechSynthesis.getVoices();

            console.log(
                'VOZES:',
                vozes
            );

            if (vozes.length > 0) {

                selecionarVoz(vozes);

                clearInterval(
                    intervalo
                );

                resolve();

            }

            tentativas++;

            if (tentativas >= 30) {

                clearInterval(
                    intervalo
                );

                resolve();

            }

        }, 300);

    });

}

/* =========================================================
   SELECIONAR VOZ FEMININA
========================================================= */

function selecionarVoz(vozes) {

    const prioridades = [

        'Microsoft Maria',
        'Microsoft Francisca',
        'Google português do Brasil',
        'Luciana',
        'Maria'

    ];

    for (const nome of prioridades) {

        const encontrada = vozes.find(voz =>

            voz.lang.toLowerCase() === 'pt-br' &&

            voz.name.toLowerCase().includes(
                nome.toLowerCase()
            )

        );

        if (encontrada) {

            vozSelecionada =
                encontrada;

            console.log(
                'VOZ FEMININA:',
                vozSelecionada.name
            );

            return;

        }

    }

    /* FALLBACK */

    vozSelecionada = vozes.find(voz =>

        voz.lang.toLowerCase().includes('pt')

    );

    console.log(
        'VOZ FALLBACK:',
        vozSelecionada
    );

}

/* =========================================================
   ESPERAR
========================================================= */

function esperar(ms) {

    return new Promise(resolve => {

        setTimeout(
            resolve,
            ms
        );

    });

}

/* =========================================================
   TOCAR SOM
========================================================= */

function tocarSom() {

    return new Promise((resolve) => {

        const audio = new Audio(
            'https://actions.google.com/sounds/v1/alarms/beep_short.ogg'
        );

        audio.volume = 0.3;

        audio.onended = () => {

            resolve();

        };

        audio.play();

    });

}

/* =========================================================
   FALAR TEXTO
========================================================= */

function falarTexto(texto) {

    return new Promise((resolve) => {

        /* LIMPAR FILA */

        speechSynthesis.cancel();

        setTimeout(() => {

            const fala =
                new SpeechSynthesisUtterance();

            fala.text = texto;

            /* PORTUGUÊS */

            fala.lang = 'pt-BR';

            /* VOZ FEMININA */

            if (vozSelecionada) {

                fala.voice =
                    vozSelecionada;

                fala.voiceURI =
                    vozSelecionada.voiceURI;

            }

            /* NATURALIDADE */

            fala.rate = 0.88;

            fala.pitch = 1.08;

            fala.volume = 1;

            /* EVENTOS */

            fala.onstart = () => {

                console.log(
                    'FALA INICIADA'
                );

            };

            fala.onend = () => {

                console.log(
                    'FALA FINALIZADA'
                );

                resolve();

            };

            fala.onerror = (erro) => {

                console.log(
                    'ERRO:',
                    erro
                );

                resolve();

            };

            /* FALAR */

            speechSynthesis.speak(
                fala
            );

        }, 400);

    });

}

/* =========================================================
   FALAR CHAMADA
========================================================= */

async function falarChamada(
    senha,
    paciente,
    sala
) {

    const texto = `

        Atenção por favor.

        Senha ${senha}.

        Paciente ${paciente}.

        Favor dirigir-se à sala ${sala}.

    `;

    await falarTexto(
        texto
    );

}

/* =========================================================
   REPETIR CHAMADA
========================================================= */

async function anunciarSenha(atual) {

    /* PRIMEIRA CHAMADA */

    await tocarSom();

    await esperar(500);

    await falarChamada(
        atual.senha,
        atual.paciente,
        atual.sala
    );

    /* ESPERAR */

    await esperar(1500);

    /* REPETIR */

    await tocarSom();

    await esperar(500);

    await falarChamada(
        atual.senha,
        atual.paciente,
        atual.sala
    );

}

/* =========================================================
   RENDERIZAR FILA
========================================================= */

function renderizarFila() {

    tabelaFila.innerHTML = '';

    fila.forEach((item, posicao) => {

        if (posicao !== indice) {

            tabelaFila.innerHTML += `

                <tr>

                    <td>
                        ${item.senha}
                    </td>

                    <td>

                        <div class="prioridade">

                            <span class="bolinha ${item.cor}">

                            </span>

                            ${item.prioridade}

                        </div>

                    </td>

                    <td>
                        ${item.paciente}
                    </td>

                </tr>

            `;

        }

    });

}

/* =========================================================
   RENDERIZAR HISTÓRICO
========================================================= */

function renderizarChamadas() {

    listaChamadas.innerHTML = '';

    chamadas.forEach(item => {

        listaChamadas.innerHTML += `

            <div class="linha-chamada">

                <div class="chamada-esquerda">

                    <div class="senha-card">
                        ${item.senha}
                    </div>

                    <div class="paciente-card">
                        ${item.paciente}
                    </div>

                </div>

                <div class="chamada-direita">

                    <div class="sala-card">
                        Sala ${item.sala}
                    </div>

                    <div class="hora-card">
                        ${item.horario}
                    </div>

                </div>

            </div>

        `;

    });

}

/* =========================================================
   CHAMAR SENHA
========================================================= */

async function chamarSenha() {

    const atual =
        fila[indice];

    /* MOSTRAR */

    senhaAtual.innerHTML =
        atual.senha;

    salaAtual.innerHTML =
        `SALA ${atual.sala}`;

    pacienteAtual.innerHTML =
        atual.paciente;

    /* ANIMAÇÃO */

    senhaAtual.classList.add(
        'animacao'
    );

    setTimeout(() => {

        senhaAtual.classList.remove(
            'animacao'
        );

    }, 1200);

    /* HORÁRIO */

    const horario =
        new Date().toLocaleTimeString(
            'pt-BR',
            {
                hour: '2-digit',
                minute: '2-digit'
            }
        );

    /* HISTÓRICO */

    chamadas.unshift({

        senha: atual.senha,

        horario: horario,

        paciente: atual.paciente,

        sala: atual.sala

    });

    /* LIMITE */

    if (chamadas.length > 3) {

        chamadas.pop();

    }

    renderizarChamadas();

    renderizarFila();

    /* VOZ */

    await anunciarSenha(atual);

    /* PRÓXIMO */

    indice++;

    if (indice >= fila.length) {

        indice = 0;

    }

}

/* =========================================================
   LOOP AUTOMÁTICO
========================================================= */

async function iniciarPainel() {

    if (sistemaIniciado)
        return;

    sistemaIniciado = true;

    while (sistemaIniciado) {

        await chamarSenha();

        await esperar(15000);

    }

}

/* =========================================================
   ENCERRAR DASHBOARD
========================================================= */

function encerrarDashboard() {

    const confirmar = confirm(
        'Deseja realmente encerrar o dashboard?'
    );

    if (confirmar) {

        sistemaIniciado = false;

        speechSynthesis.cancel();

        window.location.href =
            'menu-principal.html';

    }

}

/* =========================================================
   INICIAR SISTEMA
========================================================= */

window.onload = async () => {

    /* CARREGAR VOZES */

    await carregarVozes();

    /* RENDERIZAR */

    renderizarFila();

    /* BOTÃO */

    const botao =
        document.createElement(
            'button'
        );

    botao.innerHTML =
        'INICIAR PAINEL';

    botao.style.position =
        'fixed';

    botao.style.top =
        '20px';

    botao.style.right =
        '20px';

    botao.style.zIndex =
        '9999';

    botao.style.padding =
        '16px 28px';

    botao.style.border =
        'none';

    botao.style.borderRadius =
        '12px';

    botao.style.background =
        '#0055c5';

    botao.style.color =
        '#fff';

    botao.style.fontSize =
        '18px';

    botao.style.fontWeight =
        'bold';

    botao.style.cursor =
        'pointer';

    botao.style.boxShadow =
        '0 4px 12px rgba(0,0,0,0.2)';

    document.body.appendChild(
        botao
    );

    /* CLIQUE */

    botao.addEventListener(
        'click',
        async () => {

            /* DESBLOQUEAR ÁUDIO */

            speechSynthesis.resume();

            /* AQUECER VOZ */

            const aquecer =
                new SpeechSynthesisUtterance('');

            aquecer.lang =
                'pt-BR';

            if (vozSelecionada) {

                aquecer.voice =
                    vozSelecionada;

            }

            speechSynthesis.speak(
                aquecer
            );

            await esperar(1000);

            /* REMOVER BOTÃO */

            botao.remove();

            /* INICIAR */

            iniciarPainel();

        }

    );

};