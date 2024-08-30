import { jumbleService } from "../services/JumbleService.js"
import { AppState } from "../AppState.js";
import { setHTML, setText } from "../utils/Writer.js";

export class JumbleController {
  constructor() {
    this.interval = null
    this.timerStarted = false
    AppState.on('activeJumble', this.drawActiveJumble)
    AppState.on('jumbles', this.drawJumbleList)
    jumbleService.loadJumbles();
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
    this.resetTimer();
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
    if (!this.timerStarted) {
      AppState.currentTime = 0
      this.interval = setInterval(this.incrementTimer, 100)
      this.timerStarted = true;
    }
    document.getElementById('userInput').focus()
  }

  incrementTimer() {
    AppState.currentTime += .1
    drawTimer()
  }

  stopTimer() {
    clearInterval(app.JumbleController.interval)
    jumbleService.stopTimer()
    this.timerStarted = false;
    const userText = document.getElementById('userInput')
    userText.value = '';
  }

  resetTimer() {
    clearInterval(app.JumbleController.interval)
    jumbleService.resetTimer();
    this.timerStarted = false;
    const userText = document.getElementById('userInput')
    userText.value = '';
  }

}

function drawTimer() {
  setText('timer', AppState.currentTime.toFixed(1))
}

