  function runForeground() {

  // Remove existing markers
  const existingMarkers = document.querySelectorAll(".marker")
  for (marker of existingMarkers) {
    marker.parentElement.removeChild(marker);
  }

  // Add new markers
  const searchResults = document.querySelectorAll(".yuRUbf, .nDgy9d")
  for (result of searchResults) {
    // result.classList.add("test");
    // const marker = document.createElement("div")
    // marker.classList.add("marker");
    

    const markerChoice = Math.random();
    let markerType;
    if (markerChoice < 0.75) markerType = "lowRisk"
    else if (markerChoice < 0.92) markerType = "mediumRisk"
    else markerType = "highRisk"
    // marker.classList.add(markerType);
    const marker = addPaw(markerType)
    addTooltip(marker, markerType);
    result.appendChild(marker);
  }
}

function addTooltip(elem, markerType) {
  const tooltip = document.createElement("div");
  tooltip.classList.add("tooltip");
  if (markerType === "lowRisk") tooltip.innerHTML = "This website is safe"
  else if (markerType === "mediumRisk") tooltip.innerHTML = "This website is quite safe"
  else tooltip.innerHTML = "This website is not safe"
  elem.appendChild(tooltip);
}

runForeground();

function addPaw(markerType) {
  const marker = document.createElement("img")
  const url = chrome.runtime.getURL(`/media/paw_${markerType}.svg`);
  marker.src = url;
  marker.classList.add("paw");
  return marker
}