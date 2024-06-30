<template>
  <todo-list-component />
</template>

<script>
import TodoListComponent from './components/TodoListComponent.vue'

export default {
  name: 'App',
  components: {
    TodoListComponent
  }
}
</script>

<style>
#app {
  font-family: "Century Gothic", "Times New Roman";
  
}
</style>
