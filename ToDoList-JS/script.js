// Some random colors (Library)
const colors = ["#3CC157", "#2AA7FF", "#1B1B1B", "#FCBC0F", "#F85F36"];

const numBalls = 20;
const balls = [];

for (let i = 0; i < numBalls; i++) {
  let ball = document.createElement("div");
  ball.classList.add("ball");
  ball.style.background = colors[Math.floor(Math.random() * colors.length)];
  ball.style.left = `${Math.floor(Math.random() * 100)}vw`;
  ball.style.top = `${Math.floor(Math.random() * 100)}vh`;
  ball.style.transform = `scale(${Math.random()})`;
  ball.style.width = `${Math.random()}em`;
  ball.style.height = ball.style.width;

  balls.push(ball);
  document.body.append(ball);
}

// Keyframes
balls.forEach((el, i, ra) => {
  let to = {
    x: Math.random() * (i % 2 === 0 ? -11 : 11),
    y: Math.random() * 12,
  };

  let anim = el.animate(
    [
      { transform: "translate(0, 0)" },
      { transform: `translate(${to.x}rem, ${to.y}rem)` },
    ],
    {
      duration: (Math.random() + 1) * 6000, // random duration
      direction: "alternate",
      fill: "both",
      iterations: Infinity,
      easing: "ease-in-out",
    }
  );
});
// -------------------------------------------------------------

let Tasks = [
  {
    title: "Clean Home",
    date: "20/1/205",
    isDone: false,
  },

  {
    title: "Eat Apple",
    date: "21/1/205",
    isDone: true,
  },

  {
    title: " Call Siham",
    date: "22/1/205",
    isDone: false,
  },

  {
    title: "Coding",
    date: "23/1/205",
    isDone: false,
  },
];


// Read from Local storge
function getTasksFromStorge(){
  let retrevedTasks = JSON.parse(localStorage.getItem("Tasks"));
  
  // Tasks = retrevedTasks ?? []
  if (retrevedTasks == null){
    Tasks = [];
  }else{
    Tasks = retrevedTasks;
  }


}

getTasksFromStorge()


function renderPage(){

document.getElementById("tasks").innerHTML = "";


let index = 0;
for (task of Tasks) {
  let content = `
 <div id="tasks" class="tasks" style=" direction: ltr; padding: 20px;" >
              <!-- TASK -->
              <div class="task ${task.isDone? 'done' : ''}"  id="task">
                <!-- TASKs INFO -->
                <div id="taskInfo" style="width: 70%; text-align: left;">
                    <h2 id="titleTask">${task.title}</h2>
                    <div>
                        <span id="dateTask">
                        ${task.date}
                        </span>
                    </div>
                </div>
                <!-- TASKs INFO // -->
                <!-- TASKs ACTIONA -->
                <div id="taskAction" style="display: flex; justify-content: space-between; align-items: center; width: 30%; "  >
                    <button onclick="deleteTask(${index})" class="circular" style="background-color: rgb(239, 73, 73);"><i class="fa-solid fa-trash-can"></i></button>
                    <button onclick="completeTask(${index})" class="circular" style="background-color: rgb(64, 229, 53);"><i class="${task.isDone? 'fa-solid fa-xmark' : 'fa-solid fa-check'}"></i></button>
                    <button onclick="editTask(${index})" class="circular" style="background-color: rgb(52, 58, 231);;"><i class="fa-solid fa-pen-to-square"></i></button>
                </div>
                <!-- TASKs ACTIONA // -->
              </div>

    
              <!--// TASK // -->
            </div>
 `;
  document.getElementById("tasks").innerHTML += content;
  index++;
}

}

renderPage();

// Add new task:
document.getElementById("addbut").addEventListener("click", () => {
  let inputValue = document.getElementById("input").value;
  let time = new Date().toLocaleDateString("en-GB");
  let addedTask = {
    title: inputValue,
    date: time,
    isDone: false,
  };
  Tasks.push(addedTask);

  storeTasks();

  renderPage();
});

function deleteTask(index){
  let task = Tasks[index]
  let isConfirm = confirm("Are you Sure that you want to delete: " + task.title)
  if (isConfirm){
  Tasks.splice(index,1);
  storeTasks();
  renderPage();
  }

}

function editTask(index){
  let task = Tasks[index]
  let newTaskTitle = prompt("Rename the task", task.title);
  if(newTaskTitle){
  task.title= newTaskTitle;
  storeTasks();
  renderPage();
  }
}

function completeTask(index){
 let task = Tasks[index];
 task.isDone = !task.isDone;
 storeTasks();
 renderPage();

}

// ========= STORGE FUNCTION =========== //

function storeTasks(){
  // Save in the local storge:
  let taskString = JSON.stringify(Tasks);
  localStorage.setItem("Tasks", taskString);
}