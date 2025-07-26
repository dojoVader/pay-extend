<script setup lang="ts">

</script>

<template>
<div class="menu-item">
  <div class="menu-item-icon">
    <slot name="icon"></slot>
  </div>
  <div class="menu-item-label">
    <slot name="label"></slot>
  </div>

</div>
</template>

<style>
.menu-item-label{
  span{
    color:grey;
    &:hover{
      color: black;
    }
  }


}
.menu-item{
  cursor: pointer;
  padding: 2% 3%;
  height: 45px;
  border-radius: 6px;
  transition: all 0.5s ease-in-out;
  &:hover{
    color: black;
    font-weight: bold;
    border: 1px solid #323232;
    background: white;
    .menu-item-label{
      span{
        color: black;
      }
    }

  }
}
</style>