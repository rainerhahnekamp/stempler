<script>
	import { createEventDispatcher } from 'svelte';

	let status = 'stopped';
	let startedAt;
	let now = undefined;
	let timer = '';

	let name = '';
	let tags = '';
	let intervalId = 0;

	const start = () => {
		startedAt = now = new Date();
		status = 'running';
		intervalId = setInterval(() => (now = new Date()), 1000);
	};
	const stop = () => {
		status = 'stopped';
		clearInterval(intervalId);
		dispatch('measured', {
			name,
			tags: tags.split(' '),
			startedAt,
			endedAt: new Date()
		});
	};

	$: {
		if (startedAt && now) {
			const elapsed = Math.floor((now - startedAt) / 1000);
			const hours = Math.floor(elapsed / 3600);
			const minutes = Math.floor((elapsed % 3600) / 60);
			const seconds = Math.floor(elapsed % 60);
			timer = `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
		}
	}

	const dispatch = createEventDispatcher();
</script>

{#if status === 'stopped'}
	<button on:click={start}>Start</button>
{:else}
	<p>{timer}</p>
	<form>
		<input name="name" placeholder="name" bind:value={name} autofocus />
		<input name="tags" placeholder="tags" bind:value={tags} />
	</form>
	<button on:click={stop}>Stop</button>
{/if}
