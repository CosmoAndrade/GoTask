const table = document.getElementById('table-body');
const loadingMessage = document.getElementById('loading-message');
const countTasks = document.getElementById('count-tasks');

function updateCountTasks() {
  const allTasks = getTasks();
  countTasks.innerHTML = allTasks.length;
}

function fillTable() {
  const allTasks = getTasks();
  allTasks.forEach(addTask);

  if(allTasks.length === 0) {
    loadingMessage.innerHTML = "Você não tem nenhuma tarefa!";
  } else {
    loadingMessage.innerHTML = "";
  }

  updateCountTasks();
}

function addTask(task) {
  const tr = document.createElement('tr');
  tr.innerHTML = innerHTMLTasks(task);

  table.appendChild(tr);
}

function innerHTMLTasks(task) {
  const html = `
    <td>${task.description}</td>
    <td>${task.date}</td>
    <td>
      <a href="#" onclick="removeTask(${task.id})">
        <i class="fas fa-trash"></i>
      </a>
    </td>
  `;

  return html;
}

function removeTask(id) {
  const allTasks = getTasks();
  const tasksFiltered = allTasks.filter(task => task.id !== id);
  
  setTasks(tasksFiltered);
  reload();
}

function reload() {
  table.innerHTML = '';
  fillTable();
}

// storage

function getTasks() {
    return JSON.parse(localStorage.getItem('@GoTasks')) || [];
  }
  
  function setTasks(tasks) {
    localStorage.setItem('@GoTasks', JSON.stringify(tasks));
  }


  // Modal 

  const inputDescription = document.getElementById('description');
const inputDate = document.getElementById('date');
const btnCreateTask = document.getElementById('btn-create-task');
const modal = document.getElementById('modal');
const alertElement = document.getElementById('alert');

function createTask(e) {
  e.preventDefault();

  if(!inputDescription.value || !inputDate.value) {
    alertElement.style.display = 'block';
    closeAlert();
    return;
  }

  const newTask = {
    description: inputDescription.value,
    date: new Date(inputDate.value).toLocaleDateString('pt-BR', { timeZone: 'UTC' }),
    id: Math.floor(Math.random() * 10000)
  }

  const allTasks = getTasks();

  setTasks([...allTasks, newTask]);

  reload();
  toggleModal();
  clearFields();
}

function toggleModal() {
  modal.classList.toggle('modal-visible');
}

function clearFields() {
  inputDate.value = '';
  inputDescription.value = '';
}

function closeAlert() {
  setTimeout(() => {
    alertElement.style.display = 'none';
  }, 3000);
}

btnCreateTask.addEventListener('click', createTask);