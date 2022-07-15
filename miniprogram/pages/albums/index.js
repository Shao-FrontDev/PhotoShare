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
    loadingIndex: 0,
    observer: null,
    preloadImage: [],
    albumsData: null,
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

    this.setData(
      {
        type: options.type,
        banner: randomBanner,
      },
      () => {
        this.setData({ loading: false });
        const timer = setTimeout(() => {
          this.setIntersectionObserver();
          clearTimeout(timer);
        }, 1000);
      }
    );
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
    const images = this.albums.slice(
      this.loadingIndex,
      this.loadingIndex + PAGE_COUNT
    );
  },
  setIntersectionObserver() {
    const observer = wx.createIntersectionObserver().relativeToViewport();
    observer.observe(".bottom-guard", (e) => {
      console.log("watching");
      const newData = this.data.albumsData.slice(
        this.data.loadingIndex,
        this.data.loadingIndex + PAGE_COUNT
      );
      this.data.preloadImage = [...this.data.preloadImage, ...newData];

      if (this.data.preloadImage.length > this.data.albumsData.length * 2) {
        console.log("已经超出长度");
      } else {
        this.setData({
          albums: this.data.preloadImage,
        });
      }
    });
  },
});
