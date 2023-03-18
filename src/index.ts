import { createApp } from "vue/dist/vue.esm-browser";

import SmartUI from "./entry";

createApp({
  template: `
    <div>
      <SFCButton size="medium" color="blue">蓝色按钮</SFCButton>
      <SFCButton color="green">绿色按钮</SFCButton>
      <SFCButton color="gray">灰色按钮</SFCButton>
      <SFCButton color="yellow">黄色按钮</SFCButton>
      <SFCButton color="red" icon="search">红色按钮</SFCButton>
    </div>
  `,
})
  .use(SmartUI)
  .mount("#app");
