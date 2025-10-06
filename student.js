// --- student.js ---
import {
    collection,
    onSnapshot,
    orderBy,
    query
  } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
  
  import { db } from "./firebase.js";
  
  const studentTaskList = document.getElementById("studentTaskList");
  
  // ✅ 用 localStorage 来保存学生的“完成状态”
  // key: taskId, value: "done" or "todo"
  function getTaskStatus(id) {
    return localStorage.getItem(`taskStatus_${id}`) || "todo";
  }
  
  function setTaskStatus(id, status) {
    localStorage.setItem(`taskStatus_${id}`, status);
  }
  
  // 👀 实时监听任务变化
  const q = query(collection(db, "tasks"), orderBy("createdAt", "desc"));
  onSnapshot(q, (snapshot) => {
    studentTaskList.innerHTML = "";
    snapshot.forEach((docSnap) => {
      const task = docSnap.data();
      const taskId = docSnap.id;
  
      const li = document.createElement("li");
  
      const infoDiv = document.createElement("div");
      infoDiv.className = "task-info";
  
      const titleDiv = document.createElement("div");
      titleDiv.className = "task-title";
      titleDiv.textContent = `📌 ${task.title}`;
  
      const contentDiv = document.createElement("div");
      contentDiv.className = "task-content";
      contentDiv.textContent = task.content;
  
      infoDiv.appendChild(titleDiv);
      infoDiv.appendChild(contentDiv);
  
      // ✅ 状态按钮
      const statusBtn = document.createElement("button");
      const status = getTaskStatus(taskId);
      statusBtn.className = `status-btn ${status}`;
      statusBtn.textContent = status === "done" ? "✅ 已完成" : "⏳ 待完成";
  
      statusBtn.addEventListener("click", () => {
        const newStatus = getTaskStatus(taskId) === "done" ? "todo" : "done";
        setTaskStatus(taskId, newStatus);
        statusBtn.className = `status-btn ${newStatus}`;
        statusBtn.textContent = newStatus === "done" ? "✅ 已完成" : "⏳ 待完成";
      });
  
      li.appendChild(infoDiv);
      li.appendChild(statusBtn);
      studentTaskList.appendChild(li);
    });
  });
  