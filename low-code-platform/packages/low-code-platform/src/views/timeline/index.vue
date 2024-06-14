<template>
  <div>
    <ul class="el-timeline is-reverse">
      <li class="el-timeline-item">
        <div class="el-timeline-item__tail"></div>
        <div class="el-timeline-item__dot">
          <span class="vab-dot vab-dot-error">
            <span></span>
          </span>
        </div>
        <div class="el-timeline-item__wrapper">
          <div class="el-timeline-item__content">支持error闪动</div>
          <div class="el-timeline-item__timestamp is-bottom">2021-04-05 20:46</div>
        </div>
      </li>
      <li class="el-timeline-item">
        <div class="el-timeline-item__tail"></div>
        <div class="el-timeline-item__dot">
          <span class="vab-dot vab-dot-success">
            <span></span>
          </span>
        </div>
        <div class="el-timeline-item__wrapper">
          <div class="el-timeline-item__content">支持success闪动</div>
          <div class="el-timeline-item__timestamp is-bottom">2021-04-05 20:46</div>
        </div>
      </li>
      <li class="el-timeline-item">
        <div class="el-timeline-item__tail"></div>
        <div class="el-timeline-item__node el-timeline-item__node--normal el-timeline-item__node--" style="background-color: rgb(228, 231, 237);"><!----></div><!----><div class="el-timeline-item__wrapper"><!----><div class="el-timeline-item__content"> 支持默认颜色 </div><div class="el-timeline-item__timestamp is-bottom">
        2021-04-03 20:46
      </div></div></li>
      <li class="el-timeline-item"><div class="el-timeline-item__tail"></div><div class="el-timeline-item__node el-timeline-item__node--normal el-timeline-item__node--" style="background-color: rgb(19, 206, 102);"><!----></div><!----><div class="el-timeline-item__wrapper"><!----><div class="el-timeline-item__content"> 支持自定义颜色 </div><div class="el-timeline-item__timestamp is-bottom">
        2021-04-03 20:46
      </div></div></li>
      <li class="el-timeline-item"><div class="el-timeline-item__tail"></div><!----><div class="el-timeline-item__dot"><i data-v-79aac9d9="" aria-hidden="true" class="ri-archive-line"></i><!----></div><div class="el-timeline-item__wrapper"><!----><div class="el-timeline-item__content"> 支持使用小清新图标 </div><div class="el-timeline-item__timestamp is-bottom">
        2021-04-18 20:46
      </div></div></li>
      <li class="el-timeline-item"><div class="el-timeline-item__tail"></div><!----><div class="el-timeline-item__dot"><i data-v-79aac9d9="" aria-hidden="true" class="ri-account-circle-line"></i><!----></div><div class="el-timeline-item__wrapper"><!----><div class="el-timeline-item__content"> 支持使用小清新图标 </div><div class="el-timeline-item__timestamp is-bottom">
        2021-04-12 20:46
      </div></div>
      </li>
    </ul>
  </div>
</template>
<script setup>

</script>
<style lang="less" scoped>
.el-timeline {
  margin: 0;
  font-size: 14px;
  list-style: none;
}
.el-timeline-item {
  position: relative;
  padding-bottom: 20px;
}
.el-timeline-item__tail {
  position: absolute;
  left: 4px;
  height: 100%;
  border-left: 2px solid #e4e7ed;
}
.el-timeline-item__dot {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
}
.vab-dot{
  position: relative;
  display: inline-block;
  margin-right: 3px;
  vertical-align: middle;
  border-radius: 50%;
  background: #ff4d4f;
  left: -1px;
  width: 12px;
  height: 12px;
  margin: auto !important;
  span {
    position: absolute;
    top: 0;
    left: 0;
    box-sizing: border-box;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    animation: vabDot 1.2s ease-in-out infinite;
  }
}
.vab-dot-error span {
  background: #ff191c;
}
@keyframes vabDot {
  0% {
    opacity: .6;
    transform: scale(.8);
  }
  100% {
      opacity: 0;
      transform: scale(2.4);
  }
}
.el-timeline-item__wrapper {
    position: relative;
    padding-left: 28px;
    top: -3px;
}
.el-timeline-item__content {
    color: #303133;
}
.el-timeline-item__timestamp {
    color: #909399;
    line-height: 1;
    font-size: 13px;
}
.el-timeline-item__timestamp.is-bottom {
    margin-top: 8px;
}
</style>