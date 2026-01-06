// firebase-bridge.js - 核心雲端橋接器
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getDatabase, ref, set, get, onValue } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";

// 1. 你的專屬 Firebase 配置
const firebaseConfig = {
  apiKey: "AIzaSyCOhBN9TH3UJSOSx5XVyQ08f_2RUckvXYU",
  authDomain: "holyhairsalon-f73bf.firebaseapp.com",
  databaseURL: "https://holyhairsalon-f73bf-default-rtdb.firebaseio.com",
  projectId: "holyhairsalon-f73bf",
  storageBucket: "holyhairsalon-f73bf.firebasestorage.app",
  messagingSenderId: "960169055224",
  appId: "1:960169055224:web:2c826e76e3a177fcbf3c0d"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// --- 核心工具函數 ---

/**
 * 雲端儲存：通用寫入
 * @param {string} path - 雲端路徑 (例如 'users/bal' 或 'vaults/0001')
 * @param {any} data - 要存入的資料
 */
export async function cloudSave(path, data) {
    try {
        await set(ref(db, path), data);
        console.log(`Cloud Saved: ${path}`);
    } catch (e) { console.error("Cloud Save Error:", e); }
}

/**
 * 雲端讀取：單次抓取
 * @param {string} path - 雲端路徑
 */
export async function cloudGet(path) {
    const snapshot = await get(ref(db, path));
    return snapshot.exists() ? snapshot.val() : null;
}

/**
 * 即時監聽：當雲端資料變動時，立刻執行回呼函數
 */
export function cloudListen(path, callback) {
    onValue(ref(db, path), (snapshot) => {
        callback(snapshot.val());
    });
}