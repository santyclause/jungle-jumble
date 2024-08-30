import { AppState } from "../AppState.js"
import { Jumble } from "../models/Jumble.js"
import { saveState } from "../utils/Store.js"
import { loadState } from "../utils/Store.js"

class JumbleService {

  selectJumble(selectedId) {
    const jumbles = AppState.jumbles
    let foundJumble = jumbles.find((jumble) => jumble.id == selectedId)
    AppState.activeJumble = foundJumble
  }

  stopTimer() {
    AppState.activeJumble.endTime = AppState.currentTime.toFixed(1)
    this.compareTimes();
    AppState.currentTime = 0
  }

  resetTimer() {
    AppState.currentTime = 0;
  }

  compareTimes() {
    let fastestTime = AppState.activeJumble.fastestTime
    if (fastestTime == "No Record") {
      fastestTime = 10000;
    }
    if (AppState.currentTime < fastestTime) {
      AppState.activeJumble.fastestTime = AppState.currentTime.toFixed(1)
      this.saveJumbles()
      AppState.emit('jumbles')
      AppState.emit('activeJumble')
    }
  }

  saveJumbles() {
    saveState('jumbles', AppState.jumbles);
  }

  loadJumbles() {
    const jumblesFromStorage = loadState('jumbles', [Jumble])
    AppState.jumbles = jumblesFromStorage
  }
}

export const jumbleService = new JumbleService()