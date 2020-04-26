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
    let translation;
    async function getTranslation (word) {
      const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200423T141800Z.a13d7b3458025d70.13846b8c77630bf3379bbfeeb09d689a22a6605d&text= ${word} &lang=en-ru`;
      const res = await fetch(url);
      const data = await res.json();
      const dataStr = await JSON.stringify(data);
      card.querySelector('.translation').innerText = `${JSON.parse(dataStr).text}`;
      translation = `${JSON.parse(dataStr).text}`;
    }
    getTranslation(this.word);

    card.addEventListener('click', (event) => {
      if (!window.vars.play) {
        document.querySelectorAll('.card').forEach((el) => {
          el.classList.remove('active');
        });
        card.classList.add('active');
        new Audio(this.audio).play();
        document.querySelector('#image__wrapper').innerHTML = `<img src="${this.image}" alt="">`;
        document.querySelector('#translation').innerHTML = `${translation}`;
      }
    });
    return card;
  }

}
