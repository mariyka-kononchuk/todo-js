import refs from "./refs.js";
const { saveChangesButton } = refs;
const editLightBox = document.querySelector('.edit__lightbox');
const btnTeamModalClose = document.querySelector('.edit__modal--close');
const body = document.querySelector('body');

saveChangesButton.addEventListener('click', onEditModalClose);

export function onEditModalOpen(e) {
  editLightBox.classList.remove('is-hidden');
  body.classList.add('modal-open');
  btnTeamModalClose.addEventListener('click', onEditModalClose);
  editLightBox.addEventListener('click', evt => {
    if (evt.target.classList.contains('edit__lightbox')) {
    onEditModalClose();
      }
  });

  window.addEventListener('keydown', evt => {
    if (evt.code === 'Escape') {
      onEditModalClose();
        }
    });
}

function onEditModalClose() {
  btnTeamModalClose.removeEventListener('click', onEditModalClose);
  editLightBox.removeEventListener('click', evt => {
    if (evt.target.classList.contains('edit__lightbox')) {
      onEditModalClose();
    }
  });
  window.removeEventListener('keydown', evt => {
    if (evt.code === 'Escape') {
      onEditModalClose();
    }
  });

  editLightBox.classList.add('is-hidden');
  body.classList.remove('modal-open');
}