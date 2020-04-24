import Card from './card.js';

export default class MainPage {
  constructor() {
    this.group = 0;
    this.data = this.formData();
  }

  formData() {
    let dataarr = [];

    let randPage = Math.floor(Math.random()*30);
    const getWords = async (page, group) => {
      const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`;
      const res = await fetch(url);
      const json = await res.json();
      localStorage.temp =  await(JSON.stringify(json));
    };
    getWords(randPage, this.group);
    let temp = JSON.parse(localStorage.temp);

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

