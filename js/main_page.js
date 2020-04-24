import Card from './card.js';

export default class MainPage {
  constructor() {
    this.group = 0;
  }

  formData() {
    let dataarr = [];

    for (let i=0;i<=9; i++) {
      let randWord = Math.floor(Math.random()*20),
      randPage = Math.floor(Math.random()*30);

    }
    return dataarr;
  }

  renderPage() {

  }
}

