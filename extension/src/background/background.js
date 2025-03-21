chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.problem) {
   
      fetch("http://localhost:3000/api/collab", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          problem: message.problem,
          message: "User joined the problem room",
          userId: "extension-user",
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Collaboration event sent:", data);
          sendResponse({ success: true });
        })
        .catch((error) => {
          console.error("Error sending collaboration event:", error);
          sendResponse({ success: false, error: error.message });
        });
  

      return true;
    }
  });
  

  chrome.runtime.onInstalled.addListener((details) => {
    console.log("Extension installed/updated:", details);
  });