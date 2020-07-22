<template>
  <div class="show-box">
    <div class="show-bg">
      <a
        href="javascript:;"
        class="index_v3style_am ww_indexExplore ww_indexExplore_explore_00050"
        id="js_road_am3"
        ref="roadImgBg"
        style="opacity: 0"
      ></a>
      <a
        href="javascript:;"
        ref="roadImg"
        class="index_v3style_am ww_indexExplore ww_indexExplore_explore_00025"
        id="js_road_am"
      ></a>
    </div>
  </div>
</template>

<script>
export default {
  mounted () {
    /* eslint-disable */
    console.log(this.$refs.roadImg);
    const aDomBg = this.$refs.roadImgBg;
    !(function e (i) {
      window.requestAnimationFrame(function() {
        i > 50 ? console.log('preload finish')
          : (aDomBg &&
              (aDomBg.className =
                'index_v3style_am ww_indexExplore ww_indexExplore_explore_000' + (i < 9 ? '0' + i : i)),
          e(++i))
      })
    })(0)
    const aDom = this.$refs.roadImg
    let i = 0
    let o = !1
    setTimeout(() => {
      this.setIntervalRecord = setInterval(() => {
        if (i > 50) {
          i = 0
        }
        i++
        /* o ||  */ window.requestAnimationFrame(function () {
          /* if (o) {
            (o = !1) */
          let index
          if (i < 10) {
            index = '0' + i
          } else {
            index = i
          }
          aDom.className = 'index_v3style_am ww_indexExplore ww_indexExplore_explore_000' + index
          /* } */
          
        })
        o = !0
        console.log('执行了' + i)
      }, 64)
    }, 200)
    
    // 当前组件销毁后 取消定时器
    // 使用钩子函数 阅读方便  便于管理
    this.$once('hook:beforeDestroy', () => {
       // this.setIntervalRecord = null
       clearInterval(this.setIntervalRecord)
    })
    /* var e = $("#js_road_am").get(0),
      n = $("#js_road_am3").get(0),
      i = ($(".js_index_video_playBtn"), $(".js_index_videoDialogCLose"), 0),
      o = !1;
    $(window).load(function() {
      !(function e(i) {
        window.requestAnimationFrame(function() {
          i > 50
            ? console.log("preload finish")
            : (n &&
                (n.className =
                  "index_v3style_am ww_indexExplore ww_indexExplore_explore_000" +
                  t(i)),
              e(++i));
        });
      })(0),
      setTimeout(function() {
        setInterval(function() {
          i >= 50 ? (i = 0) : i++,
            o ||
              window.requestAnimationFrame(function() {
                o &&
                  ((o = !1),
                  e &&
                    (e.className =
                      "index_v3style_am ww_indexExplore ww_indexExplore_explore_000" +
                      t(i)));
              }),
            (o = !0);
        }, 64);
      }, 200);
    }); */
  }
}
</script>

<style lang="scss" scoped>
// https://wwcdn.weixin.qq.com/node/wwnl/wwnl/style/images/indexExplore$623b392c.png
@import "./style/index.scss";
.show-box {
  background-color: #000e36;
  padding-top: 5px;
  position: relative;
  height: 580px;
  .show-bg {
    position: absolute;
    left: 50%;
    top: 0;
    z-index: 2;
    width: 1300px;
    height: 580px;
    margin-left: -650px;
    background-position: center bottom;
    background-repeat: no-repeat;
    background-image: url("./images/bg.jpg");
  }
}
</style>
