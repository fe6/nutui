<template>
  <view :class="classes" @scroll.passive="handleScrollEvent" ref="list" :style="{ height: containerHeight + 'px' }">
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
  </view>
</template>
<script lang="ts">
import { reactive, toRefs, computed, ref, Ref, watch } from 'vue';
import { createComponent } from '@/packages/utils/create';
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
      default: 50
    },
    listData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    containerHeight: {
      type: [Number],
      default: document.documentElement.clientHeight || document.body.clientHeight || 667
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
        [prefixCls]: true,
        [`${prefixCls}-h5`]: true
      };
    });

    const listHeight = computed(() => {
      return state.list.length * props.height;
    });

    const visibleData = computed(() => {
      return state.list.slice(state.start, Math.min(end.value, state.list.length));
    });

    const handleScrollEvent = () => {
      const scrollTop = list.value?.scrollTop as number;
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
