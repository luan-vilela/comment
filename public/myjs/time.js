var tempo = document.getElementById("time");

var desc = setInterval(myDesc, 1000);


function myDesc(){
    let num = Number.parseInt(tempo.innerHTML);
    tempo.innerHTML = --num;
    if(num == 0){
        clearInterval(desc);
        let btn = document.getElementById('btnComment');
        btn.classList.remove('disabled');  // remove class disabled do botão
    }
}

function submit(){
    let formCommit = document.getElementById('formComment');
    formCommit.submit();
}