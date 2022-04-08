import refs from "./refs.js";
//const { saveChangesButton } = refs;
import { editTodo } from './todo-list';
const editLightBox = document.querySelector('.edit__lightbox');
const btnTeamModalClose = document.querySelector('.edit__modal--close');
const body = document.querySelector('body');
const editForm = document.querySelector('#edit-form');

//document.querySelector('.save-changes-btn').addEventListener('click', onEditModalClose);

export function onEditModalOpen(e) {
  editLightBox.classList.remove('is-hidden');
  body.classList.add('modal-open');
  const idTodo = e.currentTarget.parentNode.parentNode.parentNode.id
  console.log('edit', idTodo)
  // console.log(document.getElementById('name'))
  // document.getElementById('name').value ='test'
  editForm.addEventListener("submit", (e)=>editTodo(e,idTodo));
 

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