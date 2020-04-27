import Card from './card.js';
import Speech from './speech.js';

export default class MainPage {
  constructor() {
    this.group = 0;
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
        if (window.vars.play === false) {
          window.vars.speech = new Speech();
          window.vars.speech.start();
          document.querySelectorAll('.card').forEach(card=>{
            card.classList.remove('active');
          });
        }
      }

      if (event.target.closest('#continue')) {
        if (window.vars.wordArr.length !== 0) {
          window.vars.speech = new Speech();
          window.vars.speech.start();
          document.querySelectorAll('.card').forEach(card=>{
            card.classList.remove('active');
          });

          document.querySelector('.result-modal').classList.add('hidden');
          document.querySelector('.main-page').classList.remove('hidden');
        } else {
          alert('Start new game, please');
        }
      }

      if (event.target.closest('#new-game')) {
        MainPage.writeStat();
        MainPage.clearPage();
        if ( window.vars.speech) {
          window.vars.speech.stop();
         }
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

      if (event.target.closest('#stat')) {
        if ( window.vars.speech) {
          window.vars.speech.stop();
         }
          MainPage.showStats();
          document.querySelector('.main-page').classList.add('hidden');
          document.querySelector('.stats-modal').classList.remove('hidden');
      }

      if (event.target.closest('#back')) {
        document.querySelector('.main-page').classList.remove('hidden');
        document.querySelector('.stats-modal').classList.add('hidden');
      }

      if (event.target.closest('#reset')) {
        MainPage.resetStats();
      }
    });

    document.querySelector('.level-bar').addEventListener('click', (event)=>{
      if (event.target.closest('.value')) {
        MainPage.writeStat();
        document.querySelectorAll('.value').forEach(el=>{
          el.classList.remove('active');
        });
        event.target.closest('.value').classList.add('active');
        let group = event.target.closest('.value').getAttribute('id').replace('level-', '');
        this.group = group-1;
        if (window.vars.speech) {
          window.vars.speech.stop();
        }
        MainPage.clearPage();
        this.renderPage();
      }
    });
  }

  static writeStat() {

    let obj = {};
    let date = new Date();
    obj.date = `${date}`;
    obj.guessed = window.vars.rightArr;
    obj.notGuessed = window.vars.wordArr;
    if (!window.localStorage.stats) {
      window.localStorage.setItem('stats', JSON.stringify(new Object));
      let temp = JSON.parse(window.localStorage.stats);
      temp[0] = obj;
      window.localStorage.stats = JSON.stringify(temp);
    } else {
      let temp = JSON.parse(window.localStorage.stats);
      let keyMAx = Math.max.apply(null, Object.keys(temp));
      temp[keyMAx+1] = obj;
      window.localStorage.stats = JSON.stringify(temp);
    }
  }

  static showStats() {
    if (window.localStorage.stats) {
      document.querySelector('.message').innerHTML = '';
      let obj = JSON.parse(window.localStorage.stats);
      Object.keys(obj).forEach(el=>{
        let message = `${el}:  ${obj[el].date} <br>  Guessed words: ${obj[el].guessed} <br> Not guessed words: ${obj[el].notGuessed}`;
        let p = document.createElement('p');
        p.innerHTML = `${message}`;
        document.querySelector('.message').append(p);
      });
    }
  }

  static resetStats() {
    if (window.localStorage.stats) {
      window.localStorage.removeItem('stats');
    }
    document.querySelector('.message').innerHTML = `No stats yet, sorry <br> Statistics will be created when you end this game and start new game`;
  }
}







