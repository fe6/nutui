<template>
  <view :class="classes">
    <view class="nut-menu__bar" :class="{ opened: opened }" ref="barRef">
      <template v-for="(item, index) in children" :key="index">
        <view
          class="nut-menu__item"
          @click="!item.disabled && toggleItem(index)"
          :class="{ disabled: item.disabled, active: item.state.showPopup }"
          :style="{ color: item.state.showPopup ? activeColor : '' }"
        >
          <view class="nut-menu__title" :class="getClasses(item.state.showPopup)">
            <view class="nut-menu__title-text">{{ item.renderTitle() }}</view>
            <nut-icon
              v-bind="$attrs"
              :name="titleIcon || (direction === 'up' ? 'arrow-up' : 'arrow-down')"
              size="10"
              class="nut-menu__title-icon"
            ></nut-icon>
          </view>
        </view>
      </template>
    </view>
    <slot></slot>
  </view>
</template>
<script lang="ts">
import { reactive, provide, computed, ref } from 'vue';
import { createComponent } from '@/packages/utils/create';
import Taro, { usePageScroll } from '@tarojs/taro';
const { componentName, create } = createComponent('menu');
export default create({
  props: {
    activeColor: {
      type: String,
      default: ''
    },
    overlay: {
      type: Boolean,
      default: true as const
    },
    lockScroll: {
      type: Boolean,
      default: true as const
    },
    duration: {
      type: [Number, String],
      default: 0.3
    },
    titleIcon: String,

    closeOnClickOverlay: {
      type: Boolean,
      default: true
    },
    direction: {
      type: String,
      default: 'down'
    },
    scrollFixed: {
      type: [Boolean, String, Number],
      default: false
    },
    titleClass: [String]
  },
  setup(props) {
    const barRef = ref<HTMLElement>();
    const offset = ref(0);
    const isScrollFixed = ref(false);

    const useChildren = () => {
      const publicChildren: any[] = reactive([]);
      const internalChildren: any[] = reactive([]);

      const linkChildren = (value?: any) => {
        const link = (child: any) => {
          if (child.proxy) {
            internalChildren.push(child);
            publicChildren.push(child.proxy as any);
          }
        };

        provide(
          'menuParent',
          Object.assign(
            {
              link,
              children: publicChildren,
              internalChildren
            },
            value
          )
        );
      };

      return {
        children: publicChildren,
        linkChildren
      };
    };

    const { children, linkChildren } = useChildren();

    const opened = computed(() => children.some((item) => item.state.showWrapper));

    const classes = computed(() => {
      const prefixCls = componentName;
      return {
        [prefixCls]: true,
        'scroll-fixed': isScrollFixed.value
      };
    });

    const updateOffset = () => {
      if (barRef.value) {
        setTimeout(() => {
          Taro.createSelectorQuery()
            .select('.nut-menu__bar.opened')
            .boundingClientRect((rect) => {
              if (props.direction === 'down') {
                offset.value = rect.bottom;
              } else {
                offset.value =
                  Taro.getEnv() == 'WEB'
                    ? document.body.clientHeight
                    : Taro.getSystemInfoSync().windowHeight - rect.top;
              }
            })
            .exec();
        }, 100);
      }
    };

    linkChildren({ props, offset });

    const toggleItem = (active: number) => {
      children.forEach((item, index) => {
        if (index === active) {
          updateOffset();
          item.toggle();
        } else if (item.state.showPopup) {
          item.toggle(false, { immediate: true });
        }
      });
    };

    const onScroll = (res: { scrollTop: number }) => {
      const { scrollFixed } = props;

      const scrollTop = res.scrollTop;

      isScrollFixed.value = scrollTop > (typeof scrollFixed === 'boolean' ? 30 : Number(scrollFixed));
    };

    const getClasses = (showPopup: boolean) => {
      let str = '';
      const { titleClass } = props;

      if (showPopup) {
        str += 'active';
      }

      if (titleClass) {
        str += ` ${titleClass}`;
      }

      return str;
    };

    usePageScroll((res) => {
      const { scrollFixed } = props;

      if (scrollFixed) {
        onScroll(res);
      }
    });

    return {
      toggleItem,
      children,
      opened,
      classes,
      barRef,
      getClasses
    };
  }
});
</script>
