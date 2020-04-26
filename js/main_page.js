import Card from './card.js';
import Speech from './speech.js';

export default class MainPage {
  constructor() {
    this.group = 2;
    this.data = this.formData();
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
    const cardWords = document.querySelectorAll('.word');
    cardWords.forEach(el=>{
      window.vars.wordArr.push(el.innerText);
    });
  }

  renderPage() {
    this.data.forEach(el=>{
      let card = new Card(el).renderCard();
      document.querySelector('.card-window').append(card);
    });
    MainPage.pageWords();
  }

  listeners() {
    document.body.addEventListener('click', (event)=>{
      if (event.target.closest('#start')) {
        window.vars.speech = new Speech();
        window.vars.speech.start();
        document.querySelectorAll('.card').forEach(card=>{
          card.classList.remove('active');
        });
      }

      if (event.target.closest('#stop')) {
        window.vars.speech.stop();
      }

      if (event.target.closest('#result')) {
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
    });
  }
}

