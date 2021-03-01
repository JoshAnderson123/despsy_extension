// Background.js - runs background functions across tabs
//
// Currently only funtion is to go back to previous page upon request in Warning Popup

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

  if (request.message === "go back") {
    chrome.tabs.goBack();
  }
})