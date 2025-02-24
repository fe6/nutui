<template>
  <scroll-view
    :class="classes"
    :scroll-y="true"
    :style="{ height: containerHeight + 'px' }"
    scroll-top="0"
    @scroll="handleScrollEvent"
    ref="list"
  >
    <div class="nut-list-phantom" :style="{ height: listHeight + 'px' }"></div>
    <div class="nut-list-container" :style="{ transform: getTransform }">
      <div
        class="nut-list-item"
        :style="{ height: (insetHeight?((item as any)?.[insetProps]||height):height) + 'px' }"
        v-for="(item, index) in visibleData"
        :key="item"
      >
        <slot :item="item" :index="index"></slot>
      </div>
    </div>
  </scroll-view>
</template>
<script lang="ts">
import { reactive, toRefs, computed, ref, Ref, watch } from 'vue';
import { createComponent } from '@/packages/utils/create';
import Taro from '@tarojs/taro';
const { componentName, create } = createComponent('list');
export default create({
  props: {
    insetHeight: {
      type: Boolean,
      default: false
    },
    insetProps: {
      type: String,
      default: 'height'
    },
    height: {
      type: [Number],
      default: 0
    },
    listData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    containerHeight: {
      type: [Number],
      default: (Taro.getEnv() == 'WEB' ? window.screen.height : Taro.getSystemInfoSync().windowHeight) || 667
    }
  },
  emits: ['scroll', 'scroll-bottom'],

  setup(props, { emit }) {
    const list = ref(null) as Ref;
    const state = reactive({
      startOffset: 0,
      start: 0,
      list: props.listData.slice()
    });

    const visibleCount = computed(() => {
      return Math.ceil(props.containerHeight / props.height);
    });

    const end = computed(() => {
      return state.start + visibleCount.value;
    });

    const getTransform = computed(() => {
      return `translate3d(0, ${state.startOffset}px, 0)`;
    });

    const classes = computed(() => {
      const prefixCls = componentName;
      return {
        [prefixCls]: true
      };
    });

    const listHeight = computed(() => {
      return state.list.length * props.height;
    });

    const visibleData = computed(() => {
      return state.list.slice(state.start, Math.min(end.value, state.list.length));
    });

    const handleScrollEvent = async (e: any) => {
      const scrollTop = e.detail ? e.detail.scrollTop : e.target.scrollTop;
      state.start = Math.floor(scrollTop / props.height);
      if (end.value >= state.list.length) {
        emit('scroll');
        emit('scroll-bottom');
      }
      state.startOffset = scrollTop - (scrollTop % props.height);
    };

    watch(
      () => props.listData,
      () => {
        state.list = props.listData.slice();
      }
    );

    return {
      ...toRefs(state),
      list,
      getTransform,
      listHeight,
      visibleData,
      classes,
      handleScrollEvent
    };
  }
});
</script>
