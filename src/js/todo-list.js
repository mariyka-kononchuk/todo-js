import { v4 as uuidv4 } from 'uuid';
import Notiflix from "notiflix";
import dateFormat, { masks } from "dateformat";
import todoTpl from '../templates/todo-item.hbs';
import archiveTpl from '../templates/archive-item.hbs';
import refs from "./refs.js";
import { data } from "./data.js";
const {list, form, addTodoButton} = refs;
const categoryName = ['Task', 'Idea', 'Random Thought'];
const archiveData = [
   {
      category: 'Task',
      activeTotal: '',
      archivedTotal: '',
        
    },
    {
      category: 'Random Thought',
      activeTotal: '',
      archivedTotal: '',
    },
      {
        category: 'Idea',
        activeTotal: '2',
        archivedTotal: '2',
    }
];

// addTodoButton.addEventListener('click', () => {
//   addTodoButton.classList.add('is-hidden');
//   form.classList.remove('is-hidden')
// })

function generateTodoList(data) {
const activeTodos = data.filter((todo => todo.status === 'active'))
 const markup = todoTpl(activeTodos);
  // const markup = activeTodos
  //   .map((data) =>
  //     `<li class="todo-item" id=${data.id}>
  //       <svg class="todo-icon" width="24" height="24">
  //         <use href="./images/iconsNew.svg#icon-delete"></use>
  //       </svg>
  //       <div class="todo-wrapper" >
  //           <p class="todo-info"><span class="todo-info__font">${data.name}</span></p>
  //           <p class="todo-info">${data.date}</p>
  //           <p class="todo-info">${data.category}</p>
  //           <p class="todo-info__content">${data.content}</p>
  //           <p class="todo-info">${data.dates}</p>
  //           <button class="icon-btn__edit">
  //               <svg class="icon" width="24" height="24">
  //                   <use href="./images/iconsNew.svg#icon-delete"></use>
  //               </svg>
  //           </button>
  //           <button class="icon-btn__archive">
  //               <svg class="icon" width="24" height="24">
  //                   <use href="./images/iconsNew.svg#icon-delete"></use>
  //               </svg>
  //           </button>
  //           <button  class="icon-btn__delete" id="delete">
  //               <svg class="icon" width="24" height="24">
  //                   <use href="./images/iconsNew.svg#icon-delete"></use>
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
    generateArchivedList(data);
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
//  const tasks = [ { id: 1, done: false }, { id: 2, done: false } ]
// const completed_task = { id: 1, done: true }

// const markCompleted = (tasks, task) => {
//   const index = tasks.findIndex(t => t.id === task.id);
//   tasks.splice(index, 1);
//   tasks.push(task);
//   return tasks;
}
      


function archiveTodo (e) {
  const idTodo = e.currentTarget.parentNode.parentNode.parentNode.id;
  const index = data.findIndex(item => item.id === idTodo);
  data[index].status = "archived";
  generateTodoList(data);
  console.log(data)
//  var result = foo.map(el => el.bar == 1 ? {...el, baz: [11,22,33]} : el)
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
    dates: dates,
    status:'active'
  }
    
  data.push(newTodo);

  list.innerHTML = "";

  generateTodoList(data);
  generateArchivedList(data);
  evt.currentTarget.reset();
  addTodoButton.classList.remove('is-hidden');
  form.classList.add('is-hidden');
}

//generateArchivedList(data);








function generateTotalData(data,categoryName) {
  const totalData = [];
  const newArray = data.map(e => { return { category: e.category, status: e.status } });
  console.log('result', newArray)
  for (const name of categoryName) {
    let totalActive = 0;
    let totalArchived = 0;
    for (const item of newArray) {
      if (item.category === name && item.status === 'active') {
        totalActive++;
      }
      if (item.category === name && item.status === 'archived') {
        totalArchived++;
      }
    }
    if (totalActive === 0) {
      totalActive = ''
    }
    if (totalArchived === 0) {
      totalArchived = ''
    }
    const newTotalData = {
      category: name,
      active: totalActive,
      archived: totalArchived
    }
    totalData.push(newTotalData)
  }
  return totalData;
}




function generateArchivedList(data) {

  //const archiveTodos = data.filter((todo => todo.status === 'archived'));
  // const news = data.map(e => { return { category: e.category, status: e.status } })
  // console.log('свойства',
  //   data.filter(item => item.status === 'active'))
  // console.log('вариант',
  //   data.map(e => { return { category: e.category, status: e.status } }))
  // console.log('news',news.reduce((total,x) => (x.category==='Idea'&& x.status==='active' ? total+1 : total), 0))
  
 
//   function fieldByIndex(products, field){
//  return products.reduce((acc,curr) => {
//    const key = curr[field];
//    const value = acc[key] ? [...acc[key], curr] : [curr];
//    acc[key] = value;
//    console.log('acc',acc)
//    return acc;
//  }, {});
// }

// fieldByIndex(news, 'category')
     
//   console.log('свойства',
//     data.filter(item => item.status === 'active')
//   .map(e => { return { category: e.category, totalActive: e.category.reduce((a,b) => a + b, 0) } }))
 
//    const newArchive = {
//     category: content.value,
//     activeTotal: category.value,
//     archivedTotal:dates
//   }
  
  const totalData = generateTotalData(data, categoryName);
  const index = totalData.findIndex(item => item.active === '' && item.archived === '');
  if (index !== -1) {
    totalData.splice(index, 1);
  }
  console.log('total', totalData)
  const markup = archiveTpl(totalData);
  archive.innerHTML = "";
  archive.insertAdjacentHTML("beforeend", markup);
};