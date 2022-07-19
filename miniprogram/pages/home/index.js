// pages/home/index.js

const mMgr = wx.getBackgroundAudioManager();
mMgr.title = "Crush";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cards: {},
    loading: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const { result } = await wx.cloud.callFunction({
      name: "getImagesCategories",
    });

    const cards = result.data;
    this.setData(
      {
        cards: cards,
      },
      () => {
        const timer = setTimeout(() => {
          this.setData({ loading: false });
          clearTimeout(timer);
        }, 1000);
      }
    );
    this.onPlay();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
  jumpToAlbums(event) {
    const { type } = event.target.dataset;
    wx.navigateTo({
      url: "/pages/albums/index?type=" + type,
    });
  },

  /**
   * @param  {} {}
   */
  onPlay() {
    mMgr.src = "http://music.163.com/song/media/outer/url?id=442682.mp3";
    console.log("🚀 ~ file: index.js ~ line 82 ~ onPlay ~ mMgr", mMgr);
  },
});
