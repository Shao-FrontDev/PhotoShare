// app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error("请使用 2.2.3 或以上的基础库以使用云能力");
    } else {
      const cloud = wx.cloud;

      cloud.init({
        env: "fujix-8gsjvbxo8f4f8d32",
        traceUser: true,
      });

      this.globalData = {};
    }
  },
});
