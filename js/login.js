const form = document.getElementById("loginForm");

form.addEventListener("submit", async function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();

    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Bem-vindo, " + data.usuario.nome + "!");
            window.location.href = "menu-principal.html";
        } else {
            alert(data.mensagem || "Erro ao fazer login");
        }
    } catch (error) {
        console.error("Erro:", error);
        alert("Erro ao conectar com o servidor. Verifique se o backend está rodando!");
    }
});