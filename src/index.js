// import _ from 'lodash'
import { wordsToSentence } from './utils/utils'
import './index.css'
import './index.scss'
import Icon from './img/icon.png'
import numRef from './document/ref.json'
import Data from './document/data.xml'
var el = document.createElement('div')
el.id = 'app'
var myIcon = new Image()
myIcon.src = Icon
myIcon.id = 'img'
el.appendChild(myIcon)
var text = document.createTextNode(
    wordsToSentence('Welcome', 'to', 'my', 'app!')
)
el.appendChild(text)
document.body.appendChild(el)
numRef.forEach((element) => {
  document.writeln(element.num + '-' + element.word)
  document.writeln('<br>')
})
document.writeln('<br>')
Object.keys(Data.note).forEach((key) => {
  document.writeln(key)
  document.writeln('<br>')
})
document.writeln('<br>')
Object.values(Data.note).forEach((key) => {
  document.writeln(key)
  document.writeln('<br>')
})
$(function(){    
  console.log('JQuery')  
})
document.writeln('<br>')
document.write(_.capitalize('fred'))
