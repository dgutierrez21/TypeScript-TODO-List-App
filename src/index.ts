import { v4 as uuidV4 } from 'uuid';

type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};

const list = document.querySelector<HTMLUListElement>('#list'),
  form = document.getElementById('new-task-form') as HTMLFormElement | null,
  input = document.querySelector<HTMLInputElement>('#new-task-title');

const tasks: Task[] = loadTasks();

tasks.forEach(addListItem);

form?.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!input || input?.value === '' || input?.value === null) return;

  const newTask: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  };

  tasks.push(newTask);

  addListItem(newTask);

  input.value = '';
});

function addListItem(task: Task) {
  const item = document.createElement('li');
  const label = document.createElement('label');
  const checkBox = document.createElement('input');
  checkBox.addEventListener('change', () => {
    task.completed = checkBox.checked;
    saveTasks();
  });
  checkBox.type = 'checkbox';
  checkBox.checked = task.completed;

  label.append(checkBox, task.title);
  item.append(label);
  list?.append(item);

  saveTasks();
}

function saveTasks(): void {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks(): Task[] {
  const tasksJSON = localStorage.getItem('tasks');
  if (tasksJSON === null) return [];

  return JSON.parse(tasksJSON);
}
