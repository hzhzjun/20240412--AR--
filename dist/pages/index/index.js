Page({
    data: {
      data: {
        type: 'demo',
        name: '',
        background: 'rgba(255, 255, 255, 0)',
        backgroundColor: 'yellow',
        backgroundImage: '',
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 24,
        paddingBottom: 24,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 24,
        marginBottom: 0,
        borderRadius: {
          lt: 0,
          rt: 0,
          lb: 0,
          rb: 0
        },
        zIndex: false,
        borderWidth: 0,
        borderStyle: 'solid',
        borderColor: 'rgba(0, 0, 0, 1)',
        boxShadowX: 0,
        boxShadowY: 0,
        boxShadowBlur: 0,
        boxShadowWidth: 0,
        boxShadowColor: 'rgba(0, 0, 0, 1)',
        boxShadowInset: '',
        controlled: false,
        backdropFilter: 0,
        customData: {
          text: '我是开自定义文案的内容'
        }
      }
    },
    onLoad() {
        this.jumpPage();
    },
    jumpPage() {
        const page = this.options.page;
        if (page) {
            setTimeout(() => {
                wx.navigateTo({
                    url: decodeURIComponent(page)
                });
                delete this.options.page;
            }, 100);
        }
    },
    onShow() {
        const updateManager = wx.getUpdateManager();
        updateManager.onCheckForUpdate(function (res) {
            if (res.hasUpdate) {
                updateManager.onUpdateReady(function () {
                    wx.showModal({
                        title: '更新提示',
                        content: '新版本已经准备好，是否重启应用？',
                        success(res) {
                            if (res.confirm)
                                updateManager.applyUpdate();
                        }
                    });
                });
            }
        });
    },
    handleTap() {
      wx.navigateTo({
        url: `/packageDB_chocolate/pages/loadPage/loadPage`
      })
    }
});
