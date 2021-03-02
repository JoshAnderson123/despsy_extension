// Ranking.js - runs foreground ranking functionality on a given tab.
//
// Sites are curerrently ranked randomly for demonstration - this will be replaced
// with ranking through privacy metric assesment as described in presentation.

function runRanking() {

  console.log("test")

  let hovering = false;

  // Remove existing markers
  const existingMarkers = document.querySelectorAll(".marker")
  for (marker of existingMarkers) {
    marker.parentElement.removeChild(marker);
  }

  // Add new markers
  const searchResults = document.querySelectorAll(".yuRUbf, .nDgy9d")
  for (result of searchResults) {

    // console.log(result.classList[0])
    let linkType = 'yuRUbf'

    if (result.classList[0] === 'nDgy9d') {
      linkType = 'nDgy9d'
      result.classList.add('rel', 'ov-v')
      result.parentNode.classList.add('ov-v')
    }

    const markerChoice = Math.random();
    let markerType;
    if (markerChoice < 0.8) markerType = "lowRisk"
    else markerType = "mediumRisk"
    // else markerType = "highRisk"

    const linkText = result.childNodes[1]?.childNodes[0]?.childNodes[0]
    // if (/www\.messenger\.(?:co\.uk|com)/.test(linkText?.innerHTML)) markerType = "highRisk"
    if (/www\.freeonlinegames\.com/.test(linkText?.innerHTML)) markerType = "highRisk"

    const marker = addMarker(markerType, linkType)
    addTooltip(marker, markerType);
    result.appendChild(marker);
  }


  //// HELPER FUNCTIONS ////

  function addMarker(markerType, linkType) {

    const marker = createElem('div', [markerType, 'marker'], {}, [
      createElem('img', ['paw'], { src: chrome.runtime.getURL(`/media/paw_${markerType}.svg`) })
    ])

    if (linkType === 'nDgy9d') marker.classList.add('nDgy9d');
    marker.addEventListener("mouseenter", () => {
      hovering = true;
      marker.childNodes[1].classList.remove('ptrNone')
    })
    marker.addEventListener("mouseleave", () => {
      hovering = false;
      marker.childNodes[1].classList.add('ptrNone')
    })

    return marker
  }


  function addTooltip(marker, markerType) {

    let tt1t, tt2t
    //// Add text to header
    if (markerType === "lowRisk") tt1t = "This website is safe"
    else if (markerType === "mediumRisk") tt1t = "This website is quite safe"
    else tt1t = "This website is not safe"

    //// Add text to body
    if (markerType === "lowRisk") tt2t = "• Secure Link\r• Clear Privacy Policy"
    else if (markerType === "mediumRisk") tt2t = "• Secure Link\r• Unclear Privacy Policy\r• 3rd Party Cookies"
    else tt2t = "• Unsecure Link\r• 3rd Party Cookies\r• Adult Social Media"

    const tooltip = createElem('div', ['tooltip', 'FSV', 'ptrNone'], { onclick: cookiesPopup }, [
      createElem('div', ['tt1', 'font-tt'], { innerHTML: tt1t }),
      createElem('div', ['tt2'], { innerHTML: tt2t })
    ])

    marker.appendChild(tooltip);
  }

  function cookiesPopup() {

    function fadeOut() {
      document.querySelector('.pbg').classList.add('pc-1-fade-out');
      document.querySelector('.pctr').classList.add('pc-2-fade-out');
      setTimeout(() => document.querySelector('body').removeChild(document.querySelector('.pbg')), 600);
    }

    const cookiesPopup = createElem('div', ['pbg', 'pc-1', 'full', 'FC'], { onclick: () => fadeOut() }, [ // Popup Background
      createElem('div', ['pctr', 'pc-2', 'pc-2-fade-in', 'FSV', 'bsh', 'rel', 'ptr'], {}, [ // Popup Container
        createElem('img', ['pc-3', 'of-cont', 'f'], { src: chrome.runtime.getURL(`/media/cookiesVideo2.png`) }),
        createElem('div', ['FC', 'f', 'abs'], {}, [ // pc4a
          createElem('div', ['pc-4', 'FC', 'ptr', 'font-title', 'bsh'], { innerHTML: 'Play video >' }) // pc4
        ])
      ])
    ])

    document.querySelector('body').appendChild(cookiesPopup)
  }

  function createElem(type, styles, attr, children) {
    const elem = document.createElement(type)
    elem.classList.add(...styles)
    for (const [key, val] of Object.entries(attr)) elem[key] = val
    if (!children) return elem
    for (child of children) elem.appendChild(child)
    return elem
  }
}


runRanking();