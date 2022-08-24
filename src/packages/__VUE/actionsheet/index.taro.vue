<template>
  <view :class="classes">
    <nut-popup
      pop-class="nut-actionsheet-popup"
      :visible="visible"
      position="bottom"
      round
      @click-overlay="close"
      :closeOnClickOverlay="closeAbled"
      @opend="popupOpend"
    >
      <view class="nut-actionsheet-panel">
        <view v-if="title || subTitle" style="display: block" ref="titleNode">
          <view v-if="title" class="nut-actionsheet-title" :class="{ ['nut-actionsheet-title2']: subTitle }">{{
            title
          }}</view>
          <view v-if="subTitle" class="nut-actionsheet-title-sub">{{ subTitle }}</view>
        </view>
        <slot></slot>
        <view v-if="!slotDefault">
          <view class="nut-actionsheet-menu" ref="menuNode" :style="menuStyles" v-if="menuItems.length">
            <view
              v-for="(item, index) of menuItems"
              class="nut-actionsheet-item"
              :class="{ 'nut-actionsheet-item-disabled': item.disable, 'nut-actionsheet-item-loading': item.loading }"
              :style="{ color: isHighlight(item) || item.color }"
              :key="index"
              @click="chooseItem(item, index)"
            >
              <nut-icon v-if="item.loading" name="loading"> </nut-icon>
              <view v-else class="label"> {{ item[optionTag] }}</view>
              <view class="subdesc" v-if="item[optionSubTag]">{{ item[optionSubTag] }}</view>
            </view>
          </view>
          <view class="nut-actionsheet-cancel" v-if="cancelTxt" @click="cancelActionSheet">
            {{ cancelTxt }}
          </view>
        </view>
      </view>
    </nut-popup>
  </view>
</template>
<script lang="ts">
import { createComponent } from '@/packages/utils/create';
import { computed, reactive, ref, useSlots } from 'vue';
const { componentName, create } = createComponent('actionsheet');
import { popupProps } from '../popup/index.vue';
export default create({
  props: {
    ...popupProps,
    cancelTxt: {
      type: String,
      default: ''
    },
    optionTag: {
      type: String,
      default: 'name'
    },
    optionSubTag: {
      type: String,
      default: 'subname'
    },
    chooseTagValue: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    subTitle: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: '#ee0a24'
    },
    description: {
      type: String,
      default: ''
    },
    menuItems: {
      type: Array,
      default: () => []
    },
    closeAbled: {
      type: Boolean,
      default: true
    }
  },
  emits: ['cancel', 'choose', 'update:visible', 'close'],

  setup(props, { emit }) {
    const slotDefault = !!useSlots().default;
    const classes = computed(() => {
      const prefixCls = componentName;
      return {
        [prefixCls]: true
      };
    });

    const isHighlight = (item: { [x: string]: string }) => {
      return props.chooseTagValue && props.chooseTagValue === item[props.optionTag] ? props.color : '';
    };

    const cancelActionSheet = () => {
      emit('cancel');
      emit('update:visible', false);
    };

    const chooseItem = (item: { disable: boolean; loading: boolean }, index: any) => {
      if (!item.disable && !item.loading) {
        emit('choose', item, index);
        emit('update:visible', false);
      }
    };

    const menuNode = ref();
    const titleNode = ref();
    const menuStyles = reactive({
      height: '100%'
    });
    const popupOpend = (_: any, popupRef: any) => {
      if (menuNode.value && props.cancelTxt) {
        menuStyles.height =
          menuNode.value.clientHeight > popupRef.value.clientHeight
            ? `${
                popupRef.value.clientHeight -
                64 -
                (titleNode.value && titleNode.value.clientHeight ? titleNode.value.clientHeight : 0)
              }px`
            : '100%';
      }
    };

    const close = (e: Event) => {
      emit('close', e);
      emit('update:visible', false);
    };

    return {
      slotDefault,
      isHighlight,
      cancelActionSheet,
      chooseItem,
      close,
      classes,
      popupOpend,
      menuNode,
      menuStyles,
      titleNode
    };
  }
});
</script>
