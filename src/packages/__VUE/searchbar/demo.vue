<template>
  <div class="demo full">
    <h2>{{ translate('basic1') }}</h2>
    <nut-searchbar v-model="searchValue" :label="translate('word1')"> </nut-searchbar>

    <h2>{{ translate('basic2') }}</h2>
    <nut-searchbar v-model="searchValue1" @search="search"> </nut-searchbar>

    <h2>{{ translate('basic3') }}</h2>
    <nut-searchbar v-model="searchValue2" @click-left-icon="clickLeftIcon">
      <template v-slot:leftin>
        <nut-icon size="14" name="search"></nut-icon>
      </template>
    </nut-searchbar>

    <h2>{{ translate('basic4') }}</h2>
    <nut-searchbar v-model="searchValue3">
      <template v-slot:rightout> {{ translate('word2') }} </template>
    </nut-searchbar>

    <h2>{{ translate('basic5') }}</h2>
    <nut-searchbar
      v-model="searchValue4"
      background="linear-gradient(to right, #9866F0, #EB4D50)"
      input-background="#fff"
    >
    </nut-searchbar>

    <h2>{{ translate('basic6') }}</h2>
    <nut-searchbar v-model="searchValue5" @click-right-icon="clickRightIcon">
      <template v-slot:leftout>
        <nut-icon @click="clickLeft" size="20" name="arrow-left"></nut-icon>
      </template>
      <template v-slot:leftin>
        <nut-icon size="14" name="search"></nut-icon>
      </template>
      <template v-slot:rightin>
        <nut-icon size="20" name="photograph"></nut-icon>
      </template>
      <template v-slot:rightout>
        <nut-icon size="20" name="message"></nut-icon>
      </template>
    </nut-searchbar>
  </div>
</template>

<script lang="ts">
import { toRefs, reactive } from 'vue';
import { createComponent } from '@/packages/utils/create';
import { Toast } from '@/packages/nutui.vue';
const { createDemo, translate } = createComponent('searchbar');
import { useTranslate } from '@/sites/assets/util/useTranslate';
const initTranslate = () =>
  useTranslate({
    'zh-CN': {
      basic1: '基本用法',
      basic2: '搜索事件监听',
      basic3: '显示搜索 icon',
      basic4: '右侧添加搜索文字',
      basic5: '更改输入框内部及外部的背景样式',
      basic6: '显示全部 icon',
      word1: '标签',
      word2: '搜索',
      title3: '标题3'
    },
    'en-US': {
      basic1: 'Basic Usage',
      basic2: 'Search event listening',
      basic3: 'Display search Icon',
      basic4: 'Add search text to the right',
      basic5: 'Change the background style inside and outside the input box',
      basic6: 'Show all icons',
      word1: 'label',
      word2: 'search'
    }
  });
export default createDemo({
  props: {},
  setup() {
    initTranslate();
    const state = reactive({
      searchValue: '',
      searchValue1: '',
      searchValue2: '',
      searchValue3: '',
      searchValue4: '',
      searchValue5: ''
    });

    const search = function (e: any) {
      Toast.text('搜索触发');
    };

    const clickLeft = function () {
      Toast.text('点击回退按钮');
    };
    const clickLeftIcon = function (a: string, b: any) {
      console.log(a, b);
    };
    const clickRightIcon = function (a: string, b: any) {
      console.log(a, b);
    };

    return {
      clickLeft,
      clickLeftIcon,
      clickRightIcon,
      search,
      ...toRefs(state),
      translate
    };
  }
});
</script>

<style lang="scss" scoped></style>
