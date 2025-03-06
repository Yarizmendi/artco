

export function saveCanvasHandler({ p }) {
    const saveCanvasHandler = () => p.saveCanvas("test")
    const saveCanvasBtn = document.getElementById("saveCanvasBtn")
    saveCanvasBtn.addEventListener("click", saveCanvasHandler )
}

export const SaveCanvasButton = () => {
  return (
    <button id={"saveCanvasBtn"} className="text-xs p-1 flex items-center w-fit border gap-1">
      <span className={"material-symbols-outlined"}>{"download"}</span>
      <p>print</p>
    </button>
  )
}

export function createPlayButton({ isPlaying }) {
  const playBtn = document.getElementById("playBtn")
  const playBtnLabel = document.getElementById("playBtnLabel")

  const playHandler = () => (isPlaying = !isPlaying)

  if (!isPlaying) {
    isPlaying = true
    playBtnLabel.innerHTML = "pause"
  }
  else {
    isPlaying = false
    playBtnLabel.innerHTML = "play"
  }

  playBtn.addEventListener("click", playHandler)
}

export const playButton = ({ p, children }) => {
return (
  <div>
      {children}
      <span className={"material-symbols-outlined"}>{"download"}</span>
      <label id="playBtnLabel">play</label>
  </div>
  )
}

