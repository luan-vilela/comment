var tempo = document.getElementById("time");
var desc = setInterval(myDesc, 1000);
var dislike = document.getElementById('lbdislike');
var like = document.getElementById('lblike');
var ulWhisper = document.getElementById('ulWhisper');
let newWhisper = document.getElementById('whisper');

function whisper(){
    
    server('whisper', newWhisper.value);
    let newLi = '<li class="list-group-item">'+newWhisper.value+'</li>';
    document.getElementById('ulWhisper').innerHTML = document.getElementById('ulWhisper').innerHTML + newLi;

    newWhisper.value = '';
    newWhisper.focus();

}

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
        newWhisper.focus();
    }
    else{
        allComments.style.display =  'none'
    }
}


function btnDisLike(){
    server('dislike')
    dislike.classList.remove('text-dark')
    dislike.classList.add('text-success')
    like.classList.remove('text-success')
    like.classList.add('text-dark')
}

function btnLike(){
    server('like');
    dislike.classList.remove('text-success')
    dislike.classList.add('text-dark')
    like.classList.remove('text-dark')
    like.classList.add('text-success')
}
var string

function server(tipo, whispering)
{
    let id = document.getElementById('id').value;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET","http://localhost:3000/statuswhisper/"+tipo+"?id="+id+"&whisper="+whispering, true);
    xmlhttp.onreadystatechange=() => {
        if (xmlhttp.readyState==4 && xmlhttp.status==200){
          string=xmlhttp.responseText;
        }
    }
    xmlhttp.send();
}