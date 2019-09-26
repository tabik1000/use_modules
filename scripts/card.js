// export default class Card {
//     constructor(name, link) {
//         this.cardElement = this.createCard(name, link);
//         this.cardElement.addEventListener('click', this.likeCard);
//         this.cardElement.addEventListener('click', this.removeCard);
//     }

//     createCard(crdName, crdLink) {
//         const cardContainer = document.createElement('div');
//         const cardImage = document.createElement('div');
//         const cardImageDeleteBtn = document.createElement('button');
//         const cardDescription = document.createElement('div');
//         const cardName = document.createElement('h3');
//         const cardLikeBtn = document.createElement('button');

//         cardContainer.classList.add('place-card');
//         cardImage.classList.add('place-card__image');
//         cardImage.style.backgroundImage = `url(${crdLink})`;
//         cardImageDeleteBtn.classList.add('place-card__delete-icon');
//         cardDescription.classList.add('place-card__description');
//         cardName.classList.add('place-card__name');
//         cardName.textContent = crdName;
//         cardLikeBtn.classList.add('place-card__like-icon');

//         cardContainer.appendChild(cardImage);
//         cardImage.appendChild(cardImageDeleteBtn);
//         cardContainer.appendChild(cardDescription);
//         cardDescription.appendChild(cardName);
//         cardDescription.appendChild(cardLikeBtn);
//         placesList.appendChild(cardContainer);

//         return cardContainer;
//     }

//     likeCard(event) {
//         if (event.target.classList.contains('place-card__like-icon')){
//             event.target.classList.toggle('place-card__like-icon_liked');
//         }
//     }

//     removeCard(event) {
//         if (event.target.classList.contains('place-card__delete-icon')){
//             event.currentTarget.parentElement.removeChild(event.currentTarget);
//         }
//     }
// }