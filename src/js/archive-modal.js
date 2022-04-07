import refs from "./refs.js";
import { generateArchiveList } from './todo-list';
import { data } from "./data.js";
const { archiveButton, addTodoButton, submitButton} = refs;
const archiveLightBox = document.querySelector('.archive__lightbox');
const btnModalClose = document.querySelector('.archive__modal--close');
const body = document.querySelector('body');


archiveButton.addEventListener('click', onArchiveModalOpen);
// addTodoButton.addEventListener('click', onTodoModalOpen);
// submitButton.addEventListener('click', onTodoModalClose);

function onArchiveModalOpen() {
  generateArchiveList(data);
    archiveLightBox.classList.remove('is-hidden');
    body.classList.add('modal-open')

    btnModalClose.addEventListener('click', onArchiveModalClose);
    archiveLightBox.addEventListener('click', evt => {
        if (evt.target.classList.contains('archive__lightbox')) {
        onArchiveModalClose();
        }
    });

    window.addEventListener('keydown', evt => {
        if (evt.code === 'Escape') {
            onArchiveModalClose();
            }
        });
}

function onArchiveModalClose() {
  btnModalClose.removeEventListener('click', onArchiveModalClose);
  archiveLightBox.removeEventListener('click', evt => {
    if (evt.target.classList.contains('archive__lightbox')) {
      onArchiveModalClose();
    }
  });
  window.removeEventListener('keydown', evt => {
    if (evt.code === 'Escape') {
      onArchiveModalClose();
    }
  });

  archiveLightBox.classList.add('is-hidden');
  body.classList.remove('modal-open');
}