const form = document.getElementById('loginForm');

if(form){

form.addEventListener('submit', function(e){
    e.preventDefault();

    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;

    if(usuario === 'admin' && senha === '123'){
        window.location.href = 'dashboard.html';
    }else{
        alert('Usuário ou senha inválidos');
    }
});

}