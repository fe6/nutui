#  Address 地址

### 介绍

按需加载请加载对应依赖组件 Icon Popup Elevator

### 安装

``` javascript
import { createApp } from 'vue';
//vue
import { Address, Popup, Tabs, Icon } from '@nutui/nutui';
//taro
import { Address, Popup, Tabs, Icon } from '@nutui/nutui-taro';

const app = createApp();
app.use(Address);
app.use(Popup);
app.use(Tabs);
app.use(Icon);
```

## 代码演示

### 基本使用

:::demo
```html
<template>
<nut-cell title="选择地址" :desc="add1.address.join(',')" is-link @click="showAdd1"></nut-cell>
<nut-address
  v-model:visible="add1.status"
  v-model="add1.values"
  v-model:address="add1.address"
  :options="theTree"
></nut-address>
</template>
<script setup>
import { ref, reactive, onBeforeMount } from 'vue';

const add1 = reactive({
  status: false,
  values: [],
  address: [],
});
const showAdd1 = () => {
  add1.status = true;
}

const theTree = ref([]);
const getTree = async() => {
  fetch('https://api.dev.mosh.cn/public/region/tree')
    .then((response) => response.json())
    .then((body) => {
      if (body.code === 10000) {
        theTree.value = body.data;
      }
    });
}

onBeforeMount(getTree);
</script>

```
:::

### 数据动态写入

:::demo
```html
<template>
<nut-cell title="编辑的情况" :desc="add2.address.join(',')" is-link @click="showAdd2"></nut-cell>
<nut-address
  v-model:visible="add2.status"
  v-model="add2.values"
  v-model:address="add2.address"
  :options="theTree"
></nut-address>
</template>
<script setup>
import { ref, reactive, onBeforeMount, onMounted } from 'vue';

const add2 = reactive({
  status: false,
  values: [],
  address: [],
});
const showAdd2 = () => {
  add2.status = true;
}

const theTree = ref([]);
const getTree = async() => {
  fetch('https://api.dev.mosh.cn/public/region/tree')
    .then((response) => response.json())
    .then((body) => {
      if (body.code === 10000) {
        theTree.value = body.data;
      }
    });
}

onBeforeMount(getTree);
onMounted(() => {
  setTimeout(() => {
    add2.values = [150000,150400,150403] as any;
  }, 1000);
});
</script>

```
:::

# API

| 字段 | 说明 | 类型 | 默认值
|----- | ----- | ----- | ----- 
| v-model:modelValue | 省市区编码 | Number[] | []
| v-model:visible | 是否打开地址选择 | Boolean | false
| v-model:address | 省市区名字 | String | []
| closeable | 是否显示关闭按钮  | Boolean | true
| options | 三级选择的数据      | Array        | []      
| fieldNames | 三级选择的数据      | Object        | {key: 'code',items: 'items',label: 'name',value: 'code'}
