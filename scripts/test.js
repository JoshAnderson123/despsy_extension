function createElem(type, styles, attr, children) {
  const elem = docuemnt.createElement(type)
  elem.classList.add(...styles)
  for(const [key, val] of Object.entries(attr)) elem[key] = val
  for(child of children) elem.appendChild(child)
}

const cookiesPopup = createElem('div', ['pbg', 'pc-1', 'full', 'FC'], {onclick: () => fadeOut()}, [ // Popup Background
  createElem('div', ['pctr', 'pc-2', 'pc-2-fade-in', 'FSV', 'bsh', 'rel', 'ptr'], {}, [ // Popup Container
    createElem('img', ['pc-3', 'of-cont', 'f'], {src: chrome.runtime.getURL(`/media/cookiesVideo2.png`)}),
    createElem('div', ['FC', 'f', 'abs'], {}, [ // pc4a
      createElem('div', ['pc-4', 'FC', 'ptr', 'font-title', 'bsh'], {innerHTML: 'Play video >'}) // pc4
    ])
  ])
])

function fadeOut() {
  document.querySelector('.pbg').classList.add('pc-1-fade-out');
  document.querySelector('.pctr').classList.add('pc-2-fade-out');
  setTimeout(() => document.querySelector('body').removeChild(popupBackground), 600);
}





const popupBackground = document.createElement('div');
popupBackground.classList.add('pc-1', 'full', 'FC');

const popupContainer = document.createElement('div');
popupContainer.classList.add('pc-2', 'pc-2-fade-in', 'FSV', 'bsh', 'rel', 'ptr');
popupBackground.appendChild(popupContainer);

const cookiesVideo = document.createElement('img');
const url = chrome.runtime.getURL(`/media/cookiesVideo2.png`);
cookiesVideo.src = url;
cookiesVideo.classList.add('pc-3', "of-cont", "f");
popupContainer.appendChild(cookiesVideo);

const pc4a = document.createElement('div')
pc4a.classList.add('FC', 'f', 'abs');
popupContainer.appendChild(pc4a);

const pc4 = document.createElement('div');
pc4.classList.add('pc-4', 'FC', 'ptr', 'font-title', 'bsh');
pc4.innerHTML = 'Play video >'
pc4a.appendChild(pc4);

popupBackground.onclick = () => fadeOut(popupBackground, popupContainer)
const body = document.querySelector('body');
body.appendChild(popupBackground);