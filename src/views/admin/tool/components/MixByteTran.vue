<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>字节转换</span>
    </div>
    <div class="text item">
      <el-form ref="byteTranRef" :model="byteTranModel" :rules="byteTranRules" label-width="100px">
        <el-form-item label="比特(b)">
          <el-input v-model="byteTranModel.b" type="number" clearable @input="byteTranValue('b')" />
        </el-form-item>
        <el-form-item label="字节(B)">
          <el-input v-model="byteTranModel.B" type="number" clearable @input="byteTranValue('B')" />
        </el-form-item>
        <el-form-item label="千字节(KB)">
          <el-input v-model="byteTranModel.KB" type="number" clearable @input="byteTranValue('KB')" />
        </el-form-item>
        <el-form-item label="兆字节(MB)">
          <el-input v-model="byteTranModel.MB" type="number" clearable @input="byteTranValue('MB')" />
        </el-form-item>
        <el-form-item label="吉字节(GB)">
          <el-input v-model="byteTranModel.GB" type="number" clearable @input="byteTranValue('GB')" />
        </el-form-item>
        <el-form-item label="太字节(TB)">
          <el-input v-model="byteTranModel.TB" type="number" clearable @input="byteTranValue('TB')" />
        </el-form-item>
        <el-form-item>
          <el-button @click="byteTranClear()">清空</el-button>
          <el-button type="primary" @click="byteTranSubmit()">转换</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>
import { byteTran } from '@/api/admin'

export default {
  name: 'MixByteTran',
  components: {},
  data() {
    return {
      byteTranModel: {
        type: '',
        value: '',
        b: '',
        B: '',
        KB: '',
        MB: '',
        GB: '',
        TB: ''
      },
      byteTranRules: {}
    }
  },
  created() { },
  methods: {
    byteTranValue(type) {
      this.byteTranModel.type = type
      this.byteTranModel.value = this.byteTranModel[type]
    },
    byteTranClear() {
      this.byteTranModel = this.$options.data().byteTranModel
    },
    byteTranSubmit() {
      this.$refs['byteTranRef'].validate(valid => {
        if (valid) {
          byteTran({
            type: this.byteTranModel.type,
            value: this.byteTranModel.value
          }).then(res => {
            this.byteTranModel = res.data
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.item {
  height: 410px;
}
</style>
