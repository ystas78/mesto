//ниже - массив с фото
const initialCards = [
  {
    name: 'Успенский собор',
    link: './images/vitebsk-1.JPG'
  },
  {
    name: 'р.Западная Двина',
    link: './images/vitebsk-2.JPG'
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
const popup = document.querySelector('.popup');//попап обоих попапов - общий класс
const popupProfile = document.querySelector('.popup_profile');//попап редактирование профиля
const popupElements = document.querySelector('.popup_elements');//попап редактирование фото и их названий
const popupProfileOpenButton = profile.querySelector('.profile__edit-button');//кнопка - открывает попап редактирование профиля
const popupElementsAddButton = profile.querySelector('.profile__add-button');//кнопка - открывает попап редактирование фото и их названий
const popupCloseButton = popup.querySelector('.popup__close');//кнопка закрытия обоих попапов - одна на два попапа
const profileName = profile.querySelector('.profile__name');//поле профиля - фамилия-имя и т.п.
const profileJob = profile.querySelector('.profile__job');//поле профиля - сфера деятельности,работа и т.п.
const popupForm = popup.querySelector('.form');//общий для двух поапапов блок содержащий формы ввода данных
const popupFormNameInput = popup.querySelector('.form__input_type_name');//форма ввода фамилии-имени и т.п.
const popupFormJobInput = popup.querySelector('.form__input_type_job');//форма ввода сферы деятельности,работа и т.п.
const popupFormNameFotoInput = popup.querySelector('.form__input_type_name-foto');//форма ввода - название нового фото
const popupFormLinkFotoInput = popup.querySelector('.form__input_type_link-foto');//форма ввода - ссылка на новое фото
const elementTemplate = document.querySelector('.template').content;//темплейт элемент - блок карточки с фото его названием
const elementBox = document.querySelector('.elements');//то куда помещен темплейт - в <section class="elements">

const elementLikeButton = elementTemplate.querySelector('.element__place_like-button');//кнопка лайка фото - сердечко

const popupFoto = document.querySelector('.popup_open-foto');//попап открытой для просмотра фотографии
const popupCloseFotoButton = popupFoto.querySelector('.popup__close_foto-button'); //кнопка закрытия открытой фотографии
//!-------------------------------------------------------------------------------------------------------------------------------------


//!-------------------------------------------------------------------------------------------------------------------------------------
//ниже - наполнение элементов для карточек с фото
function getPlace(name, link) {
  const createPlace = elementTemplate.cloneNode(true); //клониурем содержимое тега тепмлейт
  const placeTitle = createPlace.querySelector('.element__place-title');
  const placeImage = createPlace.querySelector('.element__image');
  placeTitle.textContent = name;
  placeImage.alt = name;
  placeImage.src = link; 
  placeEventListener(createPlace);
  return createPlace;
}

initialCards.forEach(function (el) {
  elementBox.append(getPlace(el.name, el.link)); 
});

//! Ниже - удаление карточки ----------------------------------------------------------------------------------------------------------- 
// Сначала на кнопки карточки с картинкой вешаем слушатели (вверху в выборки дом-элементов они не нужны)
function placeEventListener(createPlace) {
  createPlace.querySelector('.element__place_delite-button').addEventListener('click', placeDelete);
}

function placeDelete (event) {
  const createPlace = event.target.closest('.element');
  
  createPlace.remove();
}

//!-------------------------------------------------------------------------------------------------------------------------------------
//ниже - открываем попап создав openPopup и добавляя попапу класс popup_opened в html разметку
const openPopup = function() {
  popup.classList.add('popup_opened');
  popupFormNameInput.value = profileName.textContent; //вставляем текст
  popupFormJobInput.value = profileJob.textContent;           
}

//ниже - регистрируем обработчик события на конпку открытия попапа, при клике на нее сказали - открой попап. 
popupProfileOpenButton.addEventListener('click', openPopup);
popupElementsAddButton.addEventListener('click', openPopup);


//ниже - закрываем попап создав closePopup и удаляя - popup_opened из html разметки
const closePopup = function() {
  popup.classList.remove('popup_opened');
}

//ниже - регистрируем обработчик события на конпку закрытия попапа, при клике на нее сказали - закрой попап. 
popupCloseButton.addEventListener('click', closePopup);

//ниже - закрытие попапа нажатием мимо него, если цель (клик мышкой) сделан не на папапе - закрыть попап
const closePopupOnOverlay = function(event) {
  if (event.target !== event.currentTarget) {
    return
  }
  closePopup()
}

//ниже - регистрируем обработчик события клик мимо попапа - закрой попап. 
popup.addEventListener('click', closePopupOnOverlay)
//!-----------------------------------------------------------------------------------------------------------------------------------




const addTextProfile = function(event) {
  event.preventDefault()
  profileName.textContent = popupFormNameInput.value
  profileJob.textContent = popupFormJobInput.value
  closePopup()
}

popupForm.addEventListener('submit', addTextProfile)//регистрация обработчика события