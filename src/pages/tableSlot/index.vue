<template>
  <div>
    <table-slot :columns="columns" :data="tableData" >
    <template v-slot:name="{row,index}">
        <input v-model="editName" v-if="editIndex === index"/>
        <span v-else>{{row.name}}</span>
    </template>
    
    <template v-slot:age="{row,index}">
        <input v-model="editAge" v-if="editIndex === index">    
        <span v-else>{{row.age}}</span>
    </template>

    <template v-slot:birthday="{row,index}">
     <input v-model="editBirthday" v-if="editIndex === index">   
        <span v-else>{{formatDate(row.birthday)}}</span>
    </template>

    <template v-slot:address="{row,index}">
        <input v-model="editAddress" v-if="editIndex === index">   
            <span v-else>{{row.address}}</span>
    </template>

    <template v-slot:action="{row,index}" >
        <div v-if="editIndex===index">
           <button @click="handleSave(index)">保存</button> 
           <button @click="editIndex = -1">取消</button> 
        </div>
        <div v-else>
            <button @click="handelEdit(row,index)">操作</button>
        </div>
    </template>
    </table-slot>
  </div>
</template>

<script>
//import tableSlot from "../../components/table-slot/table.vue";
// 通过slot.js定义一个函数组件，渲染slot模板
import tableSlot from "../../components/table-slot/table-slot.vue";
export default {
  data() {
    return {
      columns: [
        {
          title: "姓名",
          key: "name",
          slot:'name'
        },
        {
          title: "年龄",
          key: "age",
          slot:'age'
        },
        {
          title: "出生日期",
          key: "birthday",
          slot:'birthday'
        },
        {
          title: "地址",
          key: "address",
          slot:'address'
        },
        {
          title: "操作",
          slot:'action'
        },
      ],
      tableData: [
        {
          name: "王小明",
          age: 18,
          birthday: "919526400000",
          address: "北京市朝阳区芍药居",
        },
        {
          name: "张小刚",
          age: 25,
          birthday: "696096000000",
          address: "北京市海淀区西二旗",
        },
        {
          name: "李小红",
          age: 30,
          birthday: "563472000000",
          address: "上海市浦东新区世纪大道",
        },
        {
          name: "周小伟",
          age: 26,
          birthday: "687024000000",
          address: "深圳市南山区深南大道",
        },
      ],
      //修改所绑定的值
      editName: "",
      editAge: "",
      editBirthday: "",
      editAddress: "",
      editIndex: -1, //当前聚焦的输入框的行数，默认-1，聚焦时在给定正确的行号
    };
  },
  methods:{
      handelEdit(row,index){
        this.editName = row.name;
        this.editAge = row.age;
        this.editAddress = row.address;
        this.editBirthday = this.formatDate(row.birthday);
        this.editIndex = index;
      },
      handleSave (index) {
        const date = new Date(this.editBirthday);
       if(date&&date == 'Invalid Date'){
            alert('日期格式不正确');
            return
            }
        this.tableData[index].name = this.editName;
        this.tableData[index].age = this.editAge;
        this.tableData[index].birthday = +date;
        this.tableData[index].address = this.editAddress;
        this.editIndex = -1;
      },
      formatDate(timeStamp){
              const date = new Date(parseInt(timeStamp));
              const year = date.getFullYear();
              const month = date.getMonth() + 1;
              const day = date.getDate();
              return`${year}-${month}-${day}`;
            }
  },
  components: {
    tableSlot,
  },
};
</script>

<style scoped>
</style>