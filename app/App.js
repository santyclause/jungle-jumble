import { JumbleController } from './controllers/JumbleController.js';
import { router } from './router-config.js';
const USE_ROUTER = false

class App {

  JumbleController = new JumbleController()

  constructor() {
    if (USE_ROUTER) {
      this.router = router
      this.router.init(this)
    }
  }

}

const app = new App()
// @ts-ignore
window.app = app
