Page({
  data: {
    indicatorDots: false,
    autoplay: false,
    circular: false,
    interval: 2000,
    duration: 800,
    images: [],
  },
  async onLoad(options) {
    const imageId = options.id;
    console.log("🚀 ~ file: index.js ~ line 14 ~ onLoad ~ imageId", imageId);
    const {
      result: { data },
    } = await wx.cloud.callFunction({
      name: "getAlbumsImages",
    });
    const albumsData = data.filter((element) => {
      return element._id === imageId;
    });

    this.setData({
      images: albumsData,
    });
  },
});
