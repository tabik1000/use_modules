const root = document.querySelector('.root');
const placesList = document.querySelector('.places-list');
const popup = document.querySelector('.popup');
const edit = document.querySelector('.edit');
const imgPopup = document.querySelector('.imgpopup');
const popupForm = document.forms.popupForm;
const editForm = document.forms.editForm;
editForm.elements.name.value = document.querySelector('.user-info__name').textContent;
editForm.elements.link.value = document.querySelector('.user-info__job').textContent;

class Card {
  constructor(name, link) {
    this.cardElement = this.createCard(name, link);
    this.cardElement.addEventListener('click', this.likeCard);
    this.cardElement.addEventListener('click', this.removeCard);
  }

  createCard(crdName, crdLink) {
    const cardContainer = document.createElement('div');
    const cardImage = document.createElement('div');
    const cardImageDeleteBtn = document.createElement('button');
    const cardDescription = document.createElement('div');
    const cardName = document.createElement('h3');
    const cardLikeBtn = document.createElement('button');

    cardContainer.classList.add('place-card');
    cardImage.classList.add('place-card__image');
    cardImage.style.backgroundImage = `url(${crdLink})`;
    cardImageDeleteBtn.classList.add('place-card__delete-icon');
    cardDescription.classList.add('place-card__description');
    cardName.classList.add('place-card__name');
    cardName.textContent = crdName;
    cardLikeBtn.classList.add('place-card__like-icon');

    cardContainer.appendChild(cardImage);
    cardImage.appendChild(cardImageDeleteBtn);
    cardContainer.appendChild(cardDescription);
    cardDescription.appendChild(cardName);
    cardDescription.appendChild(cardLikeBtn);
    placesList.appendChild(cardContainer);

    return cardContainer;
  }

  likeCard(event) {
    if (event.target.classList.contains('place-card__like-icon')){
      event.target.classList.toggle('place-card__like-icon_liked');
    }
  }

  removeCard(event) {
    if (event.target.classList.contains('place-card__delete-icon')){
      event.currentTarget.parentElement.removeChild(event.currentTarget);
    }
  }
}

class CardList {
  constructor(cardsContainer, cardsArr){
    this.cardsContainer = cardsContainer;
    this.cardsArr = cardsArr;
    this.render();
  }

  addCard(crdName, crdLink){
    const { cardElement } = new Card(crdLink, crdName);
    this.cardsContainer.appendChild(cardElement);
  }

  render () {
    this.cardsArr.forEach((elem) => {this.addCard(elem.link, elem.name)})
  }
}

class Popup {
  constructor(container) {
    this.popupElement = container;
	  this.popupElement.addEventListener('click', event => {
      if(event.target.classList.contains('popup__close')) this.close();
    });
  }

  open() {
    this.popupElement.classList.add('popup_is-opened');
  }

  close() {
    this.popupElement.classList.remove('popup_is-opened');
  }
};

const popupNew = new Popup(popup);
const popupEditNew = new Popup(edit);
const popupImage = new Popup(imgPopup);

function inputImage (event) {
  if (event.target.classList.contains('.place-card__image')) {
    const img = event.target.closest('.place-card__image');
    const imgmore = document.querySelector('.imgpopup__image');
    const imgDelate = img.style.backgroundImage.split('"');
    imgmore.src = imgDelate[1];
  }
}

placesList.addEventListener('click', inputImage);

function inputEdit (editName, editJob) {
  const name = document.querySelector('.user-info__name');
  const job = document.querySelector('.user-info__job');

  name.textContent = editName;
  job.textContent = editJob;
};

function editContent (event) {
  const name = editForm.elements.name.value;
  const job = editForm.elements.link.value;
  if (editForm.elements.name.value.length !== 0 && editForm.elements.link.value.length !== 0) {
    // api.addUserInfo(name, job);
  // Надо исправить: данные на странице не сохраняются, обращаться с методом addUserInfo стоит следующим образом:
    api.addUserInfo(name, job)
        .then((user) => {
          document.querySelector('.user-info__name').textContent = user.name;
          document.querySelector('.user-info__job').textContent = user.about;
          document.querySelector('.user-info__photo').setAttribute('style', `background-image: url(${user.avatar})`);
          popupEditNew.close();
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
    event.preventDefault();
    popupEditNew.close();
  }
};

function popupContent (event) {
  const imageName = popupForm.elements.name.value;
  const imageLink = popupForm.elements.link.value;
  if (popupForm.elements.name.value.length !== 0 && popupForm.elements.link.value.length !== 0) {
    newCard.addCard(imageLink, imageName);
    event.preventDefault();
    popup.classList.toggle('popup_is-opened');
    popupForm.elements.name.value = '';
    popupForm.elements.link.value = '';
  }
};

function validateForm (event) {
  const errorSelector = event.target.nextElementSibling;
  if (event.target.validity.typeMismatch && event.target.type === 'url') {
    errorSelector.textContent = 'Здесь должна быть ссылка';
  } else if (event.target.value.length === 0) {
    errorSelector.textContent = 'Это обязательное поле';
  } else if (event.target.value.length < 2 || event.target.value.length > 30) {
    errorSelector.textContent = 'Должно быть от 2 до 30 символов';
  } else {
    errorSelector.textContent = '';
  }
};

function validateLink (event) {
  const errorSelector = event.target.nextElementSibling;
  if (event.target.value.length > 30) {
    errorSelector.textContent = '';
  }
};

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

const userInfo = {
  baseUrl: 'http://95.216.175.5/cohort2',
  headers: {
    authorization: 'e6f04cd4-4d82-48d7-8c34-111d7888cce2',
    'Content-Type': 'application/json'
  }  
}

class Api {
  constructor(info) {
    this.baseUrl = info.baseUrl;
    this.headers = info.headers;
  }

  checkResultJson(result) {
    if(result.ok) {
      return result.json();
    }
    return Promise.reject(result.status);
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {method: "GET", headers: this.headers})
    .then((result) => this.checkResultJson(result));
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {method: "GET", headers: this.headers})
    .then((result) => this.checkResultJson(result))
  }

  addUserInfo(editName, editJob) {
    return fetch(`${this.baseUrl}/users/me`, {method: "PATCH", headers: this.headers, body: JSON.stringify({
      name: `${editName}`,
      about: `${editJob}`
    })
  })
    .then((result) => this.checkResultJson(result))
    /* Надо исправать: this.getUserInfo() - делает запрос, но при его получении данные на страницу
    не подставляются. Этот запрос здесь делать вообще не требуется и .then(() => this.getUserInfo()) можно убрать. 
    При вызове addUserInfo необходимо просто обработать промис как я показал выше */
   // .then(() => this.getUserInfo())
  }
}

const api = new Api(userInfo);

api.getUserInfo()
  .then(user => {
    document.querySelector('.user-info__name').textContent = user.name;
    document.querySelector('.user-info__job').textContent = user.about;
    document.querySelector('.user-info__photo').setAttribute('style', `background-image: url(${user.avatar})`);
  })
  //.catch() //Можно лучше: лучше хотябы выводить ошибку в консоль
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
  

api.getInitialCards()
  .then(result => {
    const newCard = new CardList(document.querySelector('.places-list'), result);
  })
  // Надо исправить: в конце цепочки блоков then должны быть обработка ошибок,
  //на тот случай если запрос к серверу завершился неудачей
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
  
  



/*
    Класс Api организован хорошо.
    Отлично, что повторяющийся код вынесен в функцию checkResultJson.

    Но по методу addUserInfo есть замечание - выполнять в нем запрос на получение информации
    пользователя .then(() => this.getUserInfo()) не нужно. В ответ на отправку данных сервер 
    возвращает обновленные данные, их и нужно использовать. Как это сделать, я привел в примере выше,
    в функции editContent.
    Так же в некоторых местах не хватает обработки ошибок в конце цепочки блоков then.

    Почему то в попапе редактирования профиля кнопка неактивна, даже если ввести корректные данные.
*/  