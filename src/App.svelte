<script lang="typescript">
  import { onMount } from 'svelte'
  import store from 'store2'
  import { currentColor } from './store'
  import { createRandomCode, getDateTime } from './utils'
  import Checkbox from './Checkbox.svelte'
  import Panel from './Panel.svelte'
  import Button from './Button.svelte'
  import Input from './Input.svelte'
  import Message from './Message.svelte'

  interface Todo {
    id: string;
    content: string;
    time: string;
    completed: boolean;
  }

  interface Quadrant {
    label: string;
    color: string;
    bgColor: string;
    list: Todo[];
  }

  let todos: Quadrant[] = [
    {
      label: '重要-紧急',
      color: '#ef4444',
      bgColor: '#fee2e2',
      list: [],
    },
    {
      label: '重要-不紧急',
      bgColor: '#fef3c7',
      color: '#f59e0b',
      list: [],
    },
    {
      label: '不重要-紧急',
      bgColor: '#dbeafe',
      color: '#3b82f6',
      list: [],
    },
    {
      label: '不重要-不紧急',
      bgColor: '#d1fae5',
      color: '#10b981',
      list: [],
    },
  ]

  onMount(() => {
    const _todos = store.get('svelte_todos')
    if (_todos) todos = _todos
  })

  const save = () => store.set('svelte_todos', todos)

  let message = ''

  const stateForCreate = {
    isOpenPanel: false,
    lv: 0,
    content: '',
  }
  const stateForModify = {
    isOpenPanel: false,
    lv: 0,
    content: '',
    id: '',
  }

  $: {
    let lv = -1
    if (stateForCreate.isOpenPanel) {
      lv = stateForCreate.lv
    }
    else if (stateForModify.isOpenPanel) {
      lv = stateForModify.lv
    }
    if (lv !== -1) currentColor.set(todos[lv].color)
  }

  const openCreatePanel = (lv: number) => {
    if (stateForModify.isOpenPanel) stateForModify.isOpenPanel = false

    stateForCreate.content = ''
    stateForCreate.lv = lv
    stateForCreate.isOpenPanel = true
  }

  const openModifyPanel = (lv: number, id: string) => {
    if (stateForCreate.isOpenPanel) stateForCreate.isOpenPanel = false

    const target = todos[lv].list.find(item => item.id === id)

    stateForModify.lv = lv
    stateForModify.id = id
    stateForModify.content = target.content
    stateForModify.isOpenPanel = true
  }

  const addTodo = () => {
    const { lv, content } = stateForCreate

    if (!content) {
      message = '任务不可以为空！'
      return
    }

    const list = todos[lv].list
    const id = createRandomCode()
    const time = getDateTime({ format: 'yyyy-MM-dd hh:mm' })
    list.push({ id, content, time, completed: false })
    todos[lv].list = list
    save()

    stateForCreate.isOpenPanel = false
  }

  const updateTodo = () => {
    const { lv, id, content } = stateForModify
    todos[lv].list = todos[lv].list.map(item => item.id === id ? { ...item, content } : item)
    save()

    stateForModify.isOpenPanel = false
  }

  const removeTodo = () => {
    const { lv, id } = stateForModify
    todos[lv].list = todos[lv].list.filter(item => item.id !== id)
    save()

    stateForModify.isOpenPanel = false
  }
</script>

<div class="h-full lg:grid grid-cols-2 grid-rows-2">
  {#each todos as { label, bgColor, color, list }, index (index)}
  <div class="todos p-4 flex flex-col border-0" class:lg:border-r={index % 2 === 0} class:lg:border-t={index > 1}>
    <div 
      class="label p-3 rounded mb-2 flex justify-between cursor-pointer" 
      style={`background-color: ${bgColor}; color: ${color};`} 
      on:click={() => openCreatePanel(index)}
    >
      <span>{label}</span>
      <span>+</span>
    </div>
    <div class="overflow-auto flex-1">
      {#each list as { id, content, time, completed } (id)}
      <div 
        class="p-2 flex items-center border-b border-dashed cursor-pointer hover:bg-gray-100 transition-colors" 
        class:opacity-50={completed}
        on:click={() => openModifyPanel(index, id)}
      >
        <div class="flex items-center flex-1">
          <div on:click|stopPropagation><Checkbox bind:checked={completed} color={color} /></div>
          <span class="text-gray-600 ml-2 break-all" class:line-through={completed}>{content}</span>
        </div>
        <div class="w-28 text-xs text-right text-gray-400">{time}</div>
      </div>
      {/each}
    </div>
  </div>
  {/each}
</div>

<Panel bind:visible={stateForCreate.isOpenPanel}>
  <Input placeholder="在此输入任务" bind:value={stateForCreate.content} />
  <div class="mt-4">
    <Button type="primary" on:click={addTodo}>创建</Button>
    <Button on:click={() => stateForCreate.isOpenPanel = false}>取消</Button>
  </div>
</Panel>

<Panel bind:visible={stateForModify.isOpenPanel}>
  <Input placeholder="在此输入任务" bind:value={stateForModify.content} />
  <div class="mt-4 flex justify-between">
    <div>
      <Button type="primary" on:click={updateTodo}>修改</Button>
      <Button on:click={() => stateForModify.isOpenPanel = false}>取消</Button>
    </div>
    <Button on:click={removeTodo}>删除</Button>
  </div>
</Panel>

<Message visible={!!message} on:finish={() => message = ''}>{message}</Message>