<template>
  <div class="nut-general-shell">
    <nut-radio :label="item[radioKey]" v-if="radioEdition" />
    <item-contents
      :item="item"
      :radioEdition="radioEdition"
      :deleteEdition="deleteEdition"
      @delIconClick="delShellClick"
      @editIconClick="editShellClick"
      @itemClick="itemShellClick"
    >
      <template v-slot:contentTop>
        <slot name="contentInfo"></slot>
      </template>
      <template v-slot:contentIcon>
        <slot name="contentIcons"></slot>
      </template>
      <template v-slot:contentAddr>
        <slot name="contentAddrs"></slot>
      </template>
    </item-contents>
  </div>
</template>
<script lang="ts">
import { createComponent } from '@/packages/utils/create';
const { create } = createComponent('general-shell');
import ItemContents from './ItemContents.vue';

export default create({
  props: {
    item: {
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
    deleteEdition: {
      type: Boolean,
      default: true
    }
  },
  emits: ['handleDelIcon', 'handleEditIcon', 'handleItemContent', 'handelSwipeDel'],
  components: {
    ItemContents
  },

  setup(props: any, { emit, slots }) {
    const delShellClick = (event, item) => {
      emit('handleDelIcon', event, props.item);
      event.stopPropagation();
    };
    const editShellClick = (event, item) => {
      emit('handleEditIcon', event, props.item);
      event.stopPropagation();
    };
    const itemShellClick = (event, item) => {
      emit('handleItemContent', event, props.item);
      event.stopPropagation();
    };
    const swipeDelClick = (event, item) => {
      emit('handelSwipeDel', event, props.item);
      event.stopPropagation();
    };
    return {
      delShellClick,
      editShellClick,
      itemShellClick,
      swipeDelClick
    };
  }
});
</script>
