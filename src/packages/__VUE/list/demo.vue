<template>
  <div class="demo">
    <h2>{{ translate('basic') }}</h2>
    <nut-cell>
      <nut-list :height="50" :listData="count1" @scroll-bottom="handle1Scroll">
        <template v-slot="{ item }">
          <div class="list-item">
            {{ item }}
          </div>
        </template>
      </nut-list>
    </nut-cell>
    <h2>{{ translate('basic') }}2</h2>
    <nut-cell>
      <nut-list :height="50" insetHeight :listData="count2" @scroll-bottom="handle2Scroll">
        <template v-slot="{ item, index }">
          <div class="list-item" :class="{ ['list-item-min']: index === 1 }">
            {{ item.index }}
          </div>
        </template>
      </nut-list>
    </nut-cell>
  </div>
</template>
<script lang="ts">
import { onMounted, reactive, toRefs } from 'vue';
import { createComponent } from '@/packages/utils/create';
const { createDemo, translate } = createComponent('list');
import { useTranslate } from '@/sites/assets/util/useTranslate';
const initTranslate = () =>
  useTranslate({
    'zh-CN': {
      basic: '基本用法'
    },
    'en-US': {
      basic: 'Basic Usage'
    }
  });
export default createDemo({
  props: {},
  setup() {
    initTranslate();
    const state = reactive({
      count1: new Array(100).fill(0),
      count2: new Array(100).fill(0)
    });

    const handle2Scroll = () => {
      let arr = new Array(100).fill(0);
      const len = state.count2.length;
      state.count2 = state.count2.concat(
        arr.map((item: number, index: number) => ({
          index: len + index + 1,
          height: index == 1 ? 20 : 40
        }))
      );
    };

    const handle1Scroll = () => {
      const len = state.count1.length;
      if (len < 200) {
        let arr = new Array(100).fill(0);
        state.count1 = state.count1.concat(arr.map((item: number, index: number) => len + index + 1));
      }
    };
    onMounted(() => {
      state.count1 = state.count1.map((item: number, index: number) => index + 1);
      state.count2 = state.count2.map((item: number, index: number) => ({
        index: index + 1,
        height: index == 1 ? 20 : 40
      }));
    });

    return { ...toRefs(state), handle1Scroll, handle2Scroll, translate };
  }
});
</script>
<style lang="scss" scoped>
.demo {
  .nut-cell {
    height: 100%;
  }
  .list-item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50px;
    margin-bottom: 10px;
    background-color: #f4a8b6;
    border-radius: 10px;
  }
  .list-item-min {
    height: 20px;
    line-height: 20px;
    border-radius: 4px;
  }
}
</style>
