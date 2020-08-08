
const start = document.querySelector('.start-section .start-area .start')
const startSection = document.querySelector('.start-section')
const mainControl = document.querySelector('.control-container')
const feedBack = document.querySelector('.switch p:first-child')
const backTrack = document.querySelector('.switch p:last-child')
const contentSection = document.querySelector('.content-section')
const fullScreen = document.querySelector('.full-screen')
const back = document.querySelector('.go-back')
const buttons = document.querySelector('.button-group')
const aboutButton = document.querySelector('.about-button')
const aboutSection = document.querySelector('.about-section')
const closeButton = document.querySelector('.close-button span')
const blocks = document.querySelectorAll('.block')
const bgaudio = document.querySelector("audio[data-name='bg']")
const clear = clearInterval()



let pressed = false
let clickNum = 0
let moveNum = 0
let full = false
let switching = false
let interval



fullScreen.addEventListener('click',function(){
  if(full){
    document.exitFullscreen()
    full = false
  }else{
    document.documentElement.requestFullscreen()
    full = true
  }  
})

back.addEventListener('click',function(e){
  mainControl.style.display = 'none'
  startSection.style.display = 'block'
  bgaudio.pause();
  bgaudio.currentTime=0
})

start.addEventListener('click',function(){
  startSection.style.display = 'none'
  mainControl.style.display = 'block'
  bgaudio.loop = true
  bgaudio.play()
})

aboutButton.addEventListener('click',function(){
  startSection.classList.add('close')
  aboutSection.classList.add('open')
})
closeButton.addEventListener('click',function(){
  startSection.classList.remove('close')
  aboutSection.classList.remove('open')
})


feedBack.addEventListener('click',function(){
  if (switching){
    this.childNodes[1].textContent = 'ON'
    blocks.forEach((block)=>{
      block.removeAttribute('style')
    })
    switching = false
  }else{
    this.childNodes[1].textContent = 'OFF'
    blocks.forEach((block)=>{
      block.style.backgroundColor='transparent'
    })
    switching =true
  }
})
backTrack.addEventListener('click',function(){
  if (switching){
    this.childNodes[1].textContent = 'ON'
    bgaudio.play()
    switching = false
  }else{
    this.childNodes[1].textContent = 'OFF'
    bgaudio.pause()
    switching =true
  }
})


function downhandler(e) {
  let name = e.target.dataset.name
  const audio = document.querySelector(`audio[data-name="${name}"]`)
  e.preventDefault()
  pressed = true
  // console.log(e)
  e.target.classList.add('block-active')

  if(!audio)return
  audio.currentTime = 0
  audio.play();
  clickNum = clickNum + 1
  if(pressed === true){
    controlNone()
  }
  clearInterval(interval)    

  if (clickNum == 5){
  function random_bg_color() {
    let x = Math.floor(Math.random() * 256);
    let y = Math.floor(Math.random() * 256);
    let z = Math.floor(Math.random() * 256);
    let bgColor = "rgb(" + x + "," + y + "," + z + ")";
    document.body.style.background = bgColor;
    }
    random_bg_color();
    clickNum = 0
  }
}

function movehandler(e) {
  let name = e.target.dataset.name
  const audio = document.querySelector(`audio[data-name="${name}"]`)
  if (pressed === true){
    e.target.classList.add('block-active')
    if(!audio)return
    audio.currentTime = 0
    audio.play();

    mainControl.style.display = 'none'
    buttons.classList.add('close')

    moveNum = moveNum + 1 
    if (moveNum == 20){
      function random_bg_color() {
        let x = Math.floor(Math.random() * 256);
        let y = Math.floor(Math.random() * 256);
        let z = Math.floor(Math.random() * 256);
        let bgColor = "rgb(" + x + "," + y + "," + z + ")";
        document.body.style.background = bgColor;
      }
      random_bg_color();
      moveNum = 0
    }

    // if (interval ==="function"){
    //   interval()
    // }

  }
   
      
  // console.log(e)
  // console.log(pressed)
}
function leavehandler(e){
  if(Array.from(e.target.classList).indexOf('block-active') !== -1){
    e.target.classList.remove('block-active')
    // audio.pause();
  }
}

function uphandler(e) {
  let name = e.target.dataset.name
  const audio = document.querySelector(`audio[data-name="${name}"]`)
  if (pressed === true){
    if(!audio)return
    audio.currentTime = 0
    audio.play();
    e.target.classList.remove('block-active')
    pressed = false
    interval = setInterval(function() {
      mainControl.style.display = 'block'
      buttons.classList.remove('close')
    },3000)
  }
}

const controlNone = function(){
  mainControl.style.display = 'none'
  buttons.classList.add('close')
  // console.log(timeout)
  // console.log(typeof timeout)
}


blocks.forEach(block => {
  block.addEventListener('mousedown',downhandler)
  block.addEventListener('mouseup', uphandler)
  block.addEventListener('mouseover',movehandler)
  block.addEventListener('mouseleave',leavehandler)
  // block.addEventListener('transitionend',remover)
})

// function remover(e) {
    //   console.log(e)
    //   if (e.propertyName == 'background-color'){
    //   this.classList.remove('block-active')
    //   }
    // }