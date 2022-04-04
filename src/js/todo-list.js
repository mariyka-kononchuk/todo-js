import todoTpl from '../templates/todo-item.hbs';
import refs from "./refs.js";
const {list} = refs;
 
const data = [
    {
        id: 'id-1',
        name: 'Shopping list',
        date: '04-04-2022',
        category: 'Task',
        content: 'Tomatoes, bread',
        dates:''
    },
    {
        id: 'id-2',
        name: 'The theory of evolution',
        date: '04-04-2022',
        category: 'Random Thought',
        content: 'The evolution is...',
        dates:''
    },
      {
        id: 'id-3',
        name: 'New feature',
        date: '04-04-2022',
        category: 'Ides',
        content: 'Implement new...',
        dates:'3/5/2022,10/5/2022'
    }
]
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