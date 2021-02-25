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

console.log("test2")

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
  //// Create divs
  const tooltip = document.createElement("div");
  tooltip.classList.add("tooltip", "FSV");
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
  else if (markerType === "mediumRisk") tt2.innerHTML = "• Secure Link\r• Unclear Privacy Policy"
  else tt2.innerHTML = "• Unsecure Link\r• 3rd Party Cookies"
  
  //// Add to DOM
  tooltip.appendChild(tt1);
  tooltip.appendChild(tt2);
  marker.appendChild(tooltip);
}