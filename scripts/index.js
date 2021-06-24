//ниже - выборка DOM элементов
const popupElement = document.querySelector('.popup')
const profileElement = document.querySelector('.profile')
const popupOpenElement = profileElement.querySelector('.profile__edit-button')
const popupCloseElement = popupElement.querySelector('.popup__close')
const profileName = profileElement.querySelector('.profile__name')
const profileJob = profileElement.querySelector('.profile__job')
const popupElementNameInput = popupElement.querySelector('.form__input_type_name')
const popupElementJobInput = popupElement.querySelector('.form__input_type_job')
const popupFormElement = popupElement.querySelector('.form')

const popupOpen = function() {
  popupElement.classList.add('popup_opened')
  popupElementNameInput.value = profileName.textContent;
  popupElementJobInput.value = profileJob.textContent;
}

const popupClose = function() {
  popupElement.classList.remove('popup_opened')
}

//ниже - закрытие попапа нажатием мимо него
const popupCloseOnOverlay = function(event) {
  if (event.target !== event.currentTarget) {
    return
  }
  popupClose()
}

const addTextProfile = function(evt) {
  evt.preventDefault()
  profileName.textContent = popupElementNameInput.value
  profileJob.textContent = popupElementJobInput.value
  popupClose()
}

popupOpenElement.addEventListener('click', popupOpen)
popupCloseElement.addEventListener('click', popupClose)
popupElement.addEventListener('click', popupCloseOnOverlay)
popupFormElement.addEventListener('submit', addTextProfile)