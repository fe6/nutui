<template>
  <div class="demo" style="padding: 57px 0 15px">
    <h2>{{ translate('basic') }}</h2>
    <nut-cell :title="translate('title')" desc-text-align="left" descTextWidth="72%" is-link>
      <template #desc>
        <div style="color: red">{{ translate('desc') }}</div>
      </template>
    </nut-cell>
    <nut-cell :title="translate('title')" desc-text-align="left" descTextWidth="72%" is-link>
      <template #desc>
        <div>{{ translate('desc') }}</div>
      </template>
    </nut-cell>
    <nut-cell :title="translate('title')" desc-text-align="left" descTextWidth="78%">
      <template #desc>
        <div style="color: red">{{ translate('desc') }}</div>
      </template>
    </nut-cell>
    <nut-cell :title="translate('title')" alignItems="center" desc-text-align="left" descTextWidth="63%">
      <template #desc>
        <div style="color: red">{{ translate('desc') }}</div>
      </template>
      <template v-slot:link>
        <nut-switch v-model="switchChecked" />
      </template>
    </nut-cell>
    <nut-cell :title="translate('title')" :desc="translate('desc')"></nut-cell>
    <nut-cell :title="translate('title')" :sub-title="translate('title1')" :desc="translate('desc')"></nut-cell>
    <nut-cell :title="translate('title3')" @click="testClick"></nut-cell>
    <nut-cell :title="translate('title4')" :border="false" round-radius="0"></nut-cell>

    <h2>{{ translate('title9') }}</h2>
    <nut-cell card :title="translate('title')" :desc="translate('desc')"></nut-cell>
    <nut-cell card :title="translate('title')" :sub-title="translate('title1')" :desc="translate('desc')"></nut-cell>

    <h2>{{ translate('title2') }}</h2>

    <nut-cell>
      <div>{{ translate('content') }}</div>
    </nut-cell>
    <h2>{{ translate('title10') }}</h2>
    <nut-cell round-radius="0" :desc="translate('leftDel')" />

    <h2>{{ translate('title8') }}</h2>

    <nut-cell :desc="translate('desc')">
      <template v-slot:title>
        <span>Title <b style="color: red">1</b></span>
      </template>
    </nut-cell>

    <nut-cell-group :title="translate('title5')" :desc="translate('desc1')">
      <nut-cell :title="translate('link')" is-link></nut-cell>
      <nut-cell :title="translate('urlJump')" desc="https://jd.com" is-link url="https://jd.com"></nut-cell>
      <nut-cell :title="translate('routerJump')" to="/"></nut-cell>
    </nut-cell-group>

    <nut-cell-group center :title="translate('customRight')">
      <nut-cell title="Switch">
        <template v-slot:link>
          <nut-switch v-model="switchChecked" />
        </template>
      </nut-cell>
    </nut-cell-group>

    <nut-cell-group :title="translate('customLeftIcon')">
      <nut-cell :title="translate('image')">
        <template v-slot:icon>
          <img
            class="nut-icon"
            src="https://img11.360buyimg.com/imagetools/jfs/t1/137646/13/7132/1648/5f4c748bE43da8ddd/a3f06d51dcae7b60.png"
          />
        </template>
      </nut-cell>
    </nut-cell-group>

    <h2>{{ translate('displayIcon') }}</h2>
    <nut-cell :title="translate('name')" icon="my" :desc="translate('desc')" isLink> </nut-cell>
    <h2>{{ translate('title6') }}</h2>
    <nut-cell desc-text-align="left" :desc="translate('desc')"></nut-cell>

    <h2>{{ translate('title7') }}</h2>
    <nut-cell center :title="translate('title')" :sub-title="translate('title1')" :desc="translate('desc')"></nut-cell>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { createComponent } from '@/packages/utils/create';
const { createDemo, translate } = createComponent('cell');
import { useTranslate } from '@/sites/assets/util/useTranslate';
const initTranslate = () =>
  useTranslate({
    'zh-CN': {
      basic: '基本用法',
      desc: '描述文字',
      desc1: '使用 nut-cell-group 支持 title desc slots',
      title: '我是标题',
      title1: '副标题描述',
      title2: '直接使用插槽(slot)',
      title3: '点击测试',
      title4: '圆角设置 0',
      title5: '链接 | 分组用法',
      title6: '只展示 desc ，可通过 desc-text-align 调整内容位置',
      title7: '垂直居中',
      title8: '直接使用插槽(slot title)',
      title9: '卡片模式',
      title10: '只有一个文字类型',
      link: '链接',
      urlJump: 'URL 跳转',
      routerJump: '路由跳转 ’/‘ ',
      name: '姓名',
      image: '图片',
      content: '自定义内容',
      customRight: '自定义右侧箭头区域',
      customLeftIcon: '自定义左侧 Icon 区域',
      displayIcon: '展示图标'
    },
    'en-US': {
      basic: 'Basic Usage',
      desc: 'Description',
      desc1: 'Usage nut-cell-group support title desc slots',
      title: 'Title',
      title1: 'Subtitle Description',
      title2: 'Use Slots',
      title3: 'Click Test',
      title4: 'Round Radius 0',
      title5: 'Link | CellGroup Usage',
      title6: 'Only display desc , you can adjust the content position through desc-text-align',
      title7: 'Vertical Center',
      title8: 'Use Slots title',
      title9: 'Card type',
      title10: '只有一个文字类型',
      link: 'Link',
      urlJump: 'URL Jump',
      routerJump: 'Router Jump ’/‘ ',
      name: 'Name',
      image: 'Image',
      content: 'Content',
      customRight: 'Customize the right arrow area',
      customLeftIcon: 'Customize the left Icon area',
      displayIcon: 'Display Icon'
    }
  });
export default createDemo({
  setup() {
    initTranslate();
    const testClick = (event: Event) => {
      console.log('Click Test');
    };
    const switchChecked = ref(true);
    return { testClick, switchChecked, translate };
  }
});
</script>

<style lang="scss" scoped></style>
