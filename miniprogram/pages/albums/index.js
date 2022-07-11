// pages/albums/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    banner: {},
    albums: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const db = wx.cloud.database();
    db.collection("imageCategories")
      .where({
        _id: options.type,
      })
      .get()
      .then((res) => {
        const banner = res.data[0];
        this.setData({
          banner: banner,
        });
      });

    const {
      result: { data },
    } = await wx.cloud.callFunction({
      name: "getAlbumsImages",
    });
    const albumsData = data.filter((element) => {
      return element.type === options.type;
    });

    this.setData({
      albums: albumsData,
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
});
