<template>
  <div class="demo">
    <h2>基本使用</h2>
    <nut-cell title="选择地址" :desc="add1.address.join(',')" is-link @click="showAdd1"></nut-cell>
    <nut-address
      v-model:visible="add1.status"
      v-model="add1.values"
      v-model:address="add1.address"
      :options="theTree"
    ></nut-address>

    <h2>数据动态写入</h2>
    <nut-cell title="编辑的情况" :desc="add2.address.join(',')" is-link @click="showAdd2"></nut-cell>
    <nut-address
      v-model:visible="add2.status"
      v-model="add2.values"
      v-model:address="add2.address"
      :options="theTree"
    ></nut-address>
  </div>
</template>

<script lang="ts">
import { createComponent } from '@/packages/utils/create';
import { onBeforeMount, onMounted, reactive, ref } from 'vue';
const { createDemo } = createComponent('address');

export default createDemo({
  props: {},
  setup() {
    const add1 = reactive({
      status: false,
      values: [],
      address: []
    });
    const showAdd1 = () => {
      add1.status = true;
    };

    const add2 = reactive({
      status: false,
      values: [],
      address: []
    });
    const showAdd2 = () => {
      add2.status = true;
    };

    const theTree = ref([]);
    const getTree = async () => {
      fetch('https://api.dev.mosh.cn/public/region/tree')
        .then((response) => response.json())
        .then((body) => {
          if (body.code === 10000) {
            theTree.value = body.data;
          }
        });
    };

    onBeforeMount(getTree);
    onMounted(() => {
      setTimeout(() => {
        add2.values = [150000, 150400, 150403] as any;
      }, 1000);
    });

    return {
      add1,
      showAdd1,
      add2,
      showAdd2,
      theTree
    };
  }
});
</script>

<style lang="scss" scoped>
.demo {
  .nut-cell {
    align-items: center;

    .nut-cell__value {
      margin-right: 8px;
    }
  }
}
</style>
