
export default class Popup {
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
  }