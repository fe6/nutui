<template>
  <view :catch-move="lockScroll" :catchtouchmove="lockScroll">
    <nut-overlay
      v-if="overlay"
      :visible="visible"
      :close-on-click-overlay="closeOnClickOverlay"
      :class="overlayClass"
      :style="overlayStyle"
      :z-index="zIndex"
      :lock-scroll="lockScroll"
      :duration="duration"
      @click="onClickOverlay"
    />
    <Transition :name="transitionName" @after-enter="onOpened" @after-leave="onClosed">
      <view
        :id="`popup-${refRandomId}`"
        v-show="visible"
        :class="classes"
        :style="popStyle"
        @click="onClick"
        ref="popupRef"
      >
        <view class="nutui-popup__title" v-if="showTitle">{{ title }}</view>
        <view class="nutui-popup__content-wrapper" v-show="showSlot" :style="wrapperStyle"><slot></slot></view>
        <view
          v-if="closed"
          @click="onClickCloseIcon"
          class="nutui-popup__close-icon"
          :class="'nutui-popup__close-icon--' + closeIconPosition"
        >
          <nut-icon v-bind="$attrs" :name="closeIcon" size="18" />
        </view>
      </view>
    </Transition>
  </view>
</template>
<script lang="ts">
import {
  onMounted,
  onBeforeMount,
  onBeforeUnmount,
  onActivated,
  onDeactivated,
  watch,
  computed,
  reactive,
  PropType,
  CSSProperties,
  toRefs,
  getCurrentInstance,
  ref
} from 'vue';
import { useLockScroll } from '../popup/use-lock-scroll';
import { overlayProps } from '../overlay/index.taro.vue';
import overlay from '../overlay/index.taro.vue';
import icon from '../icon/index.taro.vue';
import { createComponent } from '@/packages/utils/create';
import Taro from '@tarojs/taro';
const { componentName, create } = createComponent('popup');
let _zIndex = 2000;
export const popupProps = {
  ...overlayProps,
  position: {
    type: String,
    default: 'center'
  },
  transition: String,
  style: {
    type: Object as PropType<CSSProperties>
  },
  popClass: {
    type: String,
    default: ''
  },
  closeable: {
    type: Boolean,
    default: false
  },
  closeIconPosition: {
    type: String,
    default: 'top-right'
  },
  closeIcon: {
    type: String,
    default: 'close'
  },
  destroyOnClose: {
    type: Boolean,
    default: true
  },
  overlay: {
    type: Boolean,
    default: true
  },
  round: {
    type: Boolean,
    default: false
  },
  safeAreaInsetBottom: {
    type: Boolean,
    default: true
  },
  title: {
    type: String,
    default: ''
  },
  showTitle: {
    type: Boolean,
    default: true
  }
};
export default create({
  children: [overlay],
  components: {
    [overlay.name]: overlay,
    [icon.name]: icon
  },
  props: {
    ...popupProps
  },
  emits: ['click', 'click-close-icon', 'open', 'close', 'opend', 'closed', 'update:visible', 'click-overlay'],
  setup(props, { emit }) {
    const popupRef = ref();
    const refRandomId = Math.random().toString(36).slice(-8);
    const state = reactive({
      zIndex: props.zIndex ? (props.zIndex as number) : _zIndex,
      showSlot: true,
      transitionName: `popup-fade-${props.position}`,
      overLayCount: 1,
      keepAlive: false,
      closed: props.closeable
    });
    const [lockScroll, unlockScroll] = useLockScroll(() => props.lockScroll);
    const classes = computed(() => {
      const prefixCls = componentName;
      return {
        [prefixCls]: true,
        ['round']: props.round,
        [`popup-${props.position}`]: true,
        [`popup-${props.position}--safebottom`]: props.position === 'bottom' && props.safeAreaInsetBottom,
        [props.popClass]: true
      };
    });
    const popStyle = computed(() => {
      return {
        zIndex: state.zIndex,
        animationDuration: props.duration ? `${props.duration}s` : 'initial',
        ...props.style
      };
    });
    const open = () => {
      if (props.zIndex != 2000) {
        _zIndex = Number(props.zIndex);
      }
      emit('update:visible', true);
      lockScroll();
      state.zIndex = ++_zIndex;
      if (props.destroyOnClose) {
        state.showSlot = true;
      }
      emit('open');
    };
    const close = () => {
      if (props.visible) {
        unlockScroll();
        emit('update:visible', false);
        if (props.destroyOnClose) {
          setTimeout(() => {
            state.showSlot = false;
            emit('close');
          }, +props.duration * 1000);
        }
      }
    };
    const onClick = (e: Event) => {
      emit('click', e);
    };
    const onClickCloseIcon = (e: Event) => {
      emit('click-close-icon', e);
      close();
    };
    const onClickOverlay = (e: Event) => {
      if (props.closeOnClickOverlay) {
        emit('click-overlay', e);
        close();
      }
    };
    const onOpened = (e: Event) => {
      emit('opend', e);
    };
    const onClosed = (e: Event) => {
      emit('closed', e);
    };
    onMounted(() => {
      props.transition
        ? (state.transitionName = props.transition)
        : (state.transitionName = `popup-slide-${props.position}`);
      props.visible && open();
    });
    onBeforeUnmount(() => {
      props.visible && close();
    });
    onBeforeMount(() => {
      if (props.visible) {
        unlockScroll();
      }
    });
    onActivated(() => {
      if (state.keepAlive) {
        emit('update:visible', true);
        state.keepAlive = false;
      }
    });
    onDeactivated(() => {
      if (props.visible) {
        close();
        state.keepAlive = true;
      }
    });
    const wrapperStyle = ref({});
    watch(
      () => props.visible,
      (value) => {
        if (value) {
          open();
          if (Taro.getEnv() === 'WEB') {
            setTimeout(() => {
              wrapperStyle.value = { height: props.showTitle ? `${popupRef.value.clientHeight - 64}px` : 'auto' };
            }, Number(props.duration) + 10);
          } else {
            setTimeout(() => {
              const query = Taro.createSelectorQuery();
              query
                .select(`#popup-${refRandomId}`)
                .boundingClientRect()
                .exec((rec) => {
                  if (rec.length > 0 && rec[0].height > 0) {
                    wrapperStyle.value = { height: props.showTitle ? `${rec[0].height - 64}px` : 'auto' };
                  }
                });
            }, Number(props.duration) + 10);
          }
        } else {
          close();
        }
      }
    );
    watch(
      () => props.position,
      (value) => {
        value === 'center' ? (state.transitionName = 'popup-fade') : (state.transitionName = `popup-slide-${value}`);
      }
    );
    watch(
      () => props.closeable,
      (value) => {
        state.closed = value;
      }
    );
    return {
      ...toRefs(state),
      refRandomId,
      popStyle,
      classes,
      onClick,
      onClickCloseIcon,
      onClickOverlay,
      onOpened,
      onClosed,
      wrapperStyle,
      popupRef
    };
  }
});
</script>
