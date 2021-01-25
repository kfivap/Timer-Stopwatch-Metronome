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

unpause.setAttribute('hidden', '')





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
    after_pause=false
    clearInterval(LoopInterval)
    timer_header.innerHTML='Время вышло'
    timer_run.innerHTML=" "
    setTimer.disabled = false
    resettimer.disabled= true
    document.getElementById('quick_time_div').removeAttribute('hidden', 'hidden')
    playSound('audio.mp3')  
    unpause.setAttribute('hidden', '')
    pause.removeAttribute('hidden', '')
    pause.disabled= true

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


  unpause.setAttribute('hidden', '')
pause.removeAttribute('hidden', '')
})




pause.addEventListener('click', function(){
  clearInterval(LoopInterval)
  resettimer.disabled= false
  setTimer.disabled = false

  unpause.disabled= false
  pause.disabled=true

  after_pause=true
  addtimer.disabled= true
  pause.setAttribute('hidden', '')
  unpause.removeAttribute('hidden', '')

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

  unpause.setAttribute('hidden', '')
  pause.removeAttribute('hidden', '')

  

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






//document.getElementById('Stopwatch_start').innerHTML=Stopwatch()
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




let start = Date.now()
let duration

function Stopwatch(start,){

  let i =  Date.now()

  duration=i-start
  //console.log(duration)
  return msToTime( duration)
  
}

let Stopwatch_run


let Stopwatch_start_button =document.getElementById('Stopwatch_start_button')
Stopwatch_start_button.addEventListener(
  'click', function(){
    Stopwatch_start_button.disabled=true
    Stopwatch_pause_button.disabled=false
    Stopwatch_stop_button.disabled=false
    Stopwatch_round_button.disabled=false

    start = Date.now();
    Stopwatch(start)
   Stopwatch_run = setInterval(function(){
    document.getElementById('Stopwatch_start').innerHTML=Stopwatch(start)
  }, 100)

    })

let Stopwatch_pause_button =document.getElementById('Stopwatch_pause_button')

Stopwatch_pause_button.addEventListener('click',function(){
  clearInterval(Stopwatch_run)
  Stopwatch_pause_button.disabled=true
  Stopwatch_unpause_button.disabled=false
  Stopwatch_unpause_button.removeAttribute('hidden', '')
  Stopwatch_pause_button.setAttribute('hidden', '')
 
}
  )

let Stopwatch_unpause_button =document.getElementById('Stopwatch_unpause_button')
Stopwatch_unpause_button.addEventListener('click',function(){
  
  start = Date.now()-duration


   Stopwatch_run = setInterval(function(){
    document.getElementById('Stopwatch_start').innerHTML=Stopwatch(start)
  }, 100)
   Stopwatch_unpause_button.disabled=true
   Stopwatch_pause_button.disabled=false
   Stopwatch_pause_button.removeAttribute('hidden', '')
  Stopwatch_unpause_button.setAttribute('hidden', '')


}
  )


let Stopwatch_stop_button =document.getElementById('Stopwatch_stop_button')

Stopwatch_stop_button.addEventListener(
  'click', function(){clearInterval(Stopwatch_run)
    Stopwatch_start_button.disabled=false
    Stopwatch_pause_button.disabled=true
Stopwatch_unpause_button.disabled=true
Stopwatch_stop_button.disabled=true
Stopwatch_pause_button.removeAttribute('hidden', '')
 Stopwatch_unpause_button.setAttribute('hidden', '')
 document.getElementById('Stopwatch_start').innerHTML="00:00:00.0"
 previous_duration=0
 document.getElementById('Stopwatch_round').innerHTML=''
 duration=0
 round_counter=0
 Stopwatch_round_button.disabled=true
  })


Stopwatch_pause_button.disabled=true
Stopwatch_unpause_button.disabled=true
Stopwatch_stop_button.disabled=true
Stopwatch_unpause_button.setAttribute('hidden', '')



let Stopwatch_round_button=document.getElementById('Stopwatch_round_button')

Stopwatch_round_button.disabled=true

let round_counter=0

let previous_duration=0
Stopwatch_round_button.addEventListener('click', function(){

  let round_duration=duration- previous_duration
  previous_duration=duration
  document.getElementById('Stopwatch_round').innerHTML+=
  `<br>
  ${++round_counter} круг :
  +${msToTime(round_duration)} / Total
  ${msToTime(duration)}
  `
  
console.log(duration)
})