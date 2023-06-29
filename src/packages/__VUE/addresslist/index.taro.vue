<template>
  <div class="nut-addresslist">
    <general-shell
      v-if="!longPressEdition && !swipeEdition && !radioEdition"
      v-for="(item, index) of dataArray"
      :key="'general' + index"
      :item="item"
      :deleteEdition="deleteEdition"
      @handleDelIcon="clickDelIcon"
      @handleEditIcon="clickEditIcon"
      @handleItemContent="clickContentItem"
      @handelSwipeDel="clickSwipeDel"
    >
    </general-shell>
    <nut-radiogroup v-model="theRadioVal" v-if="!longPressEdition && !swipeEdition && radioEdition">
      <general-shell
        v-for="(item, index) of dataArray"
        :key="'general' + index"
        :item="item"
        :radioKey="radioKey"
        :radioEdition="true"
        :deleteEdition="deleteEdition"
        @handleDelIcon="clickDelIcon"
        @handleEditIcon="clickEditIcon"
        @handleItemContent="clickContentItem"
        @handelSwipeDel="clickSwipeDel"
      />
    </nut-radiogroup>
    <long-press-shell
      v-if="longPressEdition && !swipeEdition"
      v-for="(item, index) of dataArray"
      :key="'longpress' + index"
      :item="item"
      @handleDelIcon="clickDelIcon"
      @handleEditIcon="clickEditIcon"
      @handleItemContent="clickContentItem"
      @handleCopy="clickLongCopy"
      @handleSet="clickLongSet"
      @handleDel="clickLongDel"
    >
      <template v-slot:contentInfo>
        <slot name="iteminfos"></slot>
      </template>
      <template v-slot:contentIcons>
        <slot name="itemicon"></slot>
      </template>
      <template v-slot:contentAddrs>
        <slot name="itemaddr"></slot>
      </template>
      <template v-slot:longpressAll>
        <slot name="longpressbtns"></slot>
      </template>
    </long-press-shell>
    <swipe-shell
      v-if="!longPressEdition && swipeEdition"
      v-for="(item, index) of dataArray"
      :key="'swipe' + index"
      :item="item"
      @handleDelIcon="clickDelIcon"
      @handleEditIcon="clickEditIcon"
      @handleItemContent="clickContentItem"
      @handelSwipeDel="clickSwipeDel"
    >
      <template v-slot:contentInfo>
        <slot name="iteminfos"></slot>
      </template>
      <template v-slot:contentIcons>
        <slot name="itemicon"></slot>
      </template>
      <template v-slot:contentAddrs>
        <slot name="itemaddr"></slot>
      </template>
      <template v-slot:swiperightbtn>
        <slot name="swiperight"></slot>
      </template>
    </swipe-shell>
    <div class="nut-addresslist__bottom" v-if="showBottomButton" @click="addAddress">
      <nut-button block type="danger">{{ translate('addAddress') }}</nut-button>
    </div>
  </div>
</template>
<script lang="ts">
import { reactive, onMounted, ref, watch, shallowRef, watchEffect } from 'vue';
import { createComponent } from '@/packages/utils/create';
const { create, translate } = createComponent('addresslist');
import LongPressShell from './components/LongPressShell.vue';
import SwipeShell from './components/SwipeShell.vue';
import GeneralShell from './components/GeneralShell.vue';
import { floatData } from '@/packages/utils/util';
export default create({
  props: {
    data: {
      type: Array,
      default: []
    },
    longPressEdition: {
      type: Boolean,
      default: false
    },
    swipeEdition: {
      type: Boolean,
      default: false
    },
    showBottomButton: {
      type: Boolean,
      default: true
    },
    dataMapOptions: {
      type: Object,
      default: {}
    },
    radioEdition: {
      type: Boolean,
      default: false
    },
    radioKey: {
      type: String,
      default: 'id'
    },
    radioId: {
      type: [String, Number],
      default: ''
    },
    deleteEdition: {
      type: Boolean,
      default: true
    }
  },
  components: {
    LongPressShell,
    SwipeShell,
    GeneralShell
  },
  emits: [
    'handelDelIcon',
    'handelEditIcon',
    'update:radioId',
    'radioChange',
    'handelItem',
    'longPressCopyClick',
    'longPressSetClick',
    'longPressDelClick',
    'swipeDelClick',
    'addAddressClick'
  ],

  setup(props, { emit }) {
    const dataArray = ref<any>([]);
    const theRadioVal = shallowRef('');
    const dataInfo = reactive({
      id: 2,
      addressName: '姓名',
      phone: '123****4567',
      defaultAddress: false,
      fullAddress: '北京市通州区测试测试测试测试测试测试测试测试测试'
    });
    //磨平参数差异
    const trowelData = () => {
      if (Object.keys(props.dataMapOptions).length > 0) {
        dataArray.value = props.data.map((item, index) => {
          return floatData(dataInfo, item, props.dataMapOptions);
        });
      }
    };

    // 监听props.data的变更重新渲染列表
    watch(
      () => props.data,
      () => trowelData(),
      { deep: true }
    );

    const clickDelIcon = (event, item) => {
      emit('handelDelIcon', event, item);
      event.stopPropagation();
    };
    const clickEditIcon = (event, item) => {
      emit('handelEditIcon', event, item);
      event.stopPropagation();
    };
    const clickContentItem = (event, item) => {
      event.stopPropagation();
      if (props.radioEdition) {
        theRadioVal.value = item[props.radioKey];
        emit('update:radioId', theRadioVal.value);
        emit('radioChange', theRadioVal.value);
        return;
      }
      emit('handelItem', event, item);
    };
    const clickLongCopy = (event, item) => {
      emit('longPressCopyClick', event, item);
      event.stopPropagation();
    };
    const clickLongSet = (event, item) => {
      emit('longPressSetClick', event, item);
      event.stopPropagation();
    };
    const clickLongDel = (event, item) => {
      emit('longPressDelClick', event, item);
      event.stopPropagation();
    };
    const clickSwipeDel = (event, item) => {
      emit('swipeDelClick', event, item);
      event.stopPropagation();
    };
    const addAddress = (event) => {
      emit('addAddressClick', event);
      event.stopPropagation();
    };
    onMounted(() => {
      trowelData();
    });
    watchEffect(() => {
      theRadioVal.value = String(props.radioId);
    });
    return {
      clickDelIcon,
      clickEditIcon,
      clickContentItem,
      clickLongCopy,
      clickLongSet,
      clickLongDel,
      clickSwipeDel,
      addAddress,
      dataArray,
      translate,
      theRadioVal
    };
  }
});
</script>
