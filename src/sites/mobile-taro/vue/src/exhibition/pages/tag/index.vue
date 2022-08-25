<template>
  <div class="demo">
    <nut-cell-group title="基础用法">
      <nut-cell title="标签组 type">
        <template v-slot:link>
          <nut-taggroup>
            <nut-tag type="primary">标签</nut-tag>
            <nut-tag type="success">标签</nut-tag>
            <nut-tag type="danger">标签</nut-tag>
            <nut-tag type="warning">标签</nut-tag>
          </nut-taggroup>
        </template>
      </nut-cell>
      <nut-cell title="标签组 type round">
        <template v-slot:link>
          <nut-taggroup>
            <nut-tag type="primary" round>标签</nut-tag>
            <nut-tag type="success" round>标签</nut-tag>
            <nut-tag type="danger" round>标签</nut-tag>
            <nut-tag type="warning" round>标签</nut-tag>
          </nut-taggroup>
        </template>
      </nut-cell>
      <nut-cell title="组 type small">
        <template v-slot:link>
          <nut-taggroup>
            <nut-tag type="primary" size="small">标签</nut-tag>
            <nut-tag type="success" size="small">标签</nut-tag>
            <nut-tag type="danger" size="small">标签</nut-tag>
            <nut-tag type="warning" size="small">标签</nut-tag>
          </nut-taggroup>
        </template>
      </nut-cell>
      <nut-cell title="组 round type small">
        <template v-slot:link>
          <nut-taggroup>
            <nut-tag type="primary" round size="small">标签</nut-tag>
            <nut-tag type="success" round size="small">标签</nut-tag>
            <nut-tag type="danger" round size="small">标签</nut-tag>
            <nut-tag type="warning" round size="small">标签</nut-tag>
          </nut-taggroup>
        </template>
      </nut-cell>
      <nut-cell desc="组 plain type small">
        <template v-slot:link>
          <nut-taggroup>
            <nut-tag type="primary" plain size="small">标签</nut-tag>
            <nut-tag type="success" plain size="small">标签</nut-tag>
            <nut-tag type="danger" plain size="small">标签</nut-tag>
            <nut-tag type="warning" plain size="small">标签</nut-tag>
            <nut-tag type="primary" plain round size="small">标签</nut-tag>
            <nut-tag type="success" plain round size="small">标签</nut-tag>
            <nut-tag type="danger" plain round size="small">标签</nut-tag>
            <nut-tag type="warning" plain round size="small">标签</nut-tag>
          </nut-taggroup>
        </template>
      </nut-cell>
      <nut-cell title="primary 类型">
        <template v-slot:link>
          <nut-tag type="primary" @click="click">标签</nut-tag>
          <nut-tag type="primary" size="small" @click="click">标签</nut-tag>
        </template>
      </nut-cell>
      <nut-cell title="success 类型">
        <template v-slot:link>
          <nut-tag type="success">标签</nut-tag>
          <nut-tag type="success" size="small">标签</nut-tag>
        </template>
      </nut-cell>
      <nut-cell title="danger 类型">
        <template v-slot:link>
          <nut-tag type="danger">标签</nut-tag>
          <nut-tag type="danger" size="small">标签</nut-tag>
        </template>
      </nut-cell>
      <nut-cell title="warning 类型">
        <template v-slot:link>
          <nut-tag type="warning">标签</nut-tag>
          <nut-tag type="warning" size="small">标签</nut-tag>
        </template>
      </nut-cell>
    </nut-cell-group>

    <nut-cell-group title="样式风格">
      <nut-cell title="空心样式">
        <template v-slot:link>
          <nut-tag plain>标签</nut-tag>
          <nut-tag plain size="small">标签</nut-tag>
        </template>
      </nut-cell>
      <nut-cell title="圆角样式">
        <template v-slot:link>
          <nut-tag round type="primary">标签</nut-tag>
          <nut-tag round type="primary" size="small">标签</nut-tag>
        </template>
      </nut-cell>
      <nut-cell title="标记样式">
        <template v-slot:link>
          <nut-tag mark type="primary">标签</nut-tag>
          <nut-tag mark type="primary" size="small">标签</nut-tag>
        </template>
      </nut-cell>
      <nut-cell title="可关闭标签">
        <template v-slot:link>
          <nut-tag v-if="show" closeable @close="close" type="primary">标签</nut-tag>
          <nut-tag v-if="show" closeable @close="close" size="small" type="primary">标签</nut-tag>
        </template>
      </nut-cell>
    </nut-cell-group>

    <nut-cell-group title="颜色自定义">
      <nut-cell title="背景颜色">
        <template v-slot:link>
          <nut-tag color="#FA685D">标签</nut-tag>
          <nut-tag color="#FA685D" size="small">标签</nut-tag>
        </template>
      </nut-cell>
      <nut-cell title="文字颜色">
        <template v-slot:link>
          <nut-tag color="#E9E9E9" textColor="#999999">标签</nut-tag>
          <nut-tag color="#E9E9E9" size="small" textColor="#999999">标签</nut-tag>
        </template>
      </nut-cell>
      <nut-cell title="空心颜色">
        <template v-slot:link>
          <nut-tag color="#FA2400" plain>标签</nut-tag>
          <nut-tag color="#FA2400" size="small" plain>标签</nut-tag>
        </template>
      </nut-cell>
    </nut-cell-group>
    <nut-cell-group title="动态添加">
      <nut-cell>
        <template v-slot:link>
          <nut-button type="primary" @click="addTag">添加</nut-button>
          <nut-button type="info" style="margin: 0 12px" @click="minTag">减少</nut-button>
          <nut-button type="info" @click="sizeChange">{{ tagsSize ? '小' : '大' }}</nut-button>
        </template>
      </nut-cell>
      <nut-cell>
        <template v-slot:link>
          <nut-taggroup>
            <nut-tag
              v-for="one in tags"
              :key="one"
              :size="tagsSize"
              :content="`第${one + 1}个-${'内容'.repeat(Math.ceil(Math.random() * 20))}`"
              color="#1996f9"
              text-color="#ff0"
            ></nut-tag>
          </nut-taggroup>
        </template>
      </nut-cell>
    </nut-cell-group>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
  setup() {
    const show = ref(true);
    const close = () => {
      show.value = false;
    };

    const click = () => {
      alert('点击事件');
    };

    const tags = ref<number[]>([0, 1, 2, 3]);
    const addTag = () => {
      tags.value.push(tags.value.length);
    };
    const minTag = () => {
      tags.value.length--;
    };

    const tagsSize = ref('');
    const sizeChange = () => {
      tagsSize.value = !tagsSize.value ? 'small' : '';
    };

    return {
      close,
      click,
      show,
      tags,
      addTag,
      minTag,
      sizeChange,
      tagsSize
    };
  }
};
</script>
