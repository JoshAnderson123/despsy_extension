// WarningPopup.js - creates a warning popup on unsafe ranked websites.
//
// Currently this is programmed to work only on the domain 'https://www.freeonlinegames.com/*' for demo purposes

function runForeground() {

  const popup = createElem('div', ['pbg', 'pw-1', 'full', 'FC'], {onclick: () => fadeOut()}, [ // Popup Background
    createElem('div', ['pctr', 'pw-2', 'pw-2-fade-in', 'FSV', 'bsh', 'rel'], {}, [ // Popup Container
      createElem('div', ['pw-3', 'FC', 'font-title-w', 'w100', 'rig'], { innerHTML: 'Warning: unsafe site' }), // pw3
      createElem('div', ['pw-4', 'FSV', 'font-para-w', 'grow', 'ta-l', 'w100'], {}, [  // pw4
        createElem('div', ['pw-5', 'w100'], { innerHTML: 'This site has been marked as unsafe because:' }), // pw5
        createElem('div', ['pw-6', 'w100'], { innerHTML: '• The link is not secured with HTTPS\r• There is no contact information\r• There is no privacy policy' }), //pw6
        createElem('div', ['pw-7c', 'FC', 'w100'], {}, [ // pw7c
          createElem('div', ['pw-7', 'pw-7a', 'FC', 'ptr'], { innerHTML: 'Go back', onclick: () => chrome.runtime.sendMessage({ message: "go back" }) }), // pw7a
          createElem('div', ['pw-7', 'FC', 'ptr'], { innerHTML: 'Go to site at your risk' }) // pw7
        ])
      ]),
      createElem('div', ['pw-8', 'FC', 'font-title', 'w100', 'rig'], {}, [ // pw8
        createElem('div', ['FSV'], {}, [ // pw8b
          createElem('div', ['pw-9', 'FS', 'font-title'], {}, [ // pw9
            createElem('img', ['pw-10', 'font-title'], { src: chrome.extension.getURL('media/logoImgWhite.svg') }), // pw10
            createElem('div', ['pw-11', 'font-footer-w'], { innerHTML: 'Surfer Buddy' }) // pw11
          ]),
          createElem('div', ['pw-12', 'font-footer2-w'], { innerHTML: 'Surf the web safetly' }) // pw12
        ])
      ]),
      createElem('div', ['pw-13', 'font-footer2'], { innerHTML: 'X' })
    ])
  ])

  document.querySelector('body').appendChild(popup);
}

function fadeOut() {
  document.querySelector('.pbg').classList.add('pc-1-fade-out');
  document.querySelector('.pctr').classList.add('pc-2-fade-out');
  setTimeout(() => document.querySelector('body').removeChild(document.querySelector('.pbg')), 600);
}

runForeground();



//////////////////// Helper Functions

function createElem(type, styles, attr, children) {
  const elem = document.createElement(type)
  elem.classList.add(...styles)
  for (const [key, val] of Object.entries(attr)) elem[key] = val
  if (!children) return elem
  for (child of children) elem.appendChild(child)
  return elem
}
