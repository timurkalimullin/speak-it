export default class Card {
  constructor(data) {
    console.log(data)
    this.word = data.word;
    this.transcription = data.transcription;
    this.translation = data.wordTranslate;
    this.image = `https://raw.githubusercontent.com/timurkalimullin/rslang/rslang-data/data/${data.image}`;
    this.audio = `https://raw.githubusercontent.com/timurkalimullin/rslang/rslang-data/data/${data.audio}`;
  }

  renderCard() {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
    <img src="./assets/volume.svg" alt="audio-image">
    <p class="word">${this.word}</p>
    <p class="transcription">${this.transcription}</p>
    `;

    card.addEventListener('click', () => {
      if (!window.vars.play) {
        document.querySelectorAll('.card').forEach((el) => {
          el.classList.remove('active');
        });
        card.classList.add('active');
        new Audio(this.audio).play();
        document.querySelector('#image__wrapper').innerHTML = `<img src="${this.image}" alt="">`;
        document.querySelector('#translation').innerHTML = `${this.translation}`;
      }
    });
    return card;
  }

}
