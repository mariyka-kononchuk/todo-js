import { v4 as uuidv4 } from 'uuid';
import Notiflix from "notiflix";
import dateFormat, { masks } from "dateformat";
import todoTpl from '../templates/todo.hbs';
import summaryTpl from '../templates/summary.hbs';
import archiveTpl from '../templates/archive.hbs';
import refs from "./refs.js";
import { data } from "./data.js";
import { onEditModalOpen } from './edit-modal';
const {todoList, archiveList, form, summary} = refs;
const categoryName = ['Task', 'Idea', 'Random Thought'];

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
        editButton.addEventListener('click', (e)=>onEditModalOpen(e));
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


function deleteTodo (e) {
  const idTodo = e.currentTarget.parentNode.parentNode.parentNode.id
  //console.log('delete', data.filter(item => item.id !== idTodo));
  const index = data.findIndex(item => item.id === idTodo);
  if (index !== -1) {
    data.splice(index, 1);
    createTodoList(data);
  }
  return
}

export function editTodo(e,idTodo) {
  e.preventDefault();
  // const idTodo = e.currentTarget.parentNode.parentNode.parentNode.id
      
  // console.log('edit', idTodo);

  const found = data.find(todo => todo.id === idTodo);
  console.log('found', found);
  console.log(document.getElementById('name'))
  document.getElementById('#name').value ='test'
  const {
    elements: { name, content, category }
  } = e.currentTarget;

  found.name = name.value;
  found.content = content.value;
  found.category = category.value;
  

  // console.log(name.value)
  // const dates = content.value.match(/\d{2}([\/.-])\d{2}\1\d{4}/g)
 
  // const newTodo = {
  //   id: idTodo,
  //   date: dateFormat(new Date(), "mmmm dS, yyyy"),
  //   name: name.value,
  //   content: content.value,
  //   category: category.value,
  //   dates: dates,
  //   status:'active'
  // }
    
  //data.push(...newTodo);

  todoList.innerHTML = "";

  createTodoList(data);
  createSummaryData(data);
  e.currentTarget.reset();
//  const tasks = [ { id: 1, done: false }, { id: 2, done: false } ]
// const completed_task = { id: 1, done: true }

// const markCompleted = (tasks, task) => {
//   const index = tasks.findIndex(t => t.id === task.id);
//   tasks.splice(index, 1);
//   tasks.push(task);
//   return tasks;
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
  evt.currentTarget.reset();
}

function createTotalData(data,categoryName) {
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

function createSummaryData(data) {

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
  
  const totalData = createTotalData(data, categoryName);
  const index = totalData.findIndex(item => item.active === '' && item.archived === '');
  if (index !== -1) {
    totalData.splice(index, 1);
  }
  console.log('total', totalData)
  const markup = summaryTpl(totalData);
  summary.innerHTML = "";
  summary.insertAdjacentHTML("beforeend", markup);
};




