<script>
	import { createEventDispatcher } from 'svelte';
	import { formatDuration } from '../date/format-duration.ts';

	let status = 'stopped';
	let start;
	let now = undefined;
	let timer = '';

	let name = '';
	let tags = '';
	let intervalId = 0;

	const run = () => {
		start = now = new Date();
		status = 'running';
		intervalId = setInterval(() => (now = new Date()), 1000);
	};
	const stop = () => {
		status = 'stopped';
		clearInterval(intervalId);
		dispatch('measured', {
			name,
			tags: tags.split(' '),
			start,
			end: new Date()
		});
	};

	$: {
		if (start && now) {
			timer = formatDuration(start, now);
		}
	}

	const dispatch = createEventDispatcher();
</script>

{#if status === 'stopped'}
	<button class="button-green" on:click={run}>Start</button>
{:else}
	<p>{timer}</p>
	<form>
		<div class="flex">
			<input
				class="border border-gray-300 focus:outline-blue-400 rounded w-full h-8 p-3 text-sm"
				name="name"
				placeholder="name"
				bind:value={name}
				autofocus
			/>
			<input
				class="border border-gray-300 focus:outline-blue-400 rounded w-full h-8 p-3 text-sm"
				name="tags"
				placeholder="tags"
				bind:value={tags}
			/>

			<button class="button-red" on:click={stop}>Stop</button>
		</div>
	</form>
{/if}
