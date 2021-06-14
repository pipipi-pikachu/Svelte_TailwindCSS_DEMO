<script lang="typescript">
  export let visible = false
  $: panelRightClass = visible ? 'right-0' : '-right-96'
</script>

<div class={`fixed top-0 bottom-0 ${panelRightClass} w-80 sm:w-96 bg-white shadow-xl transition-all`}>
  <div class="absolute w-6 h-6 top-3 right-3 cursor-pointer" on:click={() => visible = false}>
    <div class="absolute top-0.5 left-3 w-px h-5 transform rotate-45 bg-gray-600"></div>
    <div class="absolute top-0.5 left-3 w-px h-5 transform -rotate-45 bg-gray-600"></div>
  </div>

  <div class="a pt-12 pb-3 px-3">
    <slot></slot>
  </div>
</div>