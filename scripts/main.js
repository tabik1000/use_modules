import {inputImage, inputEdit, editContent, popupContent, validateForm, validateLink} from './function.js';
import CardList from './cardlist.js';
import Card from './card.js';
import Popup from './popup.js';
import Api from './api.js';

const root = document.querySelector('.root');
export const placesList = document.querySelector('.places-list');
const popup = document.querySelector('.popup');
const edit = document.querySelector('.edit');
const imgPopup = document.querySelector('.imgpopup');
const popupForm = document.forms.popupForm;
const editForm = document.forms.editForm;
editForm.elements.name.value = document.querySelector('.user-info__name').textContent;
editForm.elements.link.value = document.querySelector('.user-info__job').textContent;
const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort2' : 'https://praktikum.tk/cohort2'
const popupNew = new Popup(popup);
export const popupEditNew = new Popup(edit);
const popupImage = new Popup(imgPopup);
const userInfo = {
  baseUrl: serverUrl,
  headers: {
    authorization: 'e6f04cd4-4d82-48d7-8c34-111d7888cce2',
    'Content-Type': 'application/json'
  }  
}

export const api = new Api(userInfo);

placesList.addEventListener('click', inputImage);

root.addEventListener('click', function(event) {
  if(event.target.classList.contains('user-info__button')) {
    popupNew.open();
  } else if (event.target.classList.contains('user-info__button-edit')){
    popupEditNew.open();
  } else if (event.target.classList.contains('place-card__image')) {
    popupImage.open();
  }
});

editForm.addEventListener('submit', editContent);
editForm.addEventListener('input', validateForm);
popup.addEventListener('submit', popupContent);
popupForm.addEventListener('input', validateForm);
popupForm.addEventListener('input', validateLink);

api.getUserInfo()
  .then(user => {
    document.querySelector('.user-info__name').textContent = user.name;
    document.querySelector('.user-info__job').textContent = user.about;
    document.querySelector('.user-info__photo').setAttribute('style', `background-image: url(${user.avatar})`);
  })
    .catch((err) => {
    console.log(err); 
});
  

api.getInitialCards()
  .then(result => {
    const newCard = new CardList(document.querySelector('.places-list'), result);
  })
    .catch((err) => {
    console.log(err); 
});
  
  



