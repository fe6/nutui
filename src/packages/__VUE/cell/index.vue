<template src="./template.html"></template>

<script lang="ts">
import { computed } from 'vue';
import { createComponent } from '@/packages/utils/create';
import { useRouter } from '@/packages/utils/useRoute';
import { pxCheck } from '@/packages/utils/pxCheck';
const { componentName, create } = createComponent('cell');
export default create({
  props: {
    title: { type: String, default: '' },
    subTitle: { type: String, default: '' },
    desc: { type: String, default: '' },
    descTextAlign: { type: String, default: 'right' },
    isLink: { type: Boolean, default: false },
    to: [String, Object],
    replace: { type: Boolean, default: false },
    roundRadius: { type: [String, Number], default: '' },
    url: { type: String, default: '' },
    icon: { type: String, default: '' },
    rightIcon: { type: String, default: 'arrow-right' },
    card: { type: Boolean, default: false },
    center: { type: Boolean, default: false },
    border: { type: Boolean, default: true },
    ellipsis: { type: Boolean, default: true }
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
    const router = useRouter();

    const baseStyle = computed(() => {
      return {
        borderRadius: pxCheck(props.roundRadius)
      };
    });

    const handleClick = (event: Event) => {
      emit('click', event);

      if (props.to && router) {
        router[props.replace ? 'replace' : 'push'](props.to);
        // if(props.replace){
        //   router.replace(props.to)
        // }else{
        //    router.push(props.to)
        // }
      } else if (props.url) {
        props.replace ? location.replace(props.url) : (location.href = props.url);
      }
    };

    return {
      handleClick,
      classes,
      baseStyle
    };
  }
});
</script>
