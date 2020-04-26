import Card from './card.js';
import Speech from './speech.js';

export default class MainPage {
  constructor() {
    this.group = 2;
  }

  formData() {
    let dataarr = [], temp;

    let randPage = Math.floor(Math.random()*30);
    let url = new URL(`https://afternoon-falls-25894.herokuapp.com/words?page=${randPage}&group=${this.group}`);

    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send();
    if (xhr.status != 200) {
      throw new Error('Network error');
    } else {
      temp = xhr.responseText;
      temp = JSON.parse(temp);
    }
    for (let i = 0; i<10; i++) {
      let randWord = Math.floor(Math.random()*20);
      if (!dataarr.includes(temp[randWord])) {
        dataarr.push(temp[randWord]);
      } else {i--;}
    }
    window.vars.cards = dataarr;
    return dataarr;
  }

  static pageWords() {
    window.vars.wordArr = [];
    window.vars.rightArr = [];
    const cardWords = document.querySelector('.main-page').querySelectorAll('.word');
    cardWords.forEach(el=>{
      window.vars.wordArr.push(el.innerText);
    });
  }

  renderPage() {
    this.data = this.formData();
    this.data.forEach(el=>{
      let card = new Card(el).renderCard();
      document.querySelector('.card-window').append(card);
    });
    document.querySelector('#image__wrapper').innerHTML = `<img src="assets/blank.jpg" alt="start-image">`;
    MainPage.pageWords();
  }

  static result() {
    document.querySelector('.main-page').classList.add('hidden');
    document.querySelector('.result-modal').classList.remove('hidden');

    document.querySelector('#h2_guessed').innerHTML = `Guessed words: <span>${window.vars.rightArr.length}</span>`;
    document.querySelector('#h2_not-guessed').innerHTML = `Not guessed words: <span>${window.vars.wordArr.length}</span>`;

    if (window.vars.speech) {
      window.vars.speech.stop();
    }
    document.querySelector('.guessed').innerHTML ='';
    document.querySelector('.not-guessed').innerHTML ='';

    document.querySelectorAll('.card').forEach(card=>{
      card.classList.remove('active');
    });

    Object.values(window.vars.cards).forEach(card=>{
      let resCard = new Card(card).renderCard();
      if (window.vars.rightArr.includes(card.word)) {
        document.querySelector('.guessed').append(resCard);
      } else {
        document.querySelector('.not-guessed').append(resCard);
      }
    });
  }

  static clearPage() {
    document.querySelector('.card-window').innerHTML = '';
    document.querySelector('#translation').innerHTML = '';
    window.vars.cards = null;
    window.vars.rightArr = [];
    window.vars.wordArr = [];
  }

  listeners() {
    document.body.addEventListener('click', (event)=>{
      if (event.target.closest('#goon')) {
        document.querySelector('.start-screen').classList.add('hidden');
        document.querySelector('.main-page').classList.remove('hidden');
      }
      if (event.target.closest('#start')) {
        window.vars.speech = new Speech();
        window.vars.speech.start();
        document.querySelectorAll('.card').forEach(card=>{
          card.classList.remove('active');
        });
      }

      if (event.target.closest('#continue')) {
        window.vars.speech = new Speech();
        window.vars.speech.start();
        document.querySelectorAll('.card').forEach(card=>{
          card.classList.remove('active');
        });

        document.querySelector('.result-modal').classList.add('hidden');
        document.querySelector('.main-page').classList.remove('hidden');
      }

      if (event.target.closest('#new-game')) {
        MainPage.clearPage();
        this.renderPage();
        document.querySelectorAll('.section').forEach(section=>{
          section.classList.add('hidden');
        });
        document.querySelector('.main-page').classList.remove('hidden');
      }

      if (event.target.closest('#stop')) {
       if ( window.vars.speech) {
        window.vars.speech.stop();
       }
      }

      if (event.target.closest('#result')) {
        MainPage.result();
      }
    });

    document.querySelector('.level-bar').addEventListener('click', (event)=>{
      if (event.target.closest('.value')) {
        document.querySelectorAll('.value').forEach(el=>{
          el.classList.remove('active');
        });
        event.target.closest('.value').classList.add('active');
        let group = event.target.closest('.value').getAttribute('id').replace('level-', '');
        this.group = group-1;
        MainPage.clearPage();
        this.renderPage();
      }
    });
  }
}

