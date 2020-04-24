import Card from './js/card.js';
import MainPage from './js/main_page.js';


window.state = {
  play: false
};

const main = new MainPage();


let book = fetch('https://github.com/timurkalimullin/rslang/blob/rslang-data/data/book1.json')
.then(res=>res.json)






