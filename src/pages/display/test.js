const code = `<template>
<div>
  <h1>{{message}}</h1>
</div>
</template>

<script>
export default {
name:'testCode',
data(){
  return{
      message:'Hello Message'
  }
}
}
</script>

<style scoped>
h1{
  color:red
}
</style>`

export default code;