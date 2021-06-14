<script lang="typescript">
  import { createEventDispatcher } from 'svelte'
  import { currentColor } from './store'
  export let visible = false

  const dispatch = createEventDispatcher()

  $: if (visible) {
    setTimeout(() => dispatch('finish'), 2000)
  }

  $: messageTopClass = visible ? 'top-1' : '-top-14'
</script>

<div 
  class={`message fixed w-full max-w-xs sm:max-w-sm h-auto p-2 ${messageTopClass} left-1/2 transform -translate-x-1/2 z-50 pointer-events-none text-white shadow-lg text-center rounded-sm flex items-center justify-center`}
  style={`background-color: ${$currentColor};`}
>
  <slot></slot>
</div>

<style>
.message {
  min-height: 50px;
  transition: top .2s;
}
</style>