import MainPage from './js/main_page.js';


window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
window.vars = {
  play: false,
  recognition: null,
  speech: null,
  wordArr: [],
  rightArr: []
};

let main = new MainPage();
main.renderPage();
main.listeners();




















