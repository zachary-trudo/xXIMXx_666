function init(){
    var busLoginBtn = document.getElementById('busLogin');
    var gameLoginBtn = document.getElementById('gameLogin');

    busLoginBtn.onclick = login;
    gameLoginBtn.onclick = login;
}

function login() {
    window.location.href = "chatApp.html";
}

window.onload = init;
