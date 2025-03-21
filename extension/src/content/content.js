import { injectSidebar } from "../utils/domUtils.js";

const SIDEBAR_URL = "http://localhost:3000"; 
injectSidebar(SIDEBAR_URL);


const problemTitle = document.querySelector(".title__VP")?.innerText || "Unknown Problem";
chrome.runtime.sendMessage({ problem: problemTitle }, (response) => {
  if (chrome.runtime.lastError) {
    console.error("Error sending message to background:", chrome.runtime.lastError.message);
  } else {
    console.log("Problem title sent to background:", response);
  }
});