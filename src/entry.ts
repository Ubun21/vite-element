import { App } from "vue";
import SFCButton from "./button/index";

export { SFCButton };

export default {
  install(app: App) {
    app.component(SFCButton.name as string, SFCButton);
  },
};
