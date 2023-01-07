<script>
	import Counter from '../components/Counter.svelte';
	let name = 'Hello everybody';
	let status = 'stopped';
</script>

<h1>{name}</h1>
{#if status === 'stopped'}
	<button on:click={() => (status = 'running')}>Start</button>
{:else}
	<Counter />
	<button on:click={() => (status = 'stopped')}>Stop</button>
{/if}
