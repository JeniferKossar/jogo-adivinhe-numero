document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('consultaForm');

    // Se o formulário não existir na página, não faz nada.
    if (!form) {
        return;
    }

    // Pega todos os campos e spans de erro
    const nome = document.getElementById('nome');
    const email = document.getElementById('email');
    const profissional = document.getElementById('profissional');
    const tipoConsulta = document.getElementById('tipoConsulta');
    const dataConsulta = document.getElementById('dataConsulta');
    const horarioConsulta = document.getElementById('horarioConsulta');
    
    const nomeError = document.getElementById('nomeError');
    const emailError = document.getElementById('emailError');
    const profissionalError = document.getElementById('profissionalError');
    const tipoConsultaError = document.getElementById('tipoConsultaError');
    const dataConsultaError = document.getElementById('dataConsultaError');
    const horarioConsultaError = document.getElementById('horarioConsultaError');

    // Adiciona o evento de 'submit' ao formulário
    form.addEventListener('submit', function(event) {
        // Impede o envio padrão do formulário para podermos validar primeiro
        event.preventDefault();

        // Reseta as mensagens de erro
        resetErrors();

        let isValid = true;

        // 1. Validação do Nome
        if (nome.value.trim() === '') {
            showError(nomeError, 'O campo Nome Completo é obrigatório.');
            isValid = false;
        }

        // 2. Validação do E-mail
        if (email.value.trim() === '') {
            showError(emailError, 'O campo E-mail é obrigatório.');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showError(emailError, 'Por favor, insira um formato de e-mail válido (ex: seuemail@dominio.com).');
            isValid = false;
        }

        // 3. Validação do Profissional
        if (profissional.value === '') {
            showError(profissionalError, 'Por favor, escolha um profissional.');
            isValid = false;
        }

        // 4. Validação do Tipo de Consulta
        if (tipoConsulta.value === '') {
            showError(tipoConsultaError, 'Por favor, escolha o tipo de consulta.');
            isValid = false;
        }

        // 5. Validação da Data
        if (dataConsulta.value === '') {
            showError(dataConsultaError, 'O campo Data Desejada é obrigatório.');
            isValid = false;
        } else if (isDateInPast(dataConsulta.value)) {
            showError(dataConsultaError, 'A data da consulta não pode ser no passado.');
            isValid = false;
        }

        // 6. Validação do Horário
        if (horarioConsulta.value === '') {
            showError(horarioConsultaError, 'O campo Horário Preferencial é obrigatório.');
            isValid = false;
        }

        // Se tudo for válido, envia o formulário
        if (isValid) {
            form.submit();
        }
    });

    // --- FUNÇÕES AUXILIARES ---

    // Função para mostrar a mensagem de erro
    function showError(errorElement, message) {
        errorElement.textContent = message;
    }

    // Função para limpar todas as mensagens de erro
    function resetErrors() {
        nomeError.textContent = '';
        emailError.textContent = '';
        profissionalError.textContent = '';
        tipoConsultaError.textContent = '';
        dataConsultaError.textContent = '';
        horarioConsultaError.textContent = '';
    }

    // Função para validar o formato do e-mail usando uma expressão regular simples
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Função para verificar se a data selecionada está no passado
    function isDateInPast(dateString) {
        const selectedDate = new Date(dateString + 'T00:00:00'); // Adiciona T00:00:00 para evitar problemas de fuso horário
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Zera o horário do dia atual para comparar apenas a data

        return selectedDate < today;
    }
});