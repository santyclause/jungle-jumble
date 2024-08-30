import { AppState } from "../AppState.js"

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
      AppState.emit('jumbles')
      AppState.emit('activeJumble')
    }
    console.log(fastestTime)
  }
}

export const jumbleService = new JumbleService()