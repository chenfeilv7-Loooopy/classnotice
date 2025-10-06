// --- firebase.js ---

// ① 导入 Firestore 相关函数
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// ② 初始化 Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyCDbwO9cS76rRgRDlEW0K7Nodfa4KC3I8g",
  authDomain: "classnotice-d15f3.firebaseapp.com",
  projectId: "classnotice-d15f3",
  storageBucket: "classnotice-d15f3.appspot.com",   // ✅ 修正这里
  messagingSenderId: "403787586133",
  appId: "1:403787586133:web:1e27425b61432bbafc12dc",
  measurementId: "G-C1B83RWR3V"
};

// ③ 初始化
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ④ 初始化 Firestore 数据库实例
export const db = getFirestore(app);
//for test
console.log("✅ Firebase 初始化成功")