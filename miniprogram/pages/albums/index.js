// pages/albums/index.js

const PAGE_COUNT = 9;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    banner: {},
    albums: [],
    type: {},
    loading: true,
    loadIndex: 0,
    observer: null,
    preloadImage: [],
    albumsData: null,
    loading: false,
    rendering: false,
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
    this.data.albumsData = data.filter((element) => {
      return element.type === options.type;
    });

    const randomIndexInAlbums = Math.floor(
      Math.random() * this.data.albumsData.length
    );
    const randomBanner = this.data.albumsData[randomIndexInAlbums];

    // 先加载10张照片

    this.setData({
      type: options.type,
      banner: randomBanner,
      loading: false,
    });

    this.loadMore();
    this.setIntersectionObserver();
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
    wx.navigateTo({
      url: `/pages/photo/index?type=${this.data.type}&current=${imageId}`,
    });
  },

  loadMore() {
    if (this.data.loading || this.data.rendering) {
      return;
    }
    if (this.data.loadIndex > this.data.albumsData) {
      return;
    }
    this.data.loading = true;

    const imageList = this.data.albumsData.slice(
      this.data.loadIndex,
      this.data.loadIndex + PAGE_COUNT
    );

    this.data.loadIndex += PAGE_COUNT;

    const newData = [...this.data.albums, ...imageList];

    wx.nextTick(() => {
      this.setData({
        albums: newData,
      });
      this.data.loading = false;
    });
  },

  setIntersectionObserver() {
    console.log("setIntersectionObserver");
    const observer = wx.createIntersectionObserver().relativeToViewport();
    observer.observe(".bottom-guard", (e) => {
      console.log("watching");
      this.loadMore();
    });
  },
});
