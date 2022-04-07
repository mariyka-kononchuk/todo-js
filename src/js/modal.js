import refs from "./refs.js";
const { addTodoButton, submitButton} = refs;
const lightBox = document.querySelector('.todo__lightbox');
const btnTeamModalClose = document.querySelector('.todo__modal--close');
const body = document.querySelector('body');


addTodoButton.addEventListener('click', onTodoModalOpen);
submitButton.addEventListener('click', onTodoModalClose);

function onTodoModalOpen() {
    lightBox.classList.remove('is-hidden');
    body.classList.add('modal-open')

  btnTeamModalClose.addEventListener('click', onTodoModalClose);
  lightBox.addEventListener('click', evt => {
    if (evt.target.classList.contains('todo__lightbox')) {
      onTodoModalClose();
    }
  });

  window.addEventListener('keydown', evt => {
    if (evt.code === 'Escape') {
      onTodoModalClose();
    }
  });
}

function onTodoModalClose() {
  btnTeamModalClose.removeEventListener('click', onTodoModalClose);
  lightBox.removeEventListener('click', evt => {
    if (evt.target.classList.contains('todo__lightbox')) {
      onTodoModalClose();
    }
  });
  window.removeEventListener('keydown', evt => {
    if (evt.code === 'Escape') {
      onTodoModalClose();
    }
  });

  lightBox.classList.add('is-hidden');
  body.classList.remove('modal-open');
}