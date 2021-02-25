let active_tab_id = 0
let injected = false

// Perform an action whenever the user activates a tab
chrome.tabs.onActivated.addListener(tab => {
  // Get the current tab id
  chrome.tabs.get(tab.tabId, currentTabInfo => {
    active_tab_id = tab.tabId
    // Check if it is a google url
    if (/^https:\/\/www\.google\.com\/search/.test(currentTabInfo.url)) {
      // Insert CSS and execute foreground script
      chrome.tabs.insertCSS(null, { file: './mystyles.css' })
      chrome.tabs.executeScript(null, { file: './foreground.js' }, () => console.log('i injected'))
    }
  })
})

chrome.tabs.onUpdated.addListener(tabId => {
  // Get the current tab id
  chrome.tabs.get(tabId, currentTabInfo => {
    // Check if it is a google url
    if (/^https:\/\/www\.google\.com\/search/.test(currentTabInfo.url)) {
      // Insert CSS and execute foreground script
      chrome.tabs.insertCSS(null, { file: './mystyles.css' })
      chrome.tabs.executeScript(null, { file: './foreground.js' }, () => console.log('i injected'))
    }
  })
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

  console.log(`Injected: ${injected}`)

  if (request.message === "injected?") {
    if (!injected) {
      sendResponse({ message: "run code" });
      injected = true;
    } else {
      sendResponse({ message: "don't run code" });
    }
  }
})