import refs from "./refs.js";
const { saveChangesButton, body, editLightBox } = refs;

const buttonModalClose = document.querySelector('.edit-modal__close');

saveChangesButton.addEventListener('click', onEditModalClose);

export function onEditModalOpen(e) {
  editLightBox.classList.remove('is-hidden');
  body.classList.add('modal-open');
  buttonModalClose.addEventListener('click', onEditModalClose);
  editLightBox.addEventListener('click', evt => {
    if (evt.target.classList.contains('edit-lightbox')) {
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
  buttonModalClose.removeEventListener('click', onEditModalClose);
  editLightBox.removeEventListener('click', evt => {
    if (evt.target.classList.contains('edit-lightbox')) {
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