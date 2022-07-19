const PAGE_COUNT = 10;
Page({
  data: {
    indicatorDots: false,
    duration: 500,
    images: [],
    currentIndex: 0,
    takePhoto: false,
    autoplay: false,
  },
  async onLoad(options) {
    const { current, type } = options;
    const {
      result: { data },
    } = await wx.cloud.callFunction({
      name: "getAlbumsImages",
    });

    const albumsData = data.filter((element) => {
      return element.type === type;
    });

    const currentIndex = albumsData.findIndex((element) => {
      return element._id === current;
    });

    this.setData({
      currentIndex: currentIndex,
      images: albumsData,
    });
  },
  takePhoto() {
    console.log("takePhoto");

    this.setData({
      autoplay: !this.data.autoplay,
    });
  },
  handlerChange() {
    console.log("handlerChange");
    this.setData({
      autoplay: true,
    });
  },
});
