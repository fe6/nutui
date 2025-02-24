<template>
  <!-- <div class="v3-banner" :class="{ active: true }">
    NutUI 正在参与 OSC 2021 年度中国开源项目评选（您的鼓励是我们坚持不懈的源动力)，请为我们投上宝贵的一票吧。
    <a href="https://www.oschina.net/project/top_cn_2021/?id=65&fr=nutui" target="_blank">去投票</a>
  </div> -->
  <div class="doc-header" :class="themeName()">
    <div class="header-logo">
      <a class="logo-link" :class="{ [language]: language, jdb: isJDB() }" @click="toHome"></a>
      <span class="logo-border"></span>
      <span class="version" v-if="language == 'vue' && isJDB() == false">{{ version }}</span>
    </div>
    <div class="header-nav">
      <Search />
      <div class="nav-box">
        <ul class="nav-list">
          <li class="nav-item" v-for="item in header" :key="item.name" :class="{ active: isActive(item.name) }">
            <a @click="toLink(item)">
              {{ isZh ? item.cName : item.eName }}
            </a>
          </li>
          <li v-if="language == 'vue'" class="nav-item" @click="translate">En/中</li>
          <li class="nav-item">
            <a class="user-link" target="_blank" v-if="repository.git" :href="repository.git"></a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, computed, onMounted } from 'vue';
import Search from './Search.vue';
import { header, version, nav, repository, language } from '@/sites/docs_vue/config/index';
import { RefData } from '@/sites/docs_vue/assets/util/ref';
import { useRouter } from 'vue-router';
import { useLocale } from '@/sites/docs_vue/assets/util/locale';
import { isJDB } from '@/sites/docs_vue/assets/util/index';
export default defineComponent({
  name: 'doc-header',
  components: {
    Search
  },
  setup() {
    const router = useRouter();
    let packages = [] as any[];
    nav.forEach((item: any) => {
      packages.push(...item.packages);
    });
    const data = reactive({
      theme: 'black',
      verson: language == 'vue' ? '3.x' : '1.x',
      navIndex: 0,
      activeIndex: 2,
      isShowGuid: false
    });
    let { currentLang, isZh, isEn } = useLocale();

    const translate = async () => {
      let location = window.location;

      if (currentLang.value == 'zh-CN') {
        location.href = location.href.replace('zh-CN', 'en-US');
        currentLang.value = 'en-US';
        // postmessage
      } else {
        location.href = location.href.replace('en-US', 'zh-CN');
        currentLang.value = 'zh-CN';
        // postmessage
      }
    };

    const handleGuidFocusOut = () => {
      data.isShowGuid = false;
    };

    const onMouseHover = (flag: any) => {
      data.isShowGuid = flag;
    };

    const toHome = () => {
      if (isJDB()) {
        return;
      }
      RefData.getInstance().currentRoute.value = '/';
      window.location.href = `${location.href.includes('jagile') ? '#?jagile=true' : '#'}`;
    };

    const toLink = (item: any) => {
      if (item) {
        if (isEn.value) {
          item.path = item.path.replace('zh-CN', 'en-US');
        } else {
          item.path = item.path.replace('en-US', 'zh-CN');
        }
        router.push({ path: item.path });
      } else {
        router.push({ name: '/' });
      }
    };

    const isActive = computed(() => {
      const route = RefData.getInstance().currentRoute.value;
      const values = route.split('/');
      let value = values[values.length - 1];
      return function (name: string) {
        const lNames = name.toLowerCase().split('/');
        const lName = lNames[lNames.length - 1];
        if (!value) return false;
        if (lName === 'component') {
          return route.includes('component');
        } else {
          return value === lName || lName.includes(value);
        }
      };
    });
    const themeName = computed(() => {
      return function () {
        return `doc-header-${RefData.getInstance().themeColor.value}`;
      };
    });
    const checkGuidTheme = (item: any, index: number) => {
      data.isShowGuid = false;
      window.open(item.link);
    };

    if (location.hash.includes('jagile')) {
      header.splice(-1, 1);
    }

    return {
      header,
      version,
      repository,
      data,
      language,
      isJDB,
      toHome,
      isActive,
      checkGuidTheme,
      themeName,
      handleGuidFocusOut,
      onMouseHover,
      toLink,
      translate,
      isZh
    };
  }
});
</script>

<style lang="scss">
.v3-banner {
  position: fixed;
  top: 0;
  transition: all 0.3s;
  > a {
    color: #fff;
    font-weight: bold;
  }
  font-size: 14px;
  width: 100%;
  z-index: 999;
  text-align: center;
  padding: 10px 60px;
  color: #fff;
  background: linear-gradient(
    135deg,
    rgba(242, 20, 12, 1) 0%,
    rgba(232, 34, 14, 1) 69.83950099728881%,
    rgba(242, 77, 12, 1) 100%
  );
}
.doc {
  &-header {
    // position: fixed;
    z-index: 2;
    top: 0px;
    left: 0;
    right: 0;
    min-width: 1300px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: $doc-header-height;
    line-height: $doc-header-height;
    text-align: left;
    padding: 0 50px;
    font-size: 20px;
  }
}
.header {
  &-logo {
    position: relative;
    display: inline-block;
    width: 240px;
    height: 64px;
    .logo-link {
      width: 120px;
      height: 46px;
      vertical-align: middle;
      position: absolute;
      top: 50%;
      margin-top: -23px;
      cursor: pointer;

      &.react {
        width: 197px;
      }
      &.jdb {
        width: 180px;
      }
    }
    .logo-border {
      width: 1px;
      height: 26px;
      position: absolute;
      right: 0;
      top: 50%;
      margin-top: -13px;
    }
    .version {
      position: absolute;
      right: 70px;
      font-size: 14px;
    }
  }
  &-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    float: right;
    width: calc(100% - 240px);
    min-width: 900px;
    padding: 0 40px;
    .nav-box {
      margin-right: 140px;
      .nav-list {
        min-width: 490px;
        display: flex;
        list-style: none;
        align-items: center;
        justify-content: flex-end;
      }
      .nav-item {
        position: relative;
        margin-right: 30px;
        font-size: 14px;
        height: 63px;
        line-height: 63px;
        text-align: center;
        cursor: pointer;
        flex-shrink: 0;
        a {
          display: inline-block;
          line-height: 64px;
        }
        // overflow: hidden;
        &.active {
          font-weight: bold;
          &:after {
            content: '';
            display: inline-block;
            width: 35px;
            height: 13px;
            position: absolute;
            bottom: 3px;
            left: 50%;
            margin-left: -17.5px;
            background: url('@/sites/docs_vue/assets/images/item-active.png');
          }
        }
        &:last-of-type {
          margin-right: 0;
        }
      }
      .user-link {
        display: inline-block;
        width: 26px;
        height: 26px;
        vertical-align: middle;
        background-repeat: no-repeat;
        background-image: url('@/sites/docs_vue/assets/images/icon-user.png');
        background-size: 26px;

        &.gitee {
          margin-left: 8px;
          background-image: url('@/sites/docs_vue/assets/images/icon-gitee.png');
        }
      }
    }
  }
}
// 颜色
.doc-header {
  // 红色
  &-red {
    background-image: $theme-red-header-bg;
    color: $theme-red-word;
    .header {
      &-logo {
        .logo-link {
          background: url('@/sites/docs_vue/assets/images/logo-header-white.png') no-repeat center/100%;
          &.react {
            background: url('@/sites/docs_vue/assets/images/logo-header-white-react.png') no-repeat center/100%;
          }
          &.jdb {
            background: url('@/sites/docs_vue/assets/images/logo-header-white-jdb.png') no-repeat center/100%;
          }
        }
        .logo-border {
          background: $theme-red-border;
        }
      }
      &-nav {
        .search-box {
          .search-input {
            color: $theme-red-word;
            background-position: 0 0;
            &::-webkit-input-placeholder {
              color: $theme-red-input;
            }
          }
        }
        .nav-box {
          .nav-item {
            color: $theme-red-word;
            a {
              color: $theme-red-word;
            }
            &.active {
              color: $theme-red-actice;
              &:after {
                background-position: 0 0;
              }
              a {
                color: $theme-red-actice;
              }
            }
          }
          .user-link {
            background-position: 0 0;
            // &:hover {
            //   background-position: -26px 0;
            // }
          }
        }
      }
    }
    .header-select {
      &-box {
        position: relative;
        &.select-down {
          .header-select-hd {
            background-image: url('@/sites/docs_vue/assets/images/icon-select-white-down.png');
          }
        }
        &.select-up {
          .header-select-hd {
            background-image: url('@/sites/docs_vue/assets/images/icon-select-white-up.png');
          }
        }
        .guild-line {
          position: absolute;
          height: 20px;
          width: 77px;
          right: 0%;
          background: transparent;
        }
      }
      &-hd {
        color: $theme-red-word;
        border: 1px solid $theme-white-select-border;
      }
      &-bd {
        color: $theme-white-select-word;
      }
      &-item {
        border-color: $theme-red-select-border;
        background-color: $theme-red-select-bg;
        &:hover {
          color: $theme-red;
        }
      }
    }
  }
  // 白色
  &-white {
    background: $white;
    color: $theme-white-word;
    border-bottom: 1px solid $theme-white-box-border;
    .header {
      &-logo {
        .logo-link {
          background: url('@/sites/docs_vue/assets/images/logo-header-red.png') no-repeat center/100%;
          &.react {
            background: url('@/sites/docs_vue/assets/images/logo-header-red-react.png') no-repeat center/100%;
          }
          &.jdb {
            background: url('@/sites/docs_vue/assets/images/logo-header-red-jdb.png') no-repeat center/100%;
          }
        }
        .logo-border {
          background: $theme-white-border;
        }
      }
      &-nav {
        .search-box {
          .search-input {
            color: $theme-white-word;
            background-position: 0 -22px;
            &::-webkit-input-placeholder {
              color: $theme-white-input;
            }
          }
        }
        .nav-box {
          .nav-item {
            color: $theme-white-word;
            a {
              color: $theme-white-word;
            }
            &.active {
              color: $theme-white-actice;
              &:after {
                background-position: 0 -13px;
              }
              a {
                color: $theme-white-actice;
              }
            }
          }
          .user-link {
            background-position: 0 -25px;
            // &:hover {
            //   background-position: -26px -25px;
            // }
          }
        }
      }
    }
    .header-select {
      &-box {
        position: relative;
        &.select-down {
          .header-select-hd {
            background-image: url('@/sites/docs_vue/assets/images/icon-select-gray-down.png');
          }
        }
        &.select-up {
          .header-select-hd {
            background-image: url('@/sites/docs_vue/assets/images/icon-select-gray-up.png');
          }
        }
        .guild-line {
          position: absolute;
          right: 0%;
          height: 20px;
          width: 77px;
          background: transparent;
        }
        .guid-data {
          position: absolute;
          top: 40px;
          right: 0%;
          margin-left: -60px;
          border-radius: 3px;
          overflow: hidden;
          padding-left: 29px;
          padding-right: 29px;
          width: 336px;
          background: $theme-white;
          border: 1px solid $theme-white-select-border;
          border-radius: 12px;
          z-index: 3;
          .info {
            padding-top: 16px;
            padding-bottom: 22px;
            &:first-child {
              border-bottom: 1px solid $theme-black-nav-select-border;
            }
            .header {
              display: flex;
              align-items: center;
              justify-content: flex-start;
              line-height: 24px;
              .icon {
                width: 22px;
                height: 19px;
                margin-right: 9px;
              }
            }
            .content {
              padding-top: 6px;
              padding-bottom: 6px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              line-height: 24px;
              margin-top: 2px;
              margin-bottom: 2px;
              border-radius: 4px;
              &.active {
                background-color: $theme-white-select-active;
              }
              &:hover {
                background-color: $theme-white-select-hover;
              }
              .version {
                width: 91px;
                text-align: center;
              }
              .list {
                width: 95px;
                height: 24px;
                align-items: center;
                justify-content: flex-start;
                display: flex;
                .lang {
                  height: 24px;
                  background: $doc-nav-icon-bg1;
                  border-radius: 4px;
                  margin-right: 4px;
                  &:nth-child(2) {
                    background: $doc-nav-icon-bg2;
                    .name {
                      color: $doc-nav-icon-color2;
                    }
                  }
                  .name {
                    padding-left: 6px;
                    padding-right: 6px;
                    font-size: 14px;
                    font-family: PingFangSC;
                    font-weight: normal;
                    color: $doc-nav-icon-color1;
                  }
                }
              }
              .app {
                display: flex;
                justify-content: flex-start;
                width: 64px;
                margin-left: 18px;
                margin-right: 19px;
              }
            }
          }
          .contentKey {
            @extend .info;
            .content {
              .list {
                .lang {
                  background: $doc-nav-icon-bg2;
                  .name {
                    color: $doc-nav-icon-color2;
                  }
                }
              }
            }
          }
        }
      }
      &-hd {
        color: $theme-white-select-word;
        border: 1px solid $theme-white-select-border;
      }
      &-bd {
        color: $theme-white-select-word;
      }
      &-item {
        border-color: $theme-white-select-border;
        background-color: $theme-white-select-bg;
        &:hover {
          color: $theme-white-actice;
        }
      }
    }
  }
  // 黑色
  &-black {
    background: $black;
    color: $theme-black-word;
    border-bottom: 1px solid $theme-black-box-border;
    .header {
      &-logo {
        .logo-link {
          background: url('@/sites/docs_vue/assets/images/logo-header-red.png') no-repeat center/100%;
          &.react {
            background: url('@/sites/docs_vue/assets/images/logo-header-red-react.png') no-repeat center/100%;
          }
          &.jdb {
            background: url('@/sites/docs_vue/assets/images/logo-header-red-jdb.png') no-repeat center/100%;
          }
        }
        .logo-border {
          background: $theme-black-border;
        }
      }
      &-nav {
        .search-box {
          .search-input {
            color: $theme-black-word;
            background-position: 0 -44px;
            &::-webkit-input-placeholder {
              color: $theme-black-input;
            }
          }
        }
        .nav-box {
          .nav-item {
            color: $theme-black-word;
            a {
              color: $theme-black-word;
            }
            &.active {
              color: $theme-black-actice;
              &:after {
                background-position: 0 -13px;
              }
              a {
                color: $theme-black-actice;
              }
            }
          }
          .user-link {
            background-position: 0 -51px;
            // &:hover {
            //   background-position: -26px -51px;
            // }
          }
        }
      }
    }
    .header-select {
      &-box {
        &.select-down {
          .header-select-hd {
            background-image: url('@/sites/docs_vue/assets/images/icon-select-white-down.png');
          }
        }
        &.select-up {
          .header-select-hd {
            background-image: url('@/sites/docs_vue/assets/images/icon-select-white-up.png');
          }
        }
        .guild-line {
          position: absolute;
          height: 20px;
          right: 0%;
          width: 77px;
          background: transparent;
        }
        .guid-data {
          position: absolute;
          top: 40px;
          right: 0%;
          margin-left: -60px;
          border-radius: 3px;
          overflow: hidden;
          padding-left: 29px;
          padding-right: 29px;
          width: 336px;
          background: $theme-black-nav-select-bg;
          border: 1px solid $theme-black-nav-select-border;
          border-radius: 12px;
          z-index: 3;
          .info {
            padding-top: 16px;
            padding-bottom: 22px;
            &:first-child {
              border-bottom: 1px solid $theme-black-nav-select-border;
            }
            .header {
              display: flex;
              align-items: center;
              justify-content: flex-start;
              line-height: 24px;
              .icon {
                width: 22px;
                height: 19px;
                margin-right: 9px;
              }
            }
            .content {
              padding-top: 6px;
              padding-bottom: 6px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              line-height: 24px;
              margin-top: 2px;
              margin-bottom: 2px;
              border-radius: 4px;
              &.active {
                background-color: $theme-black-nav-select-active-bg;
              }
              &:hover {
                background-color: $theme-black-nav-select-hover-bg;
              }
              .version {
                width: 91px;
                text-align: center;
              }
              .list {
                width: 95px;
                height: 24px;
                align-items: center;
                justify-content: flex-start;
                display: flex;
                .lang {
                  height: 24px;
                  background: $doc-nav-icon-bg1;
                  border-radius: 4px;
                  margin-right: 4px;
                  &:nth-child(2) {
                    background: $doc-nav-icon-bg2;
                    .name {
                      color: $doc-nav-icon-color2;
                    }
                  }
                  .name {
                    padding-left: 6px;
                    padding-right: 6px;
                    font-size: 14px;
                    font-family: PingFangSC;
                    font-weight: normal;
                    color: $doc-nav-icon-color1;
                  }
                }
              }
              .app {
                display: flex;
                justify-content: flex-start;
                width: 64px;
                margin-left: 18px;
                margin-right: 19px;
              }
            }
          }
          .contentKey {
            @extend .info;
            .content {
              .list {
                .lang {
                  background: $doc-nav-icon-bg2;
                  .name {
                    color: $doc-nav-icon-color2;
                  }
                }
              }
            }
          }
        }
      }
      &-hd {
        color: $theme-black-select-word;
        background-color: $theme-black-select-bg;
        border: 1px solid $theme-black-select-border;
      }
      &-bd {
        color: $theme-black-select-word;
      }
      &-item {
        background-color: $theme-black-select-bg;
        border-color: $theme-black-select-bg;
        &:hover {
          background-color: $theme-black-select-hover;
          border-color: $theme-black-select-hover;
        }
      }
    }
  }
}
// 下拉列表选择动画效果
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
