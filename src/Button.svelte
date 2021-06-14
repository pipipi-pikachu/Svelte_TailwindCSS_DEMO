<script lang="typescript">
  import { currentColor } from './store'
  export let type = 'default'
</script>

{#if type === 'primary'}
  <button on:click class="text-white text-sm border py-1 px-3.5 rounded tracking-widest" style={`background-color: ${$currentColor}; border-color: ${$currentColor};`}><slot></slot></button>
{:else}
  <button on:click class="text-sm bg-white border py-1 px-3.5 rounded tracking-widest" style={`color: ${$currentColor}; border-color: ${$currentColor};`}><slot></slot></button>
{/if}