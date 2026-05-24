const form = document.getElementById("cadastroForm");

form.addEventListener("submit", async function(event) {
    event.preventDefault();

    // Captura os dados exatamente pelos IDs que estão no HTML
    const dados = {
        nome: document.getElementById("nome").value.trim(),
        email: document.getElementById("email").value.trim(),
        tipoUsuario: document.getElementById("tipoUsuario").value,
        registro: document.getElementById("registro").value.trim(),
        novaSenha: document.getElementById("novaSenha").value.trim()
    };

    try {
        const response = await fetch('http://localhost:3000/api/cadastrar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });

        const data = await response.json();

        if (data.sucesso) {
            alert(data.mensagem);
            window.location.href = "login.html";
        } else {
            alert("Erro: " + data.mensagem);
        }
    } catch (error) {
        console.error("Erro na conexão:", error);
        alert("Erro ao conectar com o servidor. Verifique o backend!");
    }
});