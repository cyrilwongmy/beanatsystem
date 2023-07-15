import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  base: "/beanatsystem/",

  locales: {
    "/": {
      lang: "en-US",
      title: "Docs Demo",
      description: "A docs demo for vuepress-theme-hope",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "主页",
      description: "vuepress-theme-hope 的文档演示",
    },
  },

  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        // 启用 figure
        figure: true,
        // 启用图片懒加载
        imgLazyload: true,
        // 启用图片标记
        imgMark: true,
        // 启用图片大小
        imgSize: true,
      }

    }
  }),


  // Enable it with pwa
  // shouldPrefetch: false,

});
