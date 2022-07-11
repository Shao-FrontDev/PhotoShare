Page({
  data: {
    indicatorDots: false,
    autoplay: false,
    circular: false,
    duration: 500,
    images: [],
    currentIndex: 0,
  },
  async onLoad(options) {
    console.log("🚀 ~ file: index.js ~ line 12 ~ onLoad ~ options", options);
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
});
