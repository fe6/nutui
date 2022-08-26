<template>
  <div class="demo">
    <h2>当前是： {{ scribing ? '划线价' : '正常价' }}，下面开关可修改</h2>
    <nut-cell>
      <nut-switch v-model="scribing" />
    </nut-cell>
    <nut-cell-group title="基本用法 small normal large">
      <nut-cell>
        <nut-price :scribing="scribing" :price="0" size="small" :need-symbol="true" :thousands="true" />
      </nut-cell>
      <nut-cell>
        <nut-price :scribing="scribing" :price="0" size="normal" :need-symbol="true" :thousands="true" />
      </nut-cell>
      <nut-cell>
        <nut-price :scribing="scribing" :price="0" size="large" :need-symbol="true" :thousands="true" />
      </nut-cell>
    </nut-cell-group>
    <h2>不保留小数</h2>
    <nut-cell>
      <nut-price
        :scribing="scribing"
        :price="8888"
        decimal-digits="0"
        size="normal"
        :need-symbol="true"
        :thousands="true"
      />
    </nut-cell>
    <h2>调整 symbol 符号位置</h2>
    <nut-cell>
      <nut-price
        :scribing="scribing"
        :price="8888.01"
        position="after"
        symbol="元"
        size="normal"
        :need-symbol="true"
        :thousands="true"
      />
    </nut-cell>
    <h2>有人民币符号，无千位分隔</h2>
    <nut-cell>
      <nut-price :scribing="scribing" :price="10010.01" size="normal" :need-symbol="true" :thousands="false" />
    </nut-cell>
    <h2>带人民币符号，有千位分隔，保留小数点后三位</h2>
    <nut-cell>
      <nut-price
        :scribing="scribing"
        :price="15213.1221"
        size="normal"
        :decimal-digits="3"
        :need-symbol="true"
        :thousands="true"
      />
    </nut-cell>
    <h2>异步随机变更</h2>
    <nut-cell>
      <nut-price
        :scribing="scribing"
        :price="price"
        size="normal"
        :decimal-digits="3"
        :need-symbol="true"
        :thousands="true"
      />
    </nut-cell>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
export default {
  setup() {
    const price = ref(0);
    const scribing = ref(false);
    setInterval(() => {
      price.value = Math.random() * 10000000;
      // console.log('price.value1', price.value)
    }, 1000);
    return {
      price,
      scribing
    };
  }
};
</script>

<style lang="scss"></style>
