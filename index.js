// Nav //
const tabs = document.querySelectorAll('.link');
const all_content = document.querySelectorAll('.content');
const add = document.querySelector('.btn_add');

tabs.forEach((tab, index) =>{
    tab.addEventListener('click', ()=>{
        if (tab.classList.contains("nav-a")) {
            add.classList.add('active');
        } else {
            add.classList.remove('active');
        }

        tabs.forEach(tab=>{tab.classList.remove('active')});
        tab.classList.add('active');

        all_content.forEach(content=>{content.classList.remove('active')});
        all_content[index].classList.add('active');
    })
})


// Relógio //
function clock(){
    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const dayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    const today = new Date();
    document.getElementById('date').innerHTML = (dayNames[today.getDay()] + ", " + today.getDate() + ' ' + monthNames[today.getMonth()] + ' de ' + today.getFullYear());

    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds(); 

    h = h<10? '0'+h: h;
    m = m<10? '0'+m: m;
    s = s<10? '0'+s: s;

    document.getElementById('hour-clock').innerHTML = h;
    document.getElementById('minute-clock').innerHTML = m;
    document.getElementById('second-clock').innerHTML = s;
    
}const inter = setInterval(clock,400);


// Alarme //
const now = new Date();
const hours = now.getHours();
const minutes = now.getMinutes();
let alarmRinging = false;
const audio = new Audio("alarm.mp3");

function setAlarm() {
    //add trailing zeros
    let minutesString = minutes.toString();
    if (minutesString.length < 2) {
      minutesString = "0" + minutesString;
    }
    let hoursString = hours.toString();
    if (minutesString.length < 2) {
      hoursString = "0" + hoursString;
    }
  
    alarms.forEach((alarm) => {
      if (
        alarm.time == `${hoursString}:${minutesString}` &&
        alarm.active &&
        alarmRinging === false
      )
        //if all conditon match
        ringAlarm();
    });
  }
  
  function ringAlarm() {
    alarmRinging = true;
    audio.play();
    audio.addEventListener("ended", () => {
        alarmRinging = false;
    });
  }

const addBtn = document.getElementById("add");
const cancelBtn = document.getElementById("btn-cancel");
const saveBtn = document.getElementById("btn-save");
const modal = document.getElementById("add-alarm-modal");

function modalActive () {
    modal.classList.add('active');
}

function modalInactive () {
    modal.classList.remove('active');
}

function newAlarm() {
    const inputHour = document.getElementById('hour-alarm');
    const inputMinute = document.getElementById('minute-alarm');

    const hour = inputHour.value;
    const minute = inputMinute.value;
    const time = `${hour}:${minute}`;

    modal.classList.remove('active');

    if (alarms.length == 0) {
        alarms.push({
            id : 1,
            time: `${time}`,
            active: true,
        });
    } else {
        alarms.push({
            id : ((alarms.length) + 1),
            time: `${time}`,
            active: true,
        });
    }

    updateAlarm();
    setAlarm();
}

saveBtn.addEventListener('click', newAlarm); // Adiciona o novo alarm
cancelBtn.addEventListener('click', modalInactive); // cancela o modal
addBtn.addEventListener('click', modalActive); // ativa o modal ao clicar em +

const alarms = []; // lista de alarms

const alarmList = document.querySelector(".alarms");
const noAlarms = document.querySelector(".no-alarms");

function initAlarms() { // Alarme default
    if (alarmList.length == null) {
        noAlarms.innerHTML = `
        <div class="alarm-default"> 
            <i class="fa-solid fa-clock"></i>
            <h4 class="alarm_default">Nenhum Alarme</h4>
        </div>
        `
    }
}

initAlarms();

function removeElementsByClass(className) {
    let elements = document.getElementsByClassName(className);
    while(elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
}

function updateAlarm() {
    if (alarms.length) {
        removeElementsByClass('alarm');
        alarms.forEach((alarm) => {
            noAlarms.style.display = "none";
    
            alarmList.classList.add("active");
            const alarmElement = document.createElement("div");
            alarmElement.classList.add("alarm");
            alarmElement.dataset.id = alarm.id;
    
            active =  alarm.active ? "checked" : "";
    
            alarmElement.innerHTML = ` 
                <div class="delete">
                    <i class="fa-solid fa-circle-xmark"></i>
                </div>
                <div class="alarm_display">
                    <span id="alarm-display">${alarm.time}</span>
                </div>
                <div class="toggle">
                    <input type="checkbox" class="checkbox" ${active}/>
                    <div class="on" id="on">
                        <i class="fa-solid fa-toggle-on"></i>
                    </div>
                    <div class="off" id="off">
                        <i class="fa-solid fa-toggle-off"></i>
                    </div>
                </div>
            `;
    
            alarmList.appendChild(alarmElement);
        });
    } else {
        alarmList.classList.remove("active");
        noAlarms.style.display = "flex";
        initAlarms();
    }
}


// funcionalidade de deletar alarm
alarmList.addEventListener("click", (e) => {
    if (e.target.classList.contains("checkbox")) {
      const alarmId =
        e.target.parentElement.parentElement.dataset
          .id;
      const alarm = alarms.find((alarm) => alarm.id == alarmId);
      alarm.active = !alarm.active;
      if (!alarm.active) {
        audio.pause();
      }
    }
    if (e.target.classList.contains("fa-circle-xmark")) {
      const alarmId = e.target.parentElement.dataset.id;
      const alarm = alarms.find((alarm) => alarm.id == alarmId);
      alarms.splice(alarms.indexOf(alarm), 1);
      alarmList.innerHTML = "";
      updateAlarm();
      audio.pause();
    }
});


// Cronômetro //
let timerStopwatch = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;

function startClock() {
    if(!isRunning){
        startTime = Date.now() - elapsedTime; //Tempo inicial é igual o horário de agora - o tempo decorrido;
        timerStopwatch = setInterval(updateClock, 65); //Cria um intervalo de atualização a cada 1000 milissegundos;
        isRunning = true;
    }
}

function stopClock() {
    clearInterval(timerStopwatch); //Remove o intervalo do de atualização;
    elapsedTime = Date.now() - startTime; //Redefine o tempo decorrido para o horário de agora - o horário de início;
    isRunning = false;
}

function resetClock() {
    clearInterval(timerStopwatch); //Remove o intervalo do de atualização;
    startTime = 0; //Redefine o tempo inicial para 0;
    isRunning = false;
    document.getElementById('minute-sw').innerHTML = "00";
    document.getElementById('second-sw').innerHTML = "00";
    document.getElementById('millisecond-sw').innerHTML = "00"; //Atualiza o texto do HTML;
}

function updateClock(){
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime; //Tempo decorrido é igual o horário de agora - o tempo inicial;

    let minutes = Math.floor(elapsedTime / (1000 * 60) % 60); //Conversor do tempo decorrido para minuto;
    let seconds = Math.floor(elapsedTime / 1000 % 60); //Conversor do tempo decorrido para segundo;
    let milliseconds = Math.floor(elapsedTime % 100);//Conversor do tempo decorrido para milessegundos;

    minutes = String(minutes).padStart(2, "0"); //Converte as variáveis hours, minutes e seconds em String e preenchem com um 0 quando não existe decimal;
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");

    document.getElementById('minute-sw').innerHTML = minutes;
    document.getElementById('second-sw').innerHTML = seconds;
    document.getElementById('millisecond-sw').innerHTML = milliseconds; //Formato que os elementos são setados;
}


// Timer //
const btnStart = document.getElementById('btn-start');
const btnStop = document.getElementById('btn-stop');
const btnReset = document.getElementById('btn-reset');

const input = document.getElementById('input-timer');
const display = document.getElementById('display-timer');

let interval;
let tempo = 0; // Segundos setado inicialmente
let tempoRestante = 0; // Segundos restantes de cada decremento
let isPaused = false;

function inputSeconds() { // Pega o valor colocado no input e converte para segundos
    const hours = document.getElementById('hour-timer');
    const minutes = document.getElementById('minute-timer');
    const seconds = document.getElementById('second-timer');
  
    tempo = (parseInt(hours.value) * 60 * 60) + (parseInt(minutes.value) * 60) + parseInt(seconds.value);
}

function setSeconds(tempo) { // Converte o tempo em segundos para horas, minutos e segundos e coloca na tela
    let tempoRestante =  tempo;
    let hours, minutes, seconds;

    hours = Math.floor((tempoRestante / 60) / 60); 
    minutes = Math.floor(tempoRestante / 60 - (hours * 60)); 
    seconds = Math.floor(tempoRestante % 60); 

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    document.getElementById('hour-tm').innerHTML = hours;
    document.getElementById('minute-tm').innerHTML = minutes;
    document.getElementById('second-tm').innerHTML = seconds;
}

function startTimer() {
    if (isPaused == true) {
        tempo = tempoRestante;
        interval = setInterval(() => {
            tempoRestante = tempo--;
            console.log(tempoRestante);
            setSeconds(tempoRestante);
    
            if (tempoRestante === 0) {
              clearInterval(interval);
              tempo = 0;
              display.classList.remove('active');
              input.classList.remove('inactive');
            }
        }, 1000);
    } else {
        display.classList.add('active');
        input.classList.add('inactive');

        inputSeconds();
        interval = setInterval(() => {
            tempoRestante = tempo--;
            console.log(tempoRestante);
            setSeconds(tempoRestante);

            if (tempoRestante === 0) {
            clearInterval(interval);
            tempo = 0;
            display.classList.remove('active');
            input.classList.remove('inactive');
            }
        }, 1000);
    }
}

function stopTimer() { // Parar o contador (intervalo) e pegar o tempo que sobrou
    clearInterval(interval);
    isPaused = true;
}

function resetTimer() {
    clearInterval(interval);
    display.classList.remove('active');
    input.classList.remove('inactive');
    tempoRestante = 0;
    setSeconds(tempoRestante);
}

btnStart.addEventListener('click', startTimer);
btnStop.addEventListener('click', stopTimer);
btnReset.addEventListener('click', resetTimer);