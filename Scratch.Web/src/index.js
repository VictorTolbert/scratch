import _ from 'lodash';
import printMe from './print.js';

import '../public/style.css';

import Icon from '../public/icon.svg';
import Data from '../public/data.xml';
import Notes from '../public/data.csv';


function component() {
  const element = document.createElement('div');
  const btn = document.createElement('button');

  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');

  // Add the image to our existing div.
  const myIcon = new Image();
  myIcon.src = Icon;

  element.appendChild(myIcon);

  console.log({Data});
  console.log({Notes});

  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;

  element.appendChild(btn);

  return element;
}

document.body.appendChild(component());
