import { v4 as uuidv4 } from 'uuid';
import dateFormat, { masks } from "dateformat";
import todoTpl from '../templates/todo-item.hbs';
import refs from "./refs.js";
import { data } from "./data.js";
const {list, form} = refs;
 

function generateTodoList(todos) {
        const gallery = todoTpl(todos);
        
        //если ничего не нашли по запросу (получили пустой массив)
        if (todos.length === 0) {
            
            return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        }
        
        //вставляем шаблон в разметку с заполенными параметрами
        list.insertAdjacentHTML("beforeend", gallery);
        //КЛАССИЧЕСКАЯ МОДАЛКА: переход между картинками реализован с помощью индекса массива изображений
        //galleryList.addEventListener('click', onOpenModal);
        //МОДАЛКА ИЗ БИБЛИОТЕКИ Simplelightbox
        //openSimpleLightboxModal();
        //плавная прокрутка
    
       
}
    
generateTodoList(data);


form.addEventListener("submit", handleSubmit);

function handleSubmit(evt) {
  evt.preventDefault();
  const {
    elements: { name, content, category }
  } = evt.currentTarget;

  if (name.value === "" || content.value === "") {
    return console.log("Please fill in all the fields!");
    }
    
    const newTodo = {
      id: uuidv4(),
      date: dateFormat(new Date(), "mmmm dS, yyyy"),
      name: name.value,
      content: content.value,
      category: category.value
    }
    
  data.push(newTodo);

  list.innerHTML = "";

  generateTodoList(data);
    
  evt.currentTarget.reset();
}