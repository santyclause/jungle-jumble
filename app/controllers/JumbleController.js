import { jumbleService } from "../services/JumbleService.js"
import { AppState } from "../AppState.js";
import { setHTML, setText } from "../utils/Writer.js";

export class JumbleController {
  constructor() {
    this.interval = null
    this.timerStarted = false
    AppState.on('activeJumble', this.drawActiveJumble)
    AppState.on('jumbles', this.drawJumbleList)
    this.drawJumbleList()
  }


  drawJumbleList() {
    const jumbles = AppState.jumbles;
    let jumbleListCont = '';
    jumbles.forEach((jumble) => jumbleListCont += jumble.listTemplate)

    setHTML('jumble-list', jumbleListCont)
  }

  drawActiveJumble() {
    const activeJumble = AppState.activeJumble
    setHTML('active-jumble', activeJumble.activeJumbleTemplate)
  }

  selectJumble(selectedId) {
    jumbleService.selectJumble(selectedId)
  }

  checkCorrect() {
    const activeJumble = AppState.activeJumble
    const userText = event.target
    if (userText.value == activeJumble.content) {
      this.stopTimer();
      setTimeout(this.reportSuccess, 50)
    }
  }

  reportSuccess() {
    alert('nice you got it')
  }

  startTimer() {
    if (AppState.activeJumble == null) {
      return
    }
    if (!this.timerStarted) {
      AppState.currentTime = 0
      this.interval = setInterval(this.incrementTimer, 100)
      this.timerStarted = true;
    }
  }

  incrementTimer() {
    AppState.currentTime += .1
    drawTimer()
  }

  stopTimer() {
    clearInterval(app.JumbleController.interval)
  }

}

function drawTimer() {
  setText('timer', AppState.currentTime.toFixed(1))
}

