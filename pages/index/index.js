//index.js
import FiveStone from '../../FiveStone/FiveStone';

(function () {
  //获取应用实例
  var app = getApp();

  /**
   * 控制下子提示的视图显示
   */
  function handleTip(e) {
    const self = getCurrentPages()[0];
    const stepTipPos = self.fiveStone.getStepPosition(e);
    self.loc = self.fiveStone.getStepLocation(e);
    if (stepTipPos == null) {
      self.setData({
        showStepTip:false
      });
      return;
    }
    self.setData({
      'stepTipPos':stepTipPos,
      showStepTip:true
    });
  }

  Page({
    data: {
      showStepTip:false,
      stepTipPos:{
        x:0,
        y:0
      }
    },
    onChessBoardTouchStart: function (e) {
      handleTip(e);
    },
    onChessBoardTouchMove: function (e) {
      handleTip(e);
    },
    onChessBoardTouchEnd: function (e) {
      this.setData({
        showStepTip:false
      });
      const loc = this.loc;
      if (loc != null) {
        this.fiveStone.step(loc.x, loc.y);
        this.setData({
          'fiveStone':this.fiveStone
        });
      }
    },
    /**
     * 重来
     */
    restart: function () {
      this.fiveStone.restart();
      this.refreshFiveStone();
    },
    /**
     * 悔棋
     */
    undo: function () {
      this.fiveStone.undo();
      this.refreshFiveStone();
    },
    refreshFiveStone: function () {
      this.setData({
        'fiveStone':this.fiveStone
      });
    },
    onLoad: function () {
      console.log('onLoad')
      //初始化棋盘
      this.fiveStone = new FiveStone(15, 0.9);
      this.setData({
        'fiveStone':this.fiveStone
      });

      this.loc = null;

      var that = this;
      //调用应用实例的方法获取全局数据
      app.getUserInfo(function(userInfo){
        //更新数据
        that.setData({
          userInfo:userInfo
        })
      })
    }
  })
})();
