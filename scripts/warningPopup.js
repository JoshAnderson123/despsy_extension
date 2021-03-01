// WarningPopup.js - creates a warning popup on unsafe ranked websites.
//
// Currently this is programmed to work only on the domain 'https://www.freeonlinegames.com/*' for demo purposes

function runForeground() {

  const popupBackground = document.createElement('div');
  popupBackground.classList.add('pw-1', 'full', 'FC');

  const popupContainer = document.createElement('div');
  popupContainer.classList.add('pw-2', 'pw-2-fade-in', 'FSV', 'bsh', 'rel');
  popupBackground.appendChild(popupContainer);

  const pw3 = document.createElement('div');
  pw3.classList.add('pw-3', 'FC', 'font-title-w', 'w100', 'rig');
  pw3.innerHTML = 'Warning: unsafe site'
  popupContainer.appendChild(pw3);
  
  const pw4 = document.createElement('div');
  pw4.classList.add('pw-4', 'FSV', 'font-para-w', 'grow', 'ta-l', 'w100');
  popupContainer.appendChild(pw4);

  const pw5 = document.createElement('div');
  pw5.classList.add('pw-5', 'w100');
  pw5.innerHTML = 'This site has been marked as unsafe because:'
  pw4.appendChild(pw5);

  const pw6 = document.createElement('div');
  pw6.classList.add('pw-6', 'w100');
  pw6.innerHTML = '• The link is not secured with HTTPS\r• There is no contact information\r• There is no privacy policy'
  pw4.appendChild(pw6);

  const pw7c = document.createElement('div');
  pw7c.classList.add('pw-7c', 'FC', 'w100');
  pw4.appendChild(pw7c);

  const pw7a = document.createElement('div');
  pw7a.classList.add('pw-7', 'pw-7a', 'FC', 'ptr');
  pw7a.innerHTML = 'Go back'
  pw7a.onclick = () => chrome.runtime.sendMessage({message: "go back"})
  pw7c.appendChild(pw7a);

  const pw7 = document.createElement('div');
  pw7.classList.add('pw-7', 'FC', 'ptr');
  pw7.innerHTML = 'Go to site at your risk'
  pw7c.appendChild(pw7);

  const pw8 = document.createElement('div');
  pw8.classList.add('pw-8', 'FC', 'font-title', 'w100', 'rig');
  popupContainer.appendChild(pw8);

  const pw8b = document.createElement('div');
  pw8b.classList.add('FSV');
  pw8.appendChild(pw8b);

  const pw9 = document.createElement('div');
  pw9.classList.add('pw-9', 'FS', 'font-title');
  pw8b.appendChild(pw9);

  const pw10 = document.createElement('img');
  pw10.classList.add('pw-10', 'font-title');
  pw10.src = chrome.extension.getURL('media/logoImgWhite.svg');
  pw9.appendChild(pw10);

  const pw11 = document.createElement('div');
  pw11.classList.add('pw-11', 'font-footer-w');
  pw11.innerHTML = 'Surfer Buddy'
  pw9.appendChild(pw11);

  const pw12 = document.createElement('div');
  pw12.classList.add('pw-12', 'font-footer2-w');
  pw12.innerHTML = 'Surf the web safetly'
  pw8b.appendChild(pw12);

  const exitBtn = document.createElement('div');
  exitBtn.classList.add('pw-13', 'font-footer2');
  exitBtn.innerHTML = 'X'
  popupContainer.appendChild(exitBtn);

  popupBackground.onclick = () => fadeOut(popupBackground, popupContainer)
  const body = document.querySelector('body');
  body.appendChild(popupBackground);
}

function fadeOut(popupBackground, popupContainer) {

  popupBackground.classList.add('pw-1-fade-out');
  // popupContainer.classList.toggle('pw-2-fade-in');
  popupContainer.classList.add('pw-2-fade-out');

  setTimeout(function() {
    const body = document.querySelector('body');
    body.removeChild(popupBackground);
  }, 600);
}

runForeground();