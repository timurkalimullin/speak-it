export default class Card {
  constructor(data) {
    this.word = data.word;
    this.transcription = data.transcription;
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
    <p class="translation"></p>
    `;
    card.addEventListener('click', (event) => {
      if (!window.state.play) {
        document.querySelectorAll('.card').forEach((el) => {
          el.classList.remove('card__active');
        });
        card.classList.add('card__active');
        new Audio(this.audio).play();
        document.querySelector('#image__wrapper').innerHTML = `<img src="${this.image}" alt="">`;
      }
    });
    return card;
  }

}
