<template>
  <div class="demo">
    <h2>基本使用</h2>
    <nut-cell title="选择地址" :desc="add1.address.join(',')" is-link @click="showAdd1"></nut-cell>
    <nut-address
      v-model:visible="add1.status"
      v-model="add1.values"
      v-model:address="add1.address"
      :options="theTree"
      @change="change"
    ></nut-address>

    <h2>编辑的情况</h2>
    <nut-cell title="编辑的情况" :desc="add2.address.join(',')" is-link @click="showAdd2"></nut-cell>
    <nut-address
      v-model:visible="add2.status"
      v-model="add2.values"
      v-model:address="add2.address"
      :options="theTree"
    ></nut-address>

    <h2>不限</h2>
    <nut-cell title="不限" :desc="add3.address.join(',')" is-link @click="showAdd3"></nut-cell>
    <nut-address
      v-model:visible="add3.status"
      v-model="add3.values"
      v-model:address="add3.address"
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
    const change = (val: any, items: any) => {
      // add1.status=false;
      console.log(val, items, '改变了');
    };
    const add1 = reactive<any>({
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
    const add3 = reactive<any>({
      status: false,
      values: [100000, 100000, 100000],
      address: ['不限', '不限', '不限']
    });
    const showAdd3 = () => {
      add1.status = true;
    };

    const theTree = ref([]);
    const theTree3 = ref<any>([]);
    const getTree = async () => {
      fetch('https://api.dev.mosh.cn/public/region/tree')
        .then((response) => response.json())
        .then((body) => {
          if (body.code === 10000) {
            theTree.value = body.data;
            theTree3.value = [
              {
                code: 100000,
                name: '不限',
                items: [
                  {
                    code: 100000,
                    name: '不限',
                    items: [
                      {
                        code: 100000,
                        name: '不限',
                        items: []
                      }
                    ]
                  }
                ]
              }
            ].concat(body.data);
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
      theTree,
      add3,
      showAdd3,
      theTree3,
      change
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
