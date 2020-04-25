import Card from './card.js';

export default class MainPage {
  constructor() {
    this.group = 0;
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
      } else {i--}
    }
    return dataarr;
  }

  renderPage() {
    this.data.forEach(el=>{
      let card = new Card(el).renderCard();
      document.querySelector('.card-window').append(card);
    });
  }
}

