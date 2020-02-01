var tempo = document.getElementById("time");

var desc = setInterval(myDesc, 1000);

var dislike = document.getElementById('lbdislike');
var like = document.getElementById('lblike');

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

function checkWhisper(){
    let checkWhisper = document.getElementById('checkWhisper');
    let allComments = document.getElementById('allComments');
    if(checkWhisper.checked){
        allComments.style.display =  'flex'
    }
    else{
        allComments.style.display =  'none'
    }
}


function btnDisLike(){
    dislike.classList.remove('text-dark')
    dislike.classList.add('text-success')
    like.classList.remove('text-success')
    like.classList.add('text-dark')
}

function btnLike(){
    dislike.classList.remove('text-success')
    dislike.classList.add('text-dark')
    like.classList.remove('text-dark')
    like.classList.add('text-success')
}