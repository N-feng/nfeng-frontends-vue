<template>
  <nf-form :field-options="fieldOptions" v-model="formData"></nf-form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class App extends Vue {
  // 表单数据
  formData: any = {};
  get fieldOptions() {
    return [
      {
        type: "input",
        prop: "input",
        label: "输入框",
        disabled: this.formData.select === "xxx",
      },
      {
        type: "select",
        prop: "select",
        label: "选择框",
        options: [
          {
            label: "xxx",
            value: "xxx",
          },
        ],
      },
      {
        type: "month-picker",
        prop: "month-picker",
        label: "月份选择",
      },
    ];
  }
}
</script>

<style lang="less" scoped>
</style>
