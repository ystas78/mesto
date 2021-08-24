//ниже - массив с фото
const initialCards = [
  {
    name: 'Успенский собор',
    link: './images/vitebsk-1-1.jpg'
  },
  {
    name: 'р.Западная Двина',
    link: './images/vitebsk-2-2.jpg'
  },
  {
    name: 'Дом-музей Марка Шагала',
    link: './images/vitebsk-3.JPG'
  },
  {
    name: 'ул.Суворова',
    link: './images/vitebsk-4.JPG'
  },
  {
    name: 'площадь Победы',
    link: './images/vitebsk-5.JPG'
  },
  {
    name: 'Костёл Святой Варвары',
    link: './images/vitebsk-6.JPG'
  }
];

//ниже - выборка DOM элементов - сохранение их в переменные
const profile = document.querySelector('.profile');
const popup = document.querySelector('.popup');//попап обоих попапов - общий класс //? убрать видимо надо...
const popupProfile = document.querySelector('.popup_profile');//попап редактирование профиля
const popupElements = document.querySelector('.popup_elements');//попап редактирование фото и их названий
const popupProfileOpenButton = profile.querySelector('.profile__edit-button');//кнопка - открывает попап редактирование профиля
const popupElementsAddButton = profile.querySelector('.profile__add-button');//кнопка - открывает попап добавления фото и их названий
const popupCloseButtonProfile = popupProfile.querySelector('.popup__close');//кнопка закрытия попапа 
const popupCloseButtonElements = popupElements.querySelector('.popup__close');//кнопка закрытия 
const addFormFoto = popupElements.querySelector('.form');// форма добовления нового фото
const popupFormNameFotoInput = popupElements.querySelector('.form__input_type_name-foto');//форма ввода - название нового фото
const popupFormLinkFotoInput = popupElements.querySelector('.form__input_type_link-foto');//форма ввода - ссылка на новое фото
const profileName = profile.querySelector('.profile__name');//поле профиля - фамилия-имя и т.п.
const profileJob = profile.querySelector('.profile__job');//поле профиля - сфера деятельности,работа и т.п.
const popupForm = popup.querySelector('.form');//общий для двух поапапов блок содержащий формы ввода данных
const popupFormNameInput = popup.querySelector('.form__input_type_name');//форма ввода фамилии-имени и т.п.
const popupFormJobInput = popup.querySelector('.form__input_type_job');//форма ввода сферы деятельности,работа и т.п.
const elementTemplate = document.querySelector('.template').content;//темплейт элемент - блок карточки с фото его названием
const elementBoxTemplate = document.querySelector('.elements');//то куда помещен темплейт - в <section class="elements">
const elementLikeActiv = document.querySelector('.element__place_like-button_active');//элемент - активный лайк фото - черный
const popupOpenFoto = document.querySelector('.popup_open-foto');//тут и ниже элементы попапа открытой для просмотра фотографии
const popupContainerFoto = popupOpenFoto.querySelector('.popup__container-foto'); 
const popupCloseButtonFoto = popupOpenFoto.querySelector('.popup__close_foto-button'); 
const	popupFoto = popupOpenFoto.querySelector('.popup__foto');
const	popupTitleFoto = popupOpenFoto.querySelector ('.popup__title-foto');
//--------------------------------------------------------------------------------------------------------------------------------------
// Функция - вешает слушатели на кнопки карточки с фото - удаление, лайк, само фото как кнопка (в выборки дом-элементов они не нужны)
function placeEventListener(createPlace) {
  createPlace.querySelector('.element__place_delite-button').addEventListener('click', placeDelete);//удаление
  createPlace.querySelector('.element__place_like-button').addEventListener('click', likePlace);//лайк
  createPlace.querySelector('.element__image').addEventListener('click', openPopupImage);//само фото как кнопка попапа
}
//--------------------------------------------------------------------------------------------------------------------------------------
//ниже - наполнение элементов для карточек с фото
function getPlace(elementData) {
  const createPlace = elementTemplate.cloneNode(true); //клониурем содержимое тега тепмлейт
  const placeTitle = createPlace.querySelector('.element__place-title');
  const placeImage = createPlace.querySelector('.element__image');
  placeTitle.textContent = elementData.name;
  placeImage.alt = elementData.name;
  placeImage.src = elementData.link; 
  placeEventListener(createPlace);
  return createPlace;
}

initialCards.forEach(function (elementData) {
  elementBoxTemplate.append(getPlace(elementData)); 
});
//Ниже - добавляем новую карточку с фото ----------------------------------------------------------------------------------------------
const addNewPlace = (event) => {
  event.preventDefault()
  const newPlace  = {
    name: popupFormNameFotoInput.value,
    link: popupFormLinkFotoInput.value
  }
  elementBoxTemplate.prepend(getPlace(newPlace));
  closePopup(popupElements);
  event.target.reset();
}
//Ниже - функция лайка карточки с фото -------------------------------------------------------------------------------------------------
function likePlace(event) {
  const placeLikeButton = event.target.closest('.element__place_like-button');
  placeLikeButton.classList.toggle('element__place_like-button_active')
 }
//Ниже - функция удаление карточки с фото ---------------------------------------------------------------------------------------------- 
function placeDelete (event) {
  const createPlace = event.target.closest('.element');
  createPlace.remove();
}
//Ниже - функция открытие попапов ------------------------------------------------------------------------------------------------------
const openPopup = function(selectedPopup) {
  selectedPopup.classList.add('popup_opened');
}
//Ниже - открываем попап редактирования профиля (попап №1) -----------------------------------------------------------------------------
const openPopupProfile = function(selectedPopup) {
  popupFormNameInput.value = profileName.textContent; //вставляем текст
  popupFormJobInput.value = profileJob.textContent;
  openPopup(selectedPopup);           
}
//Ниже - функция открытия попапа №3 - открыте для просмотра фото -----------------------------------------------------------------------
function openPopupImage(event) {
  const clickElement = event.target.closest('.element__image');
  openPopup(popupOpenFoto)
  popupFoto.src = clickElement.src;
  popupFoto.alt = clickElement.alt;
  popupTitleFoto.textContent = clickElement.alt;
}
//Ниже - функция закрытие попапов ------------------------------------------------------------------------------------------------------
const closePopup = function(selectedPopup) {
  selectedPopup.classList.remove('popup_opened');
}
//Ниже - сохранение информации в попапе №1 --------------------------------------------------------------------------------------------
const changeTextProfile = function(event) {
  event.preventDefault();
  profileName.textContent = popupFormNameInput.value;
  profileJob.textContent = popupFormJobInput.value;
  closePopup(popupProfile);
}
//ниже - регистрируем обработчик события на конпки при клике --------------------------------------------------------------------------
popupProfileOpenButton.addEventListener('click', () => openPopupProfile(popupProfile));
popupElementsAddButton.addEventListener('click', () => openPopup(popupElements));
popupCloseButtonProfile.addEventListener('click', () => closePopup(popupProfile));
popupCloseButtonElements.addEventListener('click', () => closePopup(popupElements));
popupCloseButtonFoto.addEventListener('click', () => closePopup(popupOpenFoto));
popupForm.addEventListener('submit', changeTextProfile); //и обработчики событий submit
addFormFoto.addEventListener('submit', addNewPlace);