<template>
  <nut-cell
    class="nut-form-item"
    :class="[
      {
        error: parent[prop],
        line: showErrorLine,
        ['nut-form-item-center']: center
      },
      $attrs.class
    ]"
    :style="$attrs.style"
  >
    <view class="nut-cell__title nut-form-item__label" :style="labelStyle" v-if="label" :class="{ required: required }">
      <slot name="label">
        {{ label }}
      </slot>
    </view>
    <view class="nut-cell__value nut-form-item__body">
      <view class="nut-form-item__body__slots" :style="bodyStyle">
        <slot></slot>
      </view>
      <view class="nut-form-item__body__tips" :style="errorMessageStyle" v-if="parent[prop] && showErrorMessage">
        {{ parent[prop] }}</view
      >
    </view>
  </nut-cell>
</template>
<script lang="ts">
import { pxCheck } from '@/packages/utils/pxCheck';
import { computed, inject, provide, PropType, ref, CSSProperties } from 'vue';
import { createComponent } from '@/packages/utils/create';
const { componentName, create } = createComponent('form-item');
export default create({
  inheritAttrs: false,
  props: {
    prop: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    rules: {
      type: Array as PropType<import('./types').FormItemRule[]>,
      default: () => {
        return [];
      }
    },
    required: {
      type: Boolean,
      default: false
    },
    center: {
      type: Boolean,
      default: false
    },
    showErrorMessage: {
      type: Boolean,
      default: true
    },
    showErrorLine: {
      type: Boolean,
      default: true
    },
    labelWidth: {
      type: [String, Number],
      default: ''
    },
    labelAlign: {
      type: String,
      default: ''
    },
    errorMessageAlign: {
      type: String,
      default: ''
    },
    bodyAlign: {
      type: String,
      default: ''
    }
  },
  components: {},
  emits: [''],

  setup(props, { emit }) {
    const parent = inject('formErrorTip') as any;

    provide('form', {
      props
    });

    const labelStyle = computed(() => {
      return {
        width: props.labelWidth ? pxCheck(props.labelWidth) : '',
        textAlign: props.labelAlign
      } as CSSProperties;
    });
    const bodyStyle = computed(() => {
      return {
        textAlign: props.bodyAlign
      } as CSSProperties;
    });
    const errorMessageStyle = computed(() => {
      return {
        textAlign: props.errorMessageAlign
      } as CSSProperties;
    });

    return { parent, labelStyle, bodyStyle, errorMessageStyle };
  }
});
</script>
