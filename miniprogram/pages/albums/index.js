// pages/albums/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    banner: {},
    albums: {},
    type: {},
    loading: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const {
      result: { data },
    } = await wx.cloud.callFunction({
      name: "getAlbumsImages",
    });
    const albumsData = data.filter((element) => {
      return element.type === options.type;
    });

    const randomIndexInAlbums = Math.floor(Math.random() * albumsData.length);
    const randomBanner = albumsData[randomIndexInAlbums];
    this.setData({
      albums: albumsData,
      type: options.type,
      banner: randomBanner,
    });

    this.setData({
      loading: false,
    });
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
  jumptoPhoto(event) {
    const imageId = event.currentTarget.dataset.id;
    console.log(this);
    wx.navigateTo({
      url: `/pages/photo/index?type=${this.data.type}&current=${imageId}`,
    });
  },
});
