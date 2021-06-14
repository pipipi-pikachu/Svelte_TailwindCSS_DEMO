<script lang="typescript">
  export let value = ''
  export let placeholder = ''
</script>

<input type="text" placeholder={placeholder} bind:value={value} class="w-full outline-none border-b px-1 py-2 text-sm focus:border-gray-400">