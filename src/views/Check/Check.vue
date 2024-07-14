<template>
  <div class="check-title">
    <el-space>
      <el-input placeholder="请输入搜索关键词" v-model="searchWord"></el-input>
      <el-button type="primary" icon="search">搜索</el-button>
      <el-divider direction="vertical"></el-divider>
      <el-radio-group v-model="approverType">
        <el-radio-button label="全部" />
        <el-radio-button label="待审批" />
        <el-radio-button label="已通过" />
        <el-radio-button label="未通过" />
      </el-radio-group>
    </el-space>
  </div>
  <div class="check-table">
    <el-table :data="pageCheckList"  border>
      <el-table-column prop="applicantname" label="申请人" width="180" />
      <el-table-column prop="reason" label="审批事由" width="180" />
      <el-table-column prop="time" label="时间">
        <template #default="scope">
          {{ scope.row.time.join(' - ') }}
        </template>
      </el-table-column>
      <el-table-column prop="note" label="备注" />
      <el-table-column prop="approvername" label="操作" width="180">
        <template #default="scope">
          <el-button type="success" icon="check" size="small" circle @click="handlePutApply(scope.row._id, '已通过', scope.row.applicantid)"></el-button>
          <el-button type="danger" icon="close" size="small" circle @click="handlePutApply(scope.row._id, '未通过', scope.row.applicantid)"></el-button>
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态" width="180" />
    </el-table>
    <el-pagination small background layout="prev, pager, next" :total="checkList.length" :page-size="pageSize" @current-change="handleChange" />
  </div>
</template>

<script lang='ts' setup>
import { ref, computed, reactive} from 'vue'
import { useStore } from '@/store'
import { ElMessage } from 'element-plus';

const store = useStore()

const defaultType = '全部'
const approverType = ref(defaultType)
const searchWord = ref('')
const pageSize = ref(2)
const pageCurren = ref(1)

const usersInfos = computed(() => store.state.users.infos)
const checkList = computed(() => store.state.checks.checkList.filter((v) => (v.state === approverType.value || approverType.value === defaultType) && (v.note as string).includes(searchWord.value)))
const pageCheckList = computed(() => checkList.value.slice((pageCurren.value - 1) * pageSize.value, pageCurren.value * pageSize.value))

const handleChange = (val: number) => {
  pageCurren.value = val
}

const handlePutApply = (_id:string, state: '已通过' | '未通过', applicantid:string) => {
  console.log(_id, state)
  store.dispatch('checks/putApply', {_id, state}).then(res => {
    if(res.data.errcode === 0) {
      store.dispatch('checks/getApplyList', { approverid: usersInfos.value._id }).then(res => {
        if(res.data.errcode === 0) {
          store.commit('checks/updateCheckList', res.data.rets)
        }
      })
      store.dispatch('news/putRemind', { userid: applicantid, applicant: true })
      ElMessage.success('审批成功')
    }
  })
}
</script>

<style lang='scss' scoped>
.check-title {
  margin: 20px;
  display: flex;
  justify-content: right;
}
.check-table {
  margin: 10px;
}
.el-pagination {
  float: right;
  margin: 10px;
}
</style>
