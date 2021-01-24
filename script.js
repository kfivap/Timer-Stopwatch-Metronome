'use strict';



console.log(new Date())



const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


function print_time(time){
  //let time = new Date()

  let printed_time=`
${time.getDate()} 
  ${monthNames[time.getMonth()]} 
  ${time.getFullYear() },
${("0" + time.getHours()).slice(-2)}:${
  ("0" + time.getMinutes()).slice(-2)}:${
    ("0" + time.getSeconds()).slice(-2)}

  `
//document.getElementById('curtime').innerHTML = printed_time
 return printed_time
}

let resettimer = document.getElementById('resettimer')

let unpause = document.getElementById('unpause')
let pause = document.getElementById('pause')







function update_html_time(){
  document.getElementById('curtime').innerHTML = print_time(new Date())
}

update_html_time()

setInterval(function(){
  update_html_time(new Date())}, 1000)



let time_now
let difference
let end


let after_pause= false




function setTimerNew(){

//установка
let minutes, seconds, hours
if (after_pause==false){
hours = parseInt(document.getElementById('timer_hours').value)
minutes = parseInt(document.getElementById('timer_minutes').value)
seconds = parseInt(document.getElementById('timer_seconds').value)
}




//проверки
if (Number.isNaN(hours)){hours=0}
if (Number.isNaN(minutes)){minutes=0}
if (Number.isNaN(seconds)){ seconds=0}

if (seconds>59 || minutes>59 || hours>23){
  alert ('внимание! вы ввели более 59 секунд или минут! ')
  return
}
if(seconds==0 && minutes==0 && hours==0){
  alert('таймер не может быть нулевым')
  return
}


 

//конец таймера
if (after_pause== false){
 end = Date.now()+(((hours*3600)+(minutes*60)+seconds)*1000)

 console.log('s nulya')
}
if(after_pause==true){
end = Date.now()+difference
console.log('s pausi')
}



// расчет конца таймера 
let time_now = Date.now()
difference =  (end - time_now)/1000 
let dt = new Date();
dt.setSeconds( dt.getSeconds() + difference );
//console.log(dt)

//конец таймер в html
let esperating_time=document.getElementById('esperating_time')
esperating_time.innerHTML=`
Таймер запущен ${print_time(new Date()) }
<br>
Таймер остановится   ${print_time(new Date(dt))}`


//блокировка кнопок
setTimer.disabled = true



//


function msToTime(duration) {
  let milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}
//reset

pause.disabled= false

resettimer.disabled= false
unpause.disabled= true


let html_timer= document.getElementById('html_timer')

//функция
  function Loop(){
  time_now = Date.now()

  //проверка на конец таймера
  difference =  end - time_now 

  if(difference<0){

    clearInterval(LoopInterval)
    timer_header.innerHTML='Время вышло'
    timer_run.innerHTML=" "
    setTimer.disabled = false
    resettimer.disabled= true
    document.getElementById('quick_time_div').removeAttribute('hidden', 'hidden')
    playSound('audio.mp3')  

    return
  }
  
 ;
document.getElementById('html_timer').innerHTML=msToTime(difference)
  

//console.log(time_now, difference)
}


// заголовок
let timer_header= document.getElementById('timer_header')
let timer_run = document.getElementById('timer_run')

timer_header.innerHTML='Таймер запущен'


 
//таймер запущен

timer_run.innerHTML = 'Оставшееся время <span id="html_timer"></span>'
//html таймер


//запуск
Loop()
let LoopInterval = setInterval(Loop,100)

//спрятать быстрое время
document.getElementById('quick_time_div').setAttribute('hidden', 'hidden')


resettimer.addEventListener('click', function(){
  clearInterval(LoopInterval)
  resettimer.disabled= true
  setTimer.disabled = false
  timer_header.innerHTML='Таймер сброшен'
  esperating_time.innerHTML=''
  timer_run.innerHTML = ''
  after_pause=false
  pause.disabled=true
  unpause.disabled=true
  document.getElementById('quick_time_div').removeAttribute('hidden', 'hidden')


})




pause.addEventListener('click', function(){
  clearInterval(LoopInterval)
  resettimer.disabled= false
  setTimer.disabled = false

  unpause.disabled= false
  pause.disabled=true

  after_pause=true
  addtimer.disabled= true

  timer_header.innerHTML='Таймер остановлен' 
  return})









}///главная скобочка

unpause.addEventListener('click', function(){
  //clearInterval(LoopInterval)
  resettimer.disabled= true
  setTimer.disabled = false

  //unpause.disabled= false
  pause.disabled=false

  setTimerNew()

  unpause.disabled= true


  

  timer_header.innerHTML='Таймер остановлен'})



let setTimer = document.getElementById('addtimer')
setTimer.addEventListener('click', setTimerNew)






/////

//let minutes = document.getElementById('timer_minutes'.value)
let seconds = (document.getElementById('timer_seconds').value)


function quick_time(min, sec, hours=0){
  document.getElementById('timer_seconds').value = sec
  document.getElementById('timer_minutes').value = min
  document.getElementById('timer_hours').value = hours
  setTimer.click()
}


document.getElementById('quick_time_30s').addEventListener('click',
function(){quick_time(0,30)} )


document.getElementById('quick_time_1m').addEventListener('click',
function(){quick_time(1,0)}
 )

document.getElementById('quick_time_5m').addEventListener('click',
function(){quick_time(5,0)} )

document.getElementById('quick_time_15m').addEventListener('click',
function(){quick_time(15,0)})

document.getElementById('quick_time_30m').addEventListener('click',
function(){quick_time(30,0)} )

document.getElementById('quick_time_1h').addEventListener('click',
function(){quick_time(0,0,1)} )




function playSound(url) {
  const audio = new Audio(url);
  audio.play();
}

/*
for(let i=0; i<60; i++){
  //console.log(i)
  document.getElementById('select_seconds').innerHTML
  +=`<option>${i}</option>`
  document.getElementById('select_minutes').innerHTML
  +=`<option>${i}</option>`
}
*/