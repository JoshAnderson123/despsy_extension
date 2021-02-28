chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

  if (request.message === "go back") {
    chrome.tabs.goBack();
  }
})