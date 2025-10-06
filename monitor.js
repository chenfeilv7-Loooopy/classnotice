// --- monitor.js ---
import {
    collection,
    addDoc,
    serverTimestamp,
    onSnapshot,
    orderBy,
    query,
    deleteDoc,
    doc,
    updateDoc
  } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
  
  import { db } from "./firebase.js";
  
  const taskTitle = document.getElementById("taskTitle");
  const taskContent = document.getElementById("taskContent");
  const publishBtn = document.getElementById("publishTask");
  const taskList = document.getElementById("taskList");
  
  // ✅ 发布任务
  publishBtn.addEventListener("click", async () => {
    const title = taskTitle.value.trim();
    const content = taskContent.value.trim();
  
    if (!title || !content) {
      alert("请输入任务标题和内容！");
      return;
    }
  
    try {
      await addDoc(collection(db, "tasks"), {
        title,
        content,
        createdAt: serverTimestamp()
      });
      taskTitle.value = "";
      taskContent.value = "";
      alert("🎉 任务发布成功！");
    } catch (error) {
      console.error("❌ 发布失败:", error);
    }
  });
  
  // 🧠 实时监听任务列表
  const q = query(collection(db, "tasks"), orderBy("createdAt", "desc"));
  onSnapshot(q, (snapshot) => {
    taskList.innerHTML = "";
    snapshot.forEach((docSnap) => {
      const task = docSnap.data();
      const li = document.createElement("li");
  
      // 任务信息区
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
  
      // 按钮区
      const btnDiv = document.createElement("div");
      btnDiv.className = "task-buttons";
  
      // 修改按钮 ✏️
      const editBtn = document.createElement("button");
      editBtn.textContent = "✏️ 修改";
      editBtn.className = "edit-btn";
      editBtn.addEventListener("click", async () => {
        const newTitle = prompt("请输入新的任务标题：", task.title);
        const newContent = prompt("请输入新的任务内容：", task.content);
        if (newTitle && newContent) {
          await updateDoc(doc(db, "tasks", docSnap.id), {
            title: newTitle,
            content: newContent
          });
        }
      });
  
      // 删除按钮 🗑️
      const delBtn = document.createElement("button");
      delBtn.textContent = "🗑️ 删除";
      delBtn.className = "delete-btn";
      delBtn.addEventListener("click", async () => {
        if (confirm(`确定要删除任务【${task.title}】吗？`)) {
          await deleteDoc(doc(db, "tasks", docSnap.id));
        }
      });
  
      btnDiv.appendChild(editBtn);
      btnDiv.appendChild(delBtn);
  
      li.appendChild(infoDiv);
      li.appendChild(btnDiv);
      taskList.appendChild(li);
    });
  });
  