function runForeground() {

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

    if(result.classList[0] === 'nDgy9d') {
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

    const marker = document.createElement("div")
    marker.classList.add(markerType, "marker");
    if (linkType === 'nDgy9d') marker.classList.add('nDgy9d');
    marker.addEventListener("mouseenter", () => {
      hovering = true;
      marker.childNodes[1].classList.remove('ptrNone')
    })
    marker.addEventListener("mouseleave", () => {
      hovering = false;
      marker.childNodes[1].classList.add('ptrNone')
    })

    const image = document.createElement("img")
    const url = chrome.runtime.getURL(`/media/paw_${markerType}.svg`);
    image.src = url;
    image.classList.add("paw");

    marker.appendChild(image);

    return marker
  }


  function addTooltip(marker, markerType) {
    //// Create divs
    const tooltip = document.createElement("div");
    tooltip.classList.add("tooltip", "FSV", "ptrNone");
    tooltip.onclick = cookiesPopup
    const tt1 = document.createElement("div");
    tt1.classList.add("tt1", "font-tt")
    const tt2 = document.createElement("div");
    tt2.classList.add("tt2")

    //// Add text to header
    if (markerType === "lowRisk") tt1.innerHTML = "This website is safe"
    else if (markerType === "mediumRisk") tt1.innerHTML = "This website is quite safe"
    else tt1.innerHTML = "This website is not safe"

    //// Add text to body
    if (markerType === "lowRisk") tt2.innerHTML = "• Secure Link\r• Clear Privacy Policy"
    else if (markerType === "mediumRisk") tt2.innerHTML = "• Secure Link\r• Unclear Privacy Policy\r• 3rd Party Cookies"
    else tt2.innerHTML = "• Unsecure Link\r• 3rd Party Cookies\r• Adult Social Media"

    //// Add to DOM
    tooltip.appendChild(tt1);
    tooltip.appendChild(tt2);
    marker.appendChild(tooltip);
  }


  function cookiesPopup() {

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


    function fadeOut(popupBackground, popupContainer) {

      popupBackground.classList.add('pc-1-fade-out');
      // popupContainer.classList.toggle('pc-2-fade-in');
      popupContainer.classList.add('pc-2-fade-out');
    
      setTimeout(function() {
        const body = document.querySelector('body');
        body.removeChild(popupBackground);
      }, 600);
    }
  }
}

runForeground();



