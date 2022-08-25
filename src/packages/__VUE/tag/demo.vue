<template>
  <div class="demo">
    <nut-cell-group :title="translate('title')">
      <nut-cell title="标签组 type">
        <template v-slot:link>
          <nut-taggroup>
            <nut-tag type="primary">{{ translate('tag') }}</nut-tag>
            <nut-tag type="success">{{ translate('tag') }}</nut-tag>
            <nut-tag type="danger">{{ translate('tag') }}</nut-tag>
            <nut-tag type="warning">{{ translate('tag') }}</nut-tag>
          </nut-taggroup>
        </template>
      </nut-cell>
      <nut-cell title="标签组 type round">
        <template v-slot:link>
          <nut-taggroup>
            <nut-tag type="primary" round>{{ translate('tag') }}</nut-tag>
            <nut-tag type="success" round>{{ translate('tag') }}</nut-tag>
            <nut-tag type="danger" round>{{ translate('tag') }}</nut-tag>
            <nut-tag type="warning" round>{{ translate('tag') }}</nut-tag>
          </nut-taggroup>
        </template>
      </nut-cell>
      <nut-cell title="组 type small">
        <template v-slot:link>
          <nut-taggroup>
            <nut-tag type="primary" size="small">{{ translate('tag') }}</nut-tag>
            <nut-tag type="success" size="small">{{ translate('tag') }}</nut-tag>
            <nut-tag type="danger" size="small">{{ translate('tag') }}</nut-tag>
            <nut-tag type="warning" size="small">{{ translate('tag') }}</nut-tag>
          </nut-taggroup>
        </template>
      </nut-cell>
      <nut-cell title="组 round type small">
        <template v-slot:link>
          <nut-taggroup>
            <nut-tag type="primary" round size="small">{{ translate('tag') }}</nut-tag>
            <nut-tag type="success" round size="small">{{ translate('tag') }}</nut-tag>
            <nut-tag type="danger" round size="small">{{ translate('tag') }}</nut-tag>
            <nut-tag type="warning" round size="small">{{ translate('tag') }}</nut-tag>
          </nut-taggroup>
        </template>
      </nut-cell>
      <nut-cell desc="组 plain type small">
        <template v-slot:link>
          <nut-taggroup>
            <nut-tag type="primary" plain size="small">{{ translate('tag') }}</nut-tag>
            <nut-tag type="success" plain size="small">{{ translate('tag') }}</nut-tag>
            <nut-tag type="danger" plain size="small">{{ translate('tag') }}</nut-tag>
            <nut-tag type="warning" plain size="small">{{ translate('tag') }}</nut-tag>
            <nut-tag type="primary" plain round size="small">{{ translate('tag') }}</nut-tag>
            <nut-tag type="success" plain round size="small">{{ translate('tag') }}</nut-tag>
            <nut-tag type="danger" plain round size="small">{{ translate('tag') }}</nut-tag>
            <nut-tag type="warning" plain round size="small">{{ translate('tag') }}</nut-tag>
          </nut-taggroup>
        </template>
      </nut-cell>
      <nut-cell :title="translate('type1')">
        <template v-slot:link>
          <nut-tag type="primary" @click="click">{{ translate('tag') }}</nut-tag>
          <nut-tag type="primary" size="small" @click="click">{{ translate('tag') }}</nut-tag>
        </template>
      </nut-cell>
      <nut-cell :title="translate('type2')">
        <template v-slot:link>
          <nut-tag type="success">{{ translate('tag') }}</nut-tag>
          <nut-tag type="success" size="small">{{ translate('tag') }}</nut-tag>
        </template>
      </nut-cell>
      <nut-cell :title="translate('type3')">
        <template v-slot:link>
          <nut-tag type="danger">{{ translate('tag') }}</nut-tag>
          <nut-tag type="danger" size="small">{{ translate('tag') }}</nut-tag>
        </template>
      </nut-cell>
      <nut-cell :title="translate('type4')">
        <template v-slot:link>
          <nut-tag type="warning">{{ translate('tag') }}</nut-tag>
          <nut-tag type="warning" size="small">{{ translate('tag') }}</nut-tag>
        </template>
      </nut-cell>
    </nut-cell-group>

    <nut-cell-group :title="translate('title1')">
      <nut-cell :title="translate('plain')">
        <template v-slot:link>
          <nut-tag plain>{{ translate('tag') }}</nut-tag>
          <nut-tag plain size="small">{{ translate('tag') }}</nut-tag>
        </template>
      </nut-cell>
      <nut-cell :title="translate('round')">
        <template v-slot:link>
          <nut-tag round type="primary">{{ translate('tag') }}</nut-tag>
          <nut-tag round type="primary" size="small">{{ translate('tag') }}</nut-tag>
        </template>
      </nut-cell>
      <nut-cell :title="translate('mark')">
        <template v-slot:link>
          <nut-tag mark type="primary">{{ translate('tag') }}</nut-tag>
          <nut-tag mark type="primary" size="small">{{ translate('tag') }}</nut-tag>
        </template>
      </nut-cell>
      <nut-cell :title="translate('closeable')">
        <template v-slot:link>
          <nut-tag v-if="show" closeable @close="close" type="primary">{{ translate('tag') }}</nut-tag>
          <nut-tag v-if="show" closeable @close="close" size="small" type="primary">{{ translate('tag') }}</nut-tag>
        </template>
      </nut-cell>
    </nut-cell-group>

    <nut-cell-group :title="translate('title2')">
      <nut-cell :title="translate('bgColor')">
        <template v-slot:link>
          <nut-tag color="#FA685D">{{ translate('tag') }}</nut-tag>
          <nut-tag color="#FA685D" size="small">{{ translate('tag') }}</nut-tag>
        </template>
      </nut-cell>
      <nut-cell :title="translate('textColor')">
        <template v-slot:link>
          <nut-tag color="#E9E9E9" textColor="#999999">{{ translate('tag') }}</nut-tag>
          <nut-tag color="#E9E9E9" size="small" textColor="#999999">{{ translate('tag') }}</nut-tag>
        </template>
      </nut-cell>
      <nut-cell :title="translate('plaincolor')">
        <template v-slot:link>
          <nut-tag color="#FA2400" plain>{{ translate('tag') }}</nut-tag>
          <nut-tag color="#FA2400" size="small" plain>{{ translate('tag') }}</nut-tag>
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
import { createComponent } from '@/packages/utils/create';
const { createDemo, translate } = createComponent('tag');
import { useTranslate } from '@/sites/assets/util/useTranslate';

const initTranslate = () =>
  useTranslate({
    'zh-CN': {
      title: '基础用法',
      title1: '样式风格',
      title2: '颜色自定义',
      type1: 'primary 类型',
      type2: 'success 类型',
      type3: 'danger 类型',
      type4: 'warning 类型',
      plain: '空心样式',
      round: '圆角样式',
      mark: '标记样式',
      closeable: '可关闭标签',
      tag: '标签',
      bgColor: '背景颜色',
      textColor: '文字颜色',
      plaincolor: '空心颜色'
    },
    'en-US': {
      title: 'Basic Usage',
      title1: 'Style',
      title2: 'Custom Color',
      type1: 'primary',
      type2: 'success',
      type3: 'danger',
      type4: 'warning',
      plain: 'plain',
      round: 'round',
      mark: 'mark',
      closeable: 'closeable',
      tag: 'Tag',
      bgColor: 'background color',
      textColor: 'text color',
      plaincolor: 'plain color'
    }
  });
export default createDemo({
  setup() {
    initTranslate();
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
      translate,
      tags,
      addTag,
      minTag,
      sizeChange,
      tagsSize
    };
  }
});
</script>
