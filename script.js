document.addEventListener('DOMContentLoaded', function () {
    // Cada constante armazena o elemento correspondente
    const instructions = document.getElementById('instructions');
    const part1 = document.getElementById('part1');
    const part2 = document.getElementById('part2');
    const result = document.getElementById('result');
    const temperamentDetails = document.getElementById('temperament-details');

    // Remover classe 'hidden' para tornar o elemento visível
    instructions.classList.remove('hidden');

    // Evento ao usuário clicar no botão, as instruções são ocultadas e a primeira parte do conteúdo é exibida.
    document.getElementById('start-part1').addEventListener('click', function () {
        instructions.classList.add('hidden');
        part1.classList.remove('hidden');
    });

    // Ao clicar no botão 'submit-part1', verifica se todas as perguntas foram respondidas
    document.getElementById('submit-part1').addEventListener('click', function () {
        if (allQuestionAnswered(1, 19)) {
            part1.classList.add('hidden');
            part2.classList.remove('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            alert('Por favor, responda todas as perguntas antes de continuar.');
        }
    });

    // Ao clicar no botão 'submit-part2', verifica se todas as perguntas foram respondidas
    document.getElementById('submit-part2').addEventListener('click', function () {
        if (allQuestionAnswered(20, 32)) {
            part2.classList.add('hidden');
            result.classList.remove('hidden');
            showResult();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            alert('Por favor, responda todas as perguntas antes de continuar.');
        }
    });

    // Função para verificar se todas as perguntas foram respondidas
    function allQuestionAnswered(start, end) {
        for (let i = start; i <= end; i++) {
            if (!document.querySelector(`input[name="q${i}"]:checked`)) {
                return false;
            }
        }
        return true;
    }

    // Função para exibir o resultado com base nas respostas
    function showResult() {
        let countA1 = 0, countB1 = 0;
        let countA2 = 0, countB2 = 0;

        // Verifica as respostas da Primeira Parte
        for (let i = 1; i <= 19; i++) {
            let answer = document.querySelector(`input[name="q${i}"]:checked`);
            if (answer && answer.value === 'A') {
                countA1++;
            } else if (answer && answer.value === 'B') {
                countB1++;
            }
        }

        // Verifica as respostas da Segunda Parte
        for (let i = 20; i <= 32; i++) {
            let answer = document.querySelector(`input[name="q${i}"]:checked`);
            if (answer && answer.value === 'A') {
                countA2++;
            } else if (answer && answer.value === 'B') {
                countB2++;
            }
        }

        // Determina o temperamento
        let temperament = '';

        if (countA1 > countB1 && countA2 > countB2) {
            temperament = 'Sanguíneo';
        } else if (countA1 > countB1 && countB2 > countA2) {
            temperament = 'Colérico';
        } else if (countB1 > countA1 && countA2 > countB2) {
            temperament = 'Fleumático';
        } else if (countB1 > countA1 && countB2 > countA2) {
            temperament = 'Melancólico';
        }

        // Exibe o resultado
        switch (temperament) {
            case 'Sanguíneo':
                temperamentDetails.innerHTML = '<h4 style="color: #EFE66C;">Você é Sanguíneo. = Quente e Úmido</h4> <p id="tipos"> Extrovertido e envolvente, voltado para os relacionamentos interpessoais...</p>';
                break;
            case 'Colérico':
                temperamentDetails.innerHTML = '<h4 style="color: #CF0E0E;">Colérico = Quente e Seco </h4> <p id="tipos"> Muito prático, voltado para a execução e realização...</p>';
                break;
            case 'Melancólico':
                temperamentDetails.innerHTML = '<h4 style="color: #1FCF65;">Melancólico = Frio e Seco </h4> <p id="tipos"> Introvertido, reflexivo e profundo, muito cauteloso em suas ações...</p>';
                break;
            case 'Fleumático':
                temperamentDetails.innerHTML = '<h4 style="color: #0094FF;">Fleumático = Frio e Úmido </h4> <p id="tipos"> Introvertido, diplomático e de fácil convivência...</p>';
                break;
            default:
                temperamentDetails.innerHTML = '<p>Temperamento não identificado.</p>';
                break;
        }
    }
});
