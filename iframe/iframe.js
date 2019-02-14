;(function() {
  const dropables = document.getElementsByClassName('dropable')

  const sendUpdatedRects = _ => postMessage('rectsUpdated', getRects(Array.from(dropables)))

  window.addEventListener('load', sendUpdatedRects)
  window.addEventListener('scroll', sendUpdatedRects)

})()

////////

function getRects(domElements) {
  return domElements
    .map(elem => ({ id: elem.id, rects: elem.getClientRects()[0] }))

}

function postMessage(msg, payload) {
  window.parent.postMessage({ msg, payload }, '*')
}
