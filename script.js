function addTask() {
  const taskText = document.getElementById("taskInput").value.trim();
  const taskDate = document.getElementById("taskDate").value;

  if (!taskText || !taskDate) {
    alert("Please enter task and date");
    return;
  }

  const taskDiv = document.createElement("div");
  taskDiv.className = "task";
  taskDiv.innerHTML = `
    <label>
      <input type="checkbox" onchange="moveToNext(this)">
      ${taskText} <br><small>Due: ${taskDate}</small>
    </label>
    <div class="actions">
      <button onclick="moveToNext(this.parentElement.parentElement.querySelector('input'))">Next</button>
      <button onclick="markCompleted(this)">Complete</button>
    </div>
  `;

  const dueDate = new Date(taskDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (dueDate < today) {
    document.getElementById("overdueTasks").appendChild(taskDiv);
  } else {
    document.getElementById("newTasks").appendChild(taskDiv);
  }

  document.getElementById("taskInput").value = "";
  document.getElementById("taskDate").value = "";
}

function moveToNext(checkbox) {
  const task = checkbox.closest(".task");
  const parentId = task.parentElement.id;

  if (parentId === "newTasks") {
    document.getElementById("inProgressTasks").appendChild(task);
  } else if (parentId === "inProgressTasks") {
    document.getElementById("completedTasks").appendChild(task);
  } else if (parentId === "overdueTasks") {
    document.getElementById("inProgressTasks").appendChild(task);
  }
}

function markCompleted(button) {
  const task = button.closest(".task");
  document.getElementById("completedTasks").appendChild(task);
}
