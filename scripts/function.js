import {api, popupEditNew} from './main.js';

function inputImage (event) {
    if (event.target.classList.contains('.place-card__image')) {
      const img = event.target.closest('.place-card__image');
      const imgmore = document.querySelector('.imgpopup__image');
      const imgDelate = img.style.backgroundImage.split('"');
      imgmore.src = imgDelate[1];
    }
}

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
      api.addUserInfo(name, job)
          .then((user) => {
            document.querySelector('.user-info__name').textContent = user.name;
            document.querySelector('.user-info__job').textContent = user.about;
            document.querySelector('.user-info__photo').setAttribute('style', `background-image: url(${user.avatar})`);
            popupEditNew.close();
          })
          .catch((err) => {
            console.log(err); 
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

export {inputImage, inputEdit, editContent, popupContent, validateForm, validateLink};