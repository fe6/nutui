<template>
  <div class="nut-item-contents__contain" @click="contentsClick">
    <div class="nut-item-contents__info">
      <div class="nut-item-contents__info-contact">
        <slot name="contentTop">
          <div
            class="nut-item-contents__info-contact-name"
            :class="radioEdition ? 'nut-item-contents__info-contact-name-radio' : ''"
            >{{ item.addressName }}</div
          >
          <div class="nut-item-contents__info-contact-tel">{{ item.phone }}</div>
          <nut-tag type="primary" class="nut-item-contents__info-contact-default" v-if="item.defaultAddress">{{
            translate('default')
          }}</nut-tag>
        </slot>
      </div>
      <div class="nut-item-contents__info-handle">
        <slot name="contentIcon">
          <nut-icon
            name="del"
            class="nut-item-contents__info-handle-del"
            v-if="deleteEdition"
            @click="delClick"
          ></nut-icon>
          <nut-icon name="a-bianzu31" class="nut-item-contents__info-handle-edit" @click="editClick"></nut-icon>
        </slot>
      </div>
    </div>
    <div class="nut-item-contents__addr">
      <slot name="contentAddr">
        {{ item.fullAddress }}
      </slot>
    </div>
  </div>
</template>
<script lang="ts">
import { createComponent } from '@/packages/utils/create';
const { create } = createComponent('item-contents');
const { translate } = createComponent('addresslist');

export default create({
  props: {
    name: {
      type: String,
      default: ''
    },
    item: {
      type: Object,
      default: {}
    },
    radioEdition: {
      type: Boolean,
      default: false
    },
    deleteEdition: {
      type: Boolean,
      default: true
    }
  },
  components: {},
  emits: ['delIconClick', 'editIconClick', 'itemClick'],

  setup(props, { emit }) {
    const delClick = (event: Event) => {
      emit('delIconClick', event, props.item);
      // console.log(123);
      event.stopPropagation();
    };
    const editClick = (event: Event) => {
      emit('editIconClick', event, props.item);
      event.stopPropagation();
    };
    const contentsClick = (event: event) => {
      emit('itemClick', event, props.item);
      event.stopPropagation();
    };

    return {
      delClick,
      editClick,
      contentsClick,
      translate
    };
  }
});
</script>

<style lang="scss">
/* @import './index.scss'; */
</style>
