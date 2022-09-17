<template>
  <div>
    <i-tree :data="data"
            :showCheckbox='true'/>
  </div>
</template>

<script>
import iTree from '../../components/tree/tree.vue'
export default {
  data() {
    return {
      data: [
        {
          title: "parent 1",
          expand: true,
          children: [
            {
              title: "parent 1-1",
              expand: true,
              checked:true,
              children: [
                {
                  title: "leaf 1-1-1",
                  
                },
                {
                  title: "leaf 1-1-2",
                },
              ],
            },
            {
              title: "parent 1-2",
              children: [
                {
                  title: "leaf 1-2-1",
                },
                {
                  title: "leaf 1-2-1",
                },
              ],
            },
          ],
        },
      ],
    };
  },
  components:{
    iTree
  }
};
</script>

<style>
</style>