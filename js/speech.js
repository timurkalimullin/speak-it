export default class Speech {
  constructor () {
  }

  start() {
    window.vars.recognition = new SpeechRecognition();
    window.vars.recognition.lang = 'en-US';
    window.vars.recognition.interimResults = true;
    window.vars.recognition.addEventListener('result', this.micHandler);
    window.vars.recognition.start();
    window.vars.recognition.addEventListener('end', window.vars.recognition.start);
    console.log('Speech recognition started');
  }

  stop() {
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
      document.querySelector('#translation').innerText = saying;
    }
  }
}
