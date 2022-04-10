import refs from "./refs.js";
const { addTodoButton, body, todoLightBox} = refs;

const buttonModalClose = document.querySelector('.todo-modal__close');

addTodoButton.addEventListener('click', onTodoModalOpen);

function onTodoModalOpen() {
    todoLightBox.classList.remove('is-hidden');
    body.classList.add('modal-open')

    buttonModalClose.addEventListener('click', onTodoModalClose);
    todoLightBox.addEventListener('click', evt => {
        if (evt.target.classList.contains('todo-lightbox')) {
        onTodoModalClose();
        }
    });

    window.addEventListener('keydown', evt => {
        if (evt.code === 'Escape') {
            onTodoModalClose();
            }
        });
}

export function onTodoModalClose() {
  buttonModalClose.removeEventListener('click', onTodoModalClose);
  todoLightBox.removeEventListener('click', evt => {
    if (evt.target.classList.contains('todo-lightbox')) {
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