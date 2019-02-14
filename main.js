const overlay = document.getElementsByClassName('overlay')[0]
const iframe = document.getElementById('embedded-iframe')
const iframeRects = iframe.getClientRects()[0]
const box = document.createElement('div')
box.classList.add('box')
const rectBuffer = []

window.addEventListener('message', handleMessage, false)

function handleMessage(event) {
  const { msg, payload } = event.data

  // Setup new buffer
  if (rectBuffer.length !== payload.length) {
    let newBox

    // Clear overlay
    overlay.childNodes.forEach(child => overlay.removeChild(child))
    
    for(let i = 0; i < payload.length; i++) {
      let elem = payload[i]
      newBox = box.cloneNode()

      overlay.appendChild(newBox)
      rectBuffer.push({ id: elem.id, domNode: newBox })
    }
  }

  window.requestAnimationFrame(_ => {
    for (let elem of payload) {
      const cachedElem = rectBuffer.find(e => e.id === elem.id)
      
      if (!cachedElem) {
        continue
      }

      cachedElem.domNode.setAttribute('style', calculateStyle(elem.rects))
    }
  })
}

function calculateStyle(rects) {
  return `width: ${rects.width}px; height: ${rects.height}px; top: ${rects.top + iframeRects.top}px; left: ${rects.left + iframeRects.left}px`
}
