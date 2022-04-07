import refs from "./refs.js";
const { archiveButton, addTodoButton, submitButton} = refs;
const todoLightBox = document.querySelector('.todo__lightbox');
const archiveLightBox = document.querySelector('.todo__lightbox');
const btnTeamModalClose = document.querySelector('.todo__modal--close');
const body = document.querySelector('body');


archiveButton.addEventListener('click', onTodoModalOpen);
addTodoButton.addEventListener('click', onTodoModalOpen);
submitButton.addEventListener('click', onTodoModalClose);

function onTodoModalOpen(e) {
    todoLightBox.classList.remove('is-hidden');
    body.classList.add('modal-open')

    btnTeamModalClose.addEventListener('click', onTodoModalClose);
    todoLightBox.addEventListener('click', evt => {
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
  todoLightBox.removeEventListener('click', evt => {
    if (evt.target.classList.contains('todo__lightbox')) {
      onTodoModalClose();
    }
  });
  window.removeEventListener('keydown', evt => {
    if (evt.code === 'Escape') {
      onTodoModalClose();
    }
  });

  todoLightBox.classList.add('is-hidden');
  body.classList.remove('modal-open');
}