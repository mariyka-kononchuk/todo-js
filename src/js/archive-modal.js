import refs from "./refs.js";
import { createArchiveList } from './todo-list';
import { data } from "./data.js";
const { archiveButton, addTodoButton, submitButton} = refs;
const archiveLightBox = document.querySelector('.archive__lightbox');
const btnModalClose = document.querySelector('.archive__modal--close');
const body = document.querySelector('body');

archiveButton.addEventListener('click', onArchiveModalOpen);

function onArchiveModalOpen() {
  archiveLightBox.classList.remove('is-hidden');
  body.classList.add('modal-open');
  createArchiveList(data);

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