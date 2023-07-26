import { v4 as uuidv4 } from 'uuid';
import Notiflix from "notiflix";
import dateFormat, { masks } from "dateformat";
import todoTpl from '../templates/todo.hbs';
import summaryTpl from '../templates/summary.hbs';
import archiveTpl from '../templates/archive.hbs';
import refs from "./refs.js";
import { data } from "./data.js";
import { onEditModalOpen } from './edit-modal';
import sprite from '../images/icons.svg'

const {
  todoList,
  archiveList,
  todoForm,
  editForm,
  deleteAllButton,
  summary } = refs;

const categoryName = ['Task', 'Idea', 'Random Thought'];
const icons = [
   {
      name: 'Task',
      svgUrl: `${sprite}#icon-buy`
  },
    {
      name: 'Idea',
      svgUrl: `${sprite}#icon-lamp`
  },
      {
      name: 'Random Thought',
      svgUrl: `${sprite}#icon-mind`
    },
]
let idTodo = '';

createTodoApp();

function createTodoApp() {
  createTodoList(data, 'active');
  todoForm.addEventListener("submit", addTodo);
  editForm.addEventListener("submit", (e) => saveChangesTodo(e, idTodo));
  deleteAllButton.addEventListener('click', deleteAllTodos);
}

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
  createSummaryTable(data);
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
    
function addTodo(e) {
  e.preventDefault();
  const {
    elements: { name, content, category }
  } = e.currentTarget;

  if (name.value === "" || content.value === "") {
    return Notiflix.Notify.failure('Please fill in all fields')
  }

  const dates = content.value.match(/\d{1,2}\D\d{1,2}\D(\d{4}|\d{2})/g);
  
  let contentDates = []

  if (dates !== null) {
    dates.map(item => contentDates.push(dateFormat(item, "m/d/yyyy")))
  } 

  
  let url = '';
  for (const icon of icons) {
    if (category.value === icon.name) {
      url = icon.svgUrl;
    }
  }

  const newTodo = {
    id: uuidv4(),
    date: dateFormat(new Date(), "mmmm dS, yyyy"),
    name: name.value.trim(),
    content: content.value.trim(),
    category: category.value,
    dates: contentDates.join(', '),
    status: 'active',
    svgUrl:url
  }
    
  data.push(newTodo);
  todoList.innerHTML = "";
  createTodoList(data);
  createSummaryTable(data);
  e.currentTarget.reset();
}

function deleteTodo (e) {
  const idTodo = e.currentTarget.parentNode.parentNode.parentNode.id
  const index = data.findIndex(item => item.id === idTodo);
  if (index !== -1) {
    data.splice(index, 1);
    createTodoList(data);
  }
  return
}

function deleteAllTodos() {
  data.splice(0, data.length)
  summary.innerHTML = "";
  createTodoList(data);
}

function editTodo(e) {
  onEditModalOpen();
  idTodo = e.currentTarget.parentNode.parentNode.parentNode.id;
  const found = data.find(todo => todo.id === idTodo);
  document.getElementById('name').value = found.name;
  document.getElementById('category').value = found.category;
  document.getElementById('content').value = found.content;
}

function saveChangesTodo(e, idTodo) {
  e.preventDefault();
  const found = data.find(todo => todo.id === idTodo);
  const {
      elements: { editName, editContent, editCategory }
    } = e.currentTarget;
  const dates = editContent.value.match(/\d{2}([\/.-])\d{2}\1\d{4}/g)

  found.name = editName.value.trim();
  found.content = editContent.value.trim();
  found.category = editCategory.value;
  found.dates = dates;

  todoList.innerHTML = "";
  createTodoList(data);
  createSummaryTable(data);
  e.currentTarget.reset();
}
 
function changeStatusTodo(e, newStatus) {
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

function summaryData(data) {
  const totalData = [];
  const newArray = data.map(e => { return { category: e.category, status: e.status} });
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

    let url = '';
    for (const icon of icons) {
      if (name === icon.name) {
        url = icon.svgUrl;
      }
    }
    
    const newTotalData = {
      category: name,
      active: totalActive,
      archived: totalArchived,
      svgUrl:url
    }
    totalData.push(newTotalData)
  }
  return totalData;
}

function createSummaryTable(data) {
  let totalData = summaryData(data);
  for (const item of totalData) {
    const index = totalData.findIndex(item => item.active === '' && item.archived === '');
    if (index !== -1) {
      totalData.splice(index, 1);
    }
  }
  const markup = summaryTpl(totalData);
  summary.innerHTML = "";
  summary.insertAdjacentHTML("beforeend", markup);
};




