import Card from './js/card.js';
import MainPage from './js/main_page.js';
import Speech from './js/speech.js';

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
window.vars = {
  play: false,
  recognition: null,
  speech: null
};

let main = new MainPage();
main.renderPage();



document.body.addEventListener('click', (event)=>{
  if (event.target.closest('#start')) {
    window.vars.speech = new Speech();
    window.vars.speech.start();
  }
  if (event.target.closest('#stop')) {
    window.vars.speech.stop();
  }
});











