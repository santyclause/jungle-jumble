import { AppState } from "../AppState.js"

class JumbleService {

  selectJumble(selectedId) {
    const jumbles = AppState.jumbles
    let foundJumble = jumbles.find((jumble) => jumble.id == selectedId)
    AppState.activeJumble = foundJumble
  }
}

export const jumbleService = new JumbleService()