<template>
  <div class="whirl">
    <div class="cover-wrapper">
      <img class="under-img" src="//static.36krcdn.com/36kr-web/static/bg_03@2x.4dd9e673.png" alt="">
      <img class="cover-img" src="//static.36krcdn.com/36kr-web/static/bg_01@2x.95bb7231.png" alt="bg-cover">
      <div class="deco">
        <img src="//static.36krcdn.com/36kr-web/static/bg_02_01@2x.e387b2aa.png" alt="" class="deco-img-1">
        <img src="//static.36krcdn.com/36kr-web/static/bg_02_02@2x.c401b030.png" alt="" class="deco-img-2">
      </div>
      <div class="rotate-wrapper">
        <img src="//static.36krcdn.com/36kr-web/static/img_01@2x.0564db27.png" alt="decoration" class="circle-1">
        <img src="//static.36krcdn.com/36kr-web/static/img_02@2x.93039192.png" alt="decoration" class="circle-2">
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.whirl .cover-wrapper {
    position: relative;
    margin-top: 70px
}

.whirl .cover-wrapper .cover-img {
    position: relative;
    width: 100%;
    display: block;
    min-height: 56.25vw;
    z-index: 5
}

.whirl .cover-wrapper .under-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    display: block;
    min-height: 56.25vw;
    z-index: 0
}

.whirl .cover-wrapper .deco {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0
}

.whirl .cover-wrapper .deco .deco-img-1,.whirl .cover-wrapper .deco .deco-img-2 {
    position: absolute;
    width: 7.2%
}

.whirl .cover-wrapper .deco .deco-img-1 {
    top: 9.2%;
    right: 40%;
    -webkit-animation: horizonMove1 2.5s linear infinite;
    animation: horizonMove1 2.5s linear infinite
}

.whirl .cover-wrapper .deco .deco-img-2 {
    bottom: 3.3%;
    right: 25.7%;
    -webkit-animation: horizonMove2 2.5s linear infinite;
    animation: horizonMove2 2.5s linear infinite
}

.whirl .cover-wrapper .rotate-wrapper {
    position: absolute;
    top: 50%;
    left: 5.5%;
    width: 394px;
    height: 788px;
    width: 20.5%;
    height: 73%;
    overflow: hidden;
    transform: translateY(-50%);
    z-index: 10
}

.whirl .cover-wrapper .rotate-wrapper .circle-1 {
    position: absolute;
    height: 100%;
    right: 0;
    -webkit-animation: antiClockwise 30s linear infinite;
    animation: antiClockwise 30s linear infinite
}

.whirl .cover-wrapper .rotate-wrapper .circle-2 {
    position: absolute;
    height: 81%;
    top: 9%;
    right: 18%;
    -webkit-animation: clockwise 30s linear infinite;
    animation: clockwise 30s linear infinite
}

@keyframes horizonMove1 {
    0% {
        opacity: 0;
        transform: translateX(0)
    }

    5% {
        opacity: 0;
        transform: translateX(5%)
    }

    10% {
        opacity: 1;
        transform: translateX(10%)
    }

    30% {
        opacity: 1;
        transform: translateX(30%)
    }

    50% {
        opacity: 0;
        transform: translateX(50%)
    }

    to {
        opacity: 0;
        transform: translateX(50%)
    }
}

@-webkit-keyframes horizonMove2 {
    0% {
        opacity: 0;
        transform: translateX(0)
    }

    5% {
        opacity: 0;
        transform: translateX(10%)
    }

    10% {
        opacity: 1;
        transform: translateX(20%)
    }

    30% {
        opacity: 1;
        transform: translateX(60%)
    }

    50% {
        opacity: 0;
        transform: translateX(100%)
    }

    to {
        opacity: 0;
        transform: translateX(100%)
    }
}

@keyframes horizonMove2 {
    0% {
        opacity: 0;
        transform: translateX(0)
    }

    5% {
        opacity: 0;
        transform: translateX(10%)
    }

    10% {
        opacity: 1;
        transform: translateX(20%)
    }

    30% {
        opacity: 1;
        transform: translateX(60%)
    }

    50% {
        opacity: 0;
        transform: translateX(100%)
    }

    to {
        opacity: 0;
        transform: translateX(100%)
    }
}

@-webkit-keyframes move {
    0% {
        transform: translateX(0)
    }

    to {
        transform: translateX(-50%)
    }
}

@keyframes move {
    0% {
        transform: translateX(0)
    }

    to {
        transform: translateX(-50%)
    }
}

@-webkit-keyframes clockwise {
    0% {
        transform: rotate(0deg)
    }

    to {
        transform: rotate(1turn)
    }
}

@keyframes clockwise {
    0% {
        transform: rotate(0deg)
    }

    to {
        transform: rotate(1turn)
    }
}

@-webkit-keyframes antiClockwise {
    0% {
        transform: rotate(0deg)
    }

    to {
        transform: rotate(-1turn)
    }
}

@keyframes antiClockwise {
    0% {
        transform: rotate(0deg)
    }

    to {
        transform: rotate(-1turn)
    }
}
</style>
