import refs from "./refs.js";
import { createArchiveList} from './todo-app';
import { data } from "./data.js";
const { archiveButton, body, archiveLightBox } = refs;

const buttonModalClose = document.querySelector('.archive-modal__close');

archiveButton.addEventListener('click', onArchiveModalOpen);

function onArchiveModalOpen() {
  archiveLightBox.classList.remove('is-hidden');
  body.classList.add('modal-open');
  createArchiveList(data);

  buttonModalClose.addEventListener('click', onArchiveModalClose);
  archiveLightBox.addEventListener('click', evt => {
    if (evt.target.classList.contains('archive-lightbox')) {
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
  buttonModalClose.removeEventListener('click', onArchiveModalClose);
  archiveLightBox.removeEventListener('click', evt => {
    if (evt.target.classList.contains('archive-lightbox')) {
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