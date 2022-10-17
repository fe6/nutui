<template src="./template.html"></template>

<script lang="ts">
import { computed } from 'vue';
import { createComponent } from '@/packages/utils/create';
import { pxCheck } from '@/packages/utils/pxCheck';
const { componentName, create } = createComponent('cell');

export default create({
  props: {
    title: { type: String, default: '' },
    subTitle: { type: String, default: '' },
    desc: { type: String, default: '' },
    descTextAlign: { type: String, default: 'right' },
    isLink: { type: Boolean, default: false },
    to: { type: String, default: '' },
    replace: { type: Boolean, default: false },
    roundRadius: { type: [String, Number], default: '' },
    url: { type: String, default: '' },
    icon: { type: String, default: '' },
    rightIcon: { type: String, default: 'arrow-right' },
    card: { type: Boolean, default: false },
    center: { type: Boolean, default: false },
    ellipsis: { type: Boolean, default: true },
    border: { type: Boolean, default: true },
    alignItems: { type: String, default: 'start' },
    descTextWidth: { type: String, default: '39%' }
  },
  emits: ['click'],
  setup(props, { emit }) {
    const classes = computed(() => {
      const prefixCls = componentName;
      return {
        [prefixCls]: true,
        [`${prefixCls}--clickable`]: props.isLink || props.to,
        [`${prefixCls}--border`]: props.border,
        [`${prefixCls}--center`]: props.center,
        [`${prefixCls}--card`]: props.card
      };
    });

    const baseStyle = computed(() => {
      return {
        borderRadius: pxCheck(props.roundRadius)
      };
    });

    const handleClick = (event: Event) => {
      emit('click', event);
    };

    return {
      handleClick,
      classes,
      baseStyle
    };
  }
});
</script>
