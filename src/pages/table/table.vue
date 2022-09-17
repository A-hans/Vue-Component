<template>
  <div>
    <i-table :columns="columns" 
             :data="tableData" />
  </div>
</template>

<script>
import iTable from "../../components/table-render/table.vue";
export default {
  data() {
    return {
      columns: [
        {
          title: "姓名",
          key: "name",
          render:(h,{row,index})=>{
            let edit;
            // 当前行为聚焦行时
            if(this.editIndex === index){
              //通过渲染函数需要自定义实现v-model
              edit = [h('input',{
               domProps: {
                  value:row.name
                },
                on:{
                  input:(event)=>{
                    console.log(event.target.value);
                    this.editName = event.target.value;
                  }
                }
              })]
            }else {
              edit = row.name;
            }
             return h('div', [
              edit
            ]);
          }
        },
        {
          title: "年龄",
          key: "age",
          render:(h,{row,index})=>{
            let edit;
            if(this.editIndex === index) {
              edit = [h('input',{
                domProps:{
                  value:row.age
                },
                on:{
                  input:(event)=>{
                    this.editAge = event.target.age;
                  }
                }
              })]
            }else{
              console.log(row);
              edit = row.age;
            }
            return h('div',edit);
          }
        },
        {
          title: "出生日期",
          key: "birthday",
          render: (h, { row, column, index }) => {
            let edit;
            if(this.editIndex === index) {
              edit = [h('input',{
                domProps:{
                  value:this.formatDate(row.birthday)               
                },
                on:{
                  input:(event)=>{  
                    this.editBirthday = event.target.value
                  }
                }
              })]
            }else{
               //转换时间对象
            edit = this.formatDate(row.birthday);
            }
           
            //h为createElement
            return h("div", [edit]);
          },
        },
        {
          title: "地址",
          key: "address",
           render:(h,{row,index})=>{
            let edit;
            // 当前行为聚焦行时
            if(this.editIndex === index){
              //通过渲染函数需要自定义实现v-model
              edit = [h('input',{
               domProps: {
                  value:row.address
                },
                on:{
                  input:(event)=>{
                    console.log(event.target.value);
                    this.editAddress = event.target.value;
                  }
                }
              })]
            }else {
              edit = row.address;
            }
             return h('div', [
              edit
            ]);
          }
        },
        {
          title: "操作",
          render: (h, { row, column, index }) => {
            //如果当前行是编辑状态则渲染两个按钮
            if (this.editIndex === index) {
              return [
                h(
                  "button",
                  {
                    on: {
                      click: () => {
                        const date = new Date(this.editBirthday);
                        console.log(this.editBirthday)
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
                    },
                  },
                  "保存"
                ),
                h(
                  "button",
                  {
                    style: {
                      marginLeft: "6px",
                    },
                    on: {
                      click: () => {
                        this.editIndex = -1;
                      },
                    },
                  },
                  "取消"
                ),
              ];
            } else {
              // 当前行是默认状态，渲染为一个按钮
              return h(
                "button",
                {
                  on: {
                    click: () => {
                      this.editName = row.name;
                      this.editAge = row.age;
                      this.editAddress = row.address;
                      this.editBirthday = this.formatDate(row.birthday);
                      this.editIndex = index;
                    },
                  },
                },
                "修改"
              );
            }
          },
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
      formatDate(timeStamp){
              const date = new Date(parseInt(timeStamp));
              const year = date.getFullYear();
              const month = date.getMonth() + 1;
              const day = date.getDate();
              return`${year}-${month}-${day}`;
            }
  },
  components: {
    iTable,
  },
};
</script>

<style scoped>
</style>