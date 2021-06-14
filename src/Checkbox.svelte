<script lang="typescript">
  export let checked = false
  export let color
</script>

<label class="checkbox cursor-pointer flex items-center" class:checked={checked}>
  <span 
    class="checkbox-input inline-block relative border rounded-sm bg-white"
    style={`
      background-color: ${color};
      border-color: ${color};
    `} 
  ></span>
  <input 
    class="checkbox-original opacity-0 outline-none absolute m-0 w-0 h-0"
    type="checkbox" 
    bind:checked={checked}
  >
</label>

<style>
.checkbox.checked .checkbox-input::after {
  transform: rotate(45deg) scaleY(1);
}
.checkbox-input {
  width: 16px;
  height: 16px;
  transition: border-color .25s cubic-bezier(.71, -.46, .29, 1.46), background-color .25s cubic-bezier(.71, -.46, .29, 1.46);
}
.checkbox-input::after {
  box-sizing: content-box;
  content: "";
  border: 2px solid #fff;
  border-left: 0;
  border-top: 0;
  height: 8px;
  left: 5px;
  position: absolute;
  top: 1px;
  transform: rotate(45deg) scaleY(0);
  width: 3px;
  transition: transform .15s ease-in .05s;
  transform-origin: center;
}
.checkbox-original {
  z-index: -1;
}
</style>