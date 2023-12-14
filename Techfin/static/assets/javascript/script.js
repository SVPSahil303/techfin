let submit = document.getElementById('submit');
let output = document.getElementById('output');


submit.addEventListener('click',()=>{
    submit.style.transform = "scale(0.95)";
    output.style.display = 'block';
    setTimeout(() => {
        submit.style.transform = "scale(1)";
    }, 150);
});





function set_img(){
    let fraud_msg = document.getElementById('fraud_msg');
    let legit_msg = document.getElementById('legit_msg');
    let image = document.getElementById('image');
    let predict = document.getElementById('predict');
    let fraud_audio = new Audio('/static/alert.mp3');
    let legit_audio = new Audio('/static/legit.mp3');

    if (predict.innerText == 'LEGIT TRANSACTION'){
        legit_msg.style.display = 'block';
        // setTimeout(() => {
        //     legit_msg.style.transform = 'rotateX(360deg)';
        // }, 1);
        predict.style.color = 'rgb(25,175,25)';
        predict.classList.add('green_wave');
        legit_audio.play();
    }
    else{
        fraud_msg.style.display = 'block';
        predict.style.color = 'rgb(175,25,25)';
        predict.classList.add('red_wave');
        fraud_audio.play();
    }
}


function backgroundTheme(){
    let body = document.querySelector('body');
    for(let i = 0;i<500;i++){
        let ele = document.createElement('pre');
        let posX = Math.floor(Math.random() * window.innerWidth);
                let delay = Math.random() * -20;
                let dura = (Math.random() * 3)+10;  
                let opacity = (Math.random()+ 0.5)* 0.25;
                ele.style.opacity = opacity;
                ele.style.left = posX + "px";
                ele.style.animationDelay = delay + "s";
                ele.style.animationDuration = dura + "s";
                if (i%2 == 0){ele.innerHTML = '0';}
                else {ele.innerHTML = '1';}
                body.appendChild(ele);
                }
        
    }
