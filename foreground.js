function runForeground() {

  // Remove existing markers
  const existingMarkers = document.querySelectorAll(".marker")
  for (marker of existingMarkers) {
    marker.parentElement.removeChild(marker);
  }

  // Add new markers
  const searchResults = document.querySelectorAll(".yuRUbf, .nDgy9d")
  for (result of searchResults) {

    const markerChoice = Math.random();
    let markerType;
    if (markerChoice < 0.8) markerType = "lowRisk"
    else if (markerChoice < 0.95) markerType = "mediumRisk"
    else markerType = "highRisk"

    const marker = addPaw(markerType)
    addTooltip(marker, markerType);
    result.appendChild(marker);
  }
}

runForeground();

function addPaw(markerType) {
  const marker = document.createElement("div")
  marker.classList.add(markerType, "marker");

  const image = document.createElement("img")
  const url = chrome.runtime.getURL(`/media/paw_${markerType}.svg`);
  image.src = url;
  image.classList.add("paw");

  marker.appendChild(image);

  return marker
}

function addTooltip(marker, markerType) {
  const tooltip = document.createElement("div");
  tooltip.classList.add("tooltip");
  if (markerType === "lowRisk") tooltip.innerHTML = "This website is safe"
  else if (markerType === "mediumRisk") tooltip.innerHTML = "This website is quite safe"
  else tooltip.innerHTML = "This website is not safe"
  marker.appendChild(tooltip);
}