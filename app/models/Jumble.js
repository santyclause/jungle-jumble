import { generateId } from "../utils/GenerateId.js"

export class Jumble {
  /**@param {{content: String; name: String, fastestTime?: number; endTime?: number; startTime?: number;}} data */
  constructor(data) {
    this.id = data.id || generateId()
    this.content = data.content
    this.name = data.name
    this.fastestTime = data.fastestTime || "No Record"
    this.endTime = null
    this.startTime = null
  }

  get listTemplate() {
    return `
    <section class="row mb-3" role="button" onclick="app.JumbleController.selectJumble('${this.id}'), app.JumbleController.startTimer()">
      <div class="col-3"><div class=" btn start-button">Start</div></div>
      <div class="col-3">${this.name}</div>
      <div class="col-3">${this.fastestTime}</div>
      <div class="col-3">WPM</div>
    </section>`
  }

  get activeJumbleTemplate() {
    return `
    <div class="d-flex justify-content-between">
      <h3>${this.name}</h3>
      <h3>${this.fastestTime}</h3>
    </div>
    <p>${this.content}</p>`
  }
}