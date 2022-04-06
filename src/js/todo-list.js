import { v4 as uuidv4 } from 'uuid';
import Notiflix from "notiflix";
import dateFormat, { masks } from "dateformat";
import todoTpl from '../templates/todo-item.hbs';
import refs from "./refs.js";
import { data } from "./data.js";
const {list, form} = refs;

const archiveData = [];

function generateTodoList(data) {
 const markup = todoTpl(data);
  // const markup = datas
  //   .map((data) =>
  //     `<li class="todo-item" id=${data.id}>
  //       <svg class="todo-icon" width="24" height="24">
  //         <use href="../images/mind.svg"></use>
  //       </svg>
  //       <div class="todo-wrapper" >
  //           <p class="todo-info"><span class="todo-info__font">${data.name}</span></p>
  //           <p class="todo-info">${data.date}</p>
  //           <p class="todo-info">${data.category}</p>
  //           <p class="todo-info__content">${data.content}</p>
  //           <p class="todo-info">${data.dates}</p>
  //           <button class="icon-btn__edit">
  //               <svg class="icon" width="24" height="24">
  //                   <use href="images/icons.svg#icon-archive"></use>
  //               </svg>
  //           </button>
  //           <button class="icon-btn__archive">
  //               <svg class="icon" width="24" height="24">
  //                   <use href="images/icons.svg#icon-archive"></use>
  //               </svg>
  //           </button>
  //           <button  class="icon-btn__delete" id="delete">
  //               <svg class="icon" width="24" height="24">
  //                   <use href="images/icons.svg#icon-delete"></use>
  //               </svg>
  //           </button>
  //       </div>
  //   </li>`)
  // .join("");
   list.innerHTML = "";
        //если ничего не нашли по запросу (получили пустой массив)
        if (data.length === 0) {
            return Notiflix.Notify.failure('Sorry, there are no tasks. Please add new task.');
        }
       
        //вставляем шаблон в разметку с заполенными параметрами
        list.insertAdjacentHTML("beforeend", markup);
        //КЛАССИЧЕСКАЯ МОДАЛКА: переход между картинками реализован с помощью индекса массива изображений
        //galleryList.addEventListener('click', onOpenModal);
        //МОДАЛКА ИЗ БИБЛИОТЕКИ Simplelightbox
        //openSimpleLightboxModal();
        //плавная прокрутка
    
      const todos = document.querySelectorAll('.todo-item')
      for (let todo of todos) {
        const deleteButton = todo.querySelector('.icon-btn__delete');
        const editButton = todo.querySelector('.icon-btn__edit');
        const archiveButton = todo.querySelector('.icon-btn__archive');
        deleteButton.addEventListener('click', deleteTodo);
        editButton.addEventListener('click', editTodo);
        archiveButton.addEventListener('click', archiveTodo);
      }
    
}
    
generateTodoList(data);
form.addEventListener("submit", handleSubmit);

// ('click',(e) => e.target.parentNode.remove())

function deleteTodo (e) {
  const idTodo = e.currentTarget.parentNode.parentNode.parentNode.id
  //console.log('delete', data.filter(item => item.id !== idTodo));
  const index = data.findIndex(item => item.id === idTodo);
  if (index !== -1) {
    data.splice(index, 1);
    generateTodoList(data);
  }
  return
}

function editTodo (e) {
 const idTodo = e.currentTarget.parentNode.parentNode.parentNode.id
      
  console.log('edit',idTodo);
 
      
}

function archiveTodo (e) {
  const idTodo = e.currentTarget.parentNode.parentNode.parentNode.id
  const todoArchive = data.filter(item => item.id === idTodo);
  console.log('archive', idTodo);
  archiveData.push(todoArchive);
  console.log('archive', archiveData)
}

function handleSubmit(evt) {
  evt.preventDefault();
  const {
    elements: { name, content, category }
  } = evt.currentTarget;

  if (name.value === "" || content.value === "") {
    return console.log("Please fill in all the fields!");
    }
    
  const dates = content.value.match(/\d{2}([\/.-])\d{2}\1\d{4}/g)
 
  const newTodo = {
    id: uuidv4(),
    date: dateFormat(new Date(), "mmmm dS, yyyy"),
    name: name.value,
    content: content.value,
    category: category.value,
    dates:dates
  }
    
  data.push(newTodo);

  list.innerHTML = "";

  generateTodoList(data);
    
  evt.currentTarget.reset();
}

