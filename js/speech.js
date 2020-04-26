export default class Speech {
  constructor () {
    this.wordArr = [];
    this.rightWordArr = [];
  }

  start() {
    window.vars.play = true;
    window.vars.recognition = new SpeechRecognition();
    window.vars.recognition.lang = 'en-US';
    window.vars.recognition.interimResults = true;
    window.vars.recognition.addEventListener('result', this.micHandler);
    window.vars.recognition.start();
    window.vars.recognition.addEventListener('end', window.vars.recognition.start);
    console.log('Speech recognition started');
  }

  stop() {
    window.vars.play = false;
    if (window.vars.recognition) {
      window.vars.recognition.removeEventListener('result', this.micHandler);
      window.vars.recognition.removeEventListener('end', window.vars.recognition.start);
      window.vars.recognition.abort();
      console.log('Speech recognition stoped');
    }
  }

  micHandler (e) {
    let saying = [...e.results].map
    (res=>res[0]).map
    (result=>result.transcript)
    .join('');
    if (e.results[0].isFinal) {
      saying = saying.toLowerCase();
      document.querySelector('#translation').innerText = saying;
      Speech.checker(saying);
    }
  }

  static checker(saying) {
    if (window.vars.wordArr.includes(saying)) {
      let ind = window.vars.wordArr.indexOf(saying);
      let right = window.vars.wordArr.splice(ind,1);
      window.vars.rightArr.push(right[0]);
      Object.values(window.vars.cards).forEach(el=>{
        if (el.word.toLowerCase() === saying) {
          let url = `https://raw.githubusercontent.com/timurkalimullin/rslang/rslang-data/data/${el.image}`;
          document.querySelector('#image__wrapper').innerHTML = `<img src="${url}" alt="image">`
        }
      });

      document.querySelectorAll('p.word').forEach(el=>{
        if (el.innerText === saying) {
          el.closest('.card').classList.add('right-answer');
        }
      });
    }
  }

}
