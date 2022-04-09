import { v4 as uuidv4 } from 'uuid';
import Notiflix from "notiflix";
import dateFormat, { masks } from "dateformat";
import todoTpl from '../templates/todo.hbs';
import summaryTpl from '../templates/summary.hbs';
import archiveTpl from '../templates/archive.hbs';
import refs from "./refs.js";
import { data } from "./data.js";
import { onEditModalOpen } from './edit-modal';
const {todoList, archiveList, form, editForm,summary} = refs;
const categoryName = ['Task', 'Idea', 'Random Thought'];
let idTodo = '';
function createTodoList(data) {
const activeTodos = data.filter((todo => todo.status === 'active'))
const markup = todoTpl(activeTodos);
  todoList.innerHTML = "";
        if (data.length === 0) {
            return Notiflix.Notify.failure('Sorry, there are no tasks. Please add new task.');
        }
  todoList.insertAdjacentHTML("beforeend", markup);
  const todos = document.querySelectorAll('.todo-item')
      for (let todo of todos) {
        const deleteButton = todo.querySelector('.icon-btn__delete');
        const editButton = todo.querySelector('.icon-btn__edit');
        const archiveButton = todo.querySelector('.icon-btn__archive');
        deleteButton.addEventListener('click', deleteTodo);
        editButton.addEventListener('click', editTodo);
        archiveButton.addEventListener('click', (e)=> changeStatusTodo(e, 'archived'));
      }
    createSummaryData(data);
}

export function createArchiveList(data) {
  const archivedTodos = data.filter((todo => todo.status === 'archived'));
  const markup = archiveTpl(archivedTodos);
  archiveList.innerHTML = "";
    if (data.length === 0) {
      return Notiflix.Notify.failure('There are no archived tasks');
      }
  archiveList.insertAdjacentHTML("beforeend", markup);
  const allArchivedTodos = document.querySelectorAll('.archive-item')
  for (let archivedTodo of allArchivedTodos) {
      const unpackButton = archivedTodo.querySelector('.archive-btn__unpack');
      unpackButton.addEventListener('click', (e)=> changeStatusTodo(e, 'active'));
    }
}
    
createTodoList(data, 'active');

form.addEventListener("submit", newTodo);
editForm.addEventListener("submit", (e) => saveChangesTodo(e, idTodo));

function deleteTodo (e) {
  const idTodo = e.currentTarget.parentNode.parentNode.parentNode.id
  const index = data.findIndex(item => item.id === idTodo);
  if (index !== -1) {
    data.splice(index, 1);
    createTodoList(data);
  }
  return
}

export function editTodo(e) {
  onEditModalOpen();
  idTodo = e.currentTarget.parentNode.parentNode.parentNode.id;
  const found = data.find(todo => todo.id === idTodo);
  document.getElementById('name').value = found.name;
  document.getElementById('category').value = found.category;
  document.getElementById('content').value = found.content;
  // editForm.addEventListener("submit", (e) => saveChangesTodo(e, idTodo));
 // editForm.removeEventListener("submit", (e)=>saveChangesTodo(e,idTodo));
}

function saveChangesTodo(e, idTodo) {
  e.preventDefault();
  console.log('нажали на сохранение изменений')
  console.log('id',idTodo)
  const found = data.find(todo => todo.id === idTodo);
  
  console.log('found', found);
  // console.log('foundName:', found.name)
  
  const {
      elements: { editName, editContent, editCategory }
    } = e.currentTarget;
  
  
  console.log('found.name', found.name)
  found.name = editName.value;
  // const dates = content.value.match(/\d{2}([\/.-])\d{2}\1\d{4}/g)
 
  // const newTodo = {
  //   id: idTodo,
  //   date: dateFormat(new Date(), "mmmm dS, yyyy"),
  //   name: editName.value,
  //   content: editContent.value,
  //   category: editCategory.value,
  //   dates: dates,
  //   status:'active'
  // }
  // console.log('newTodo', newTodo)

  // const index = data.findIndex(t => t.id === idTodo);
  // console.log('index',index)
  // data.splice(index, 1);
  // data.push(newTodo);
 
  

  // const editName = document.querySelector('.edit-name');
  // const editContent = document.querySelector('.edit-content')
  console.log('inputName:', editName.value)
 // console.log('inputContent:',editContent.value)
  
  console.log('nameValue:', editName.value)
  
  // found.name = editName.value;
  // found.content = editContent.value;
  // found.category = editCategory.value;
  
  console.log('newData', data)
  todoList.innerHTML = "";
  createTodoList(data);
  createSummaryData(data);
  //e.currentTarget.reset();
 
}
 
function changeStatusTodo (e, newStatus) {
  const idTodo = e.currentTarget.parentNode.parentNode.parentNode.id;
  const index = data.findIndex(item => item.id === idTodo);
  data[index].status = newStatus;
  if (newStatus = 'active') {
    createTodoList(data);
  }
  if (newStatus = 'archived') {
    createArchiveList(data);
    createTodoList(data);
  }
  return
}

function newTodo(e) {
  e.preventDefault();
  const {
    elements: { name, content, category }
  } = e.currentTarget;

  console.log(name.value)
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
  todoList.innerHTML = "";
  createTodoList(data);
  createSummaryData(data);
  e.currentTarget.reset();
}

function createTotalData(data,categoryName) {
  const totalData = [];
  const newArray = data.map(e => { return { category: e.category, status: e.status } });
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

function createSummaryData(data) {
  const totalData = createTotalData(data, categoryName);
  const index = totalData.findIndex(item => item.active === '' && item.archived === '');
  if (index !== -1) {
    totalData.splice(index, 1);
  }
  const markup = summaryTpl(totalData);
  summary.innerHTML = "";
  summary.insertAdjacentHTML("beforeend", markup);
};




