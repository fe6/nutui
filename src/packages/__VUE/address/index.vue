<template>
  <nut-popup
    position="bottom"
    :lock-scroll="lockScroll"
    v-model:visible="showPopup"
    round
    popClass="nut-address-popup"
    @closed="closePopup"
    :closeable="closeable"
    :title="title || translate('title')"
  >
    <view class="nut-address">
      <nut-tabs class="nut-address-tabs" v-model="tabsConf.index" @change="tabsChange">
        <nut-tabpane :title="tOne" v-for="(tOne, tIdx) in tabsConf.opts" :key="tIdx">
          <view class="nut-address-list">
            <view
              class="nut-address-item"
              v-for="nowItem in theNowList"
              :key="nowItem[theFields.key]"
              @click="() => checkOne(nowItem)"
            >
              <view class="nut-address-text">{{ nowItem[theFields.label] }}</view>
              <nut-icon
                name="check1"
                class="nut-address-icon"
                :class="
                  Number(theValues[tabsConf.index]) === Number(nowItem[theFields.value]) ? 'nut-address-icon-on' : ''
                "
                size="22"
              />
            </view>
          </view>
        </nut-tabpane>
      </nut-tabs>
    </view>
  </nut-popup>
</template>
<script lang="ts">
import { reactive, ref, toRefs, watch, nextTick, computed, Ref, onMounted, PropType } from 'vue';
import { createComponent } from '@/packages/utils/create';
import { popupProps } from '../popup/index.taro.vue';
import { defaultFields } from './utils';
import { IAddressFieldNames } from './types';
const { create, translate } = createComponent('address');

export default create({
  inheritAttrs: false,
  props: {
    ...popupProps,
    modelValue: {
      // 英文
      type: Array,
      default: () => []
    },

    address: {
      // 中文
      type: Array,
      default: () => []
    },

    closeable: {
      // 关闭弹框按钮 icon
      type: Boolean,
      default: true
    },
    options: {
      type: Object as PropType<any[]>,
      default: () => []
    },
    level: {
      type: Number,
      default: 2
    },
    fieldNames: {
      type: Object as PropType<IAddressFieldNames>,
      default: () => ({ ...defaultFields })
    }
  },
  emits: ['update:visible', 'update:modelValue', 'update:address', 'change'],

  setup(props: any, { emit }) {
    const theFields = computed(() => ({ ...defaultFields, ...props.fieldNames }));

    const updateModels = () => {
      emit('update:modelValue', theValues.value);
      emit(
        'update:address',
        tabsConf.opts.filter((text: string) => text !== translate('tabPlaceholder'))
      );
    };

    const showPopup = ref(props.visible);
    const closePopup = () => {
      if (theValues.value.length < props.level + 1) {
        theValues.value = [];
        updateModels();
      }
      emit('update:visible', false);
    };

    let tabsConf = reactive({
      opts: [translate('tabPlaceholder')],
      index: 0
    }); // 顶部 tabs

    const theValues = ref<any[]>([]);

    const theNowList = ref([]);
    const theOldOptions = ref([]);
    const initOptions = () => {
      theOldOptions.value = props.options.slice();
      theNowList.value = props.options.slice();
    };

    const checkOne = (oneItem: Record<any, any>) => {
      if (Object.hasOwnProperty.call(oneItem, theFields.value.value)) {
        theValues.value[tabsConf.index] = oneItem[theFields.value.value];
      }
      if (Object.hasOwnProperty.call(oneItem, theFields.value.label)) {
        tabsConf.opts[tabsConf.index] = oneItem[theFields.value.label];
      }
      if (tabsConf.index === props.level) {
        showPopup.value = false;
        updateModels();
      }
      if (Object.hasOwnProperty.call(oneItem, theFields.value.items)) {
        if (tabsConf.opts.length > tabsConf.index && theValues.value.length > tabsConf.index) {
          tabsConf.opts.length = tabsConf.index + 1;
          tabsConf.opts[tabsConf.index + 1] = translate('tabPlaceholder');
          tabsConf.index++;
        }
        theNowList.value = oneItem[theFields.value.items].slice();
      }
      emit('change', theValues.value, oneItem);
    };

    const tabsChange = () => {
      if (theValues.value.length >= tabsConf.index) {
        if (tabsConf.index > 0) {
          theOldOptions.value.forEach((oneItem: any) => {
            if (oneItem[theFields.value.value] === theValues.value[0]) {
              if (tabsConf.index === 1) {
                theNowList.value = oneItem[theFields.value.items];
              } else {
                oneItem[theFields.value.items].forEach((twoItem: any) => {
                  if (twoItem[theFields.value.value] === theValues.value[1]) {
                    theNowList.value = twoItem[theFields.value.items];
                  }
                });
              }
            }
          });
        } else {
          theNowList.value = theOldOptions.value.slice();
        }
      }
    };

    const checkLabelAndValue = () => {
      theValues.value = props.modelValue.slice();
      tabsConf.opts = [];
      theOldOptions.value.forEach((oneItem: any) => {
        if (oneItem[theFields.value.value] === theValues.value[0]) {
          tabsConf.opts.push(oneItem[theFields.value.label]);
          oneItem[theFields.value.items].forEach((twoItem: any) => {
            if (twoItem[theFields.value.value] === theValues.value[1]) {
              tabsConf.opts.push(twoItem[theFields.value.label]);
              twoItem[theFields.value.items].forEach((threeItem: any) => {
                if (threeItem[theFields.value.value] === theValues.value[2]) {
                  tabsConf.opts.push(threeItem[theFields.value.label]);
                }
              });
            }
          });
        }
      });
      tabsConf.index = props.level;
      tabsChange();
      emit('update:address', tabsConf.opts.slice());
    };

    watch(
      () => props.visible,
      (value) => {
        showPopup.value = value;
      }
    );

    watch(
      () => props.options,
      () => {
        initOptions();

        if (props.modelValue.length === props.level + 1) {
          checkLabelAndValue();
        }
      }
    );

    watch(
      () => props.modelValue,
      () => {
        if (theNowList.value.length === 0) {
          initOptions();
        }
        if (props.modelValue.length === props.level + 1) {
          checkLabelAndValue();
        }
      }
    );

    return {
      showPopup,
      ...toRefs(props),
      translate,
      tabsConf,
      tabsChange,
      theFields,
      theNowList,
      checkOne,
      theValues,
      closePopup
    };
  }
});
</script>
