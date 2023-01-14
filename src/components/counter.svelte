<script>
	import { createEventDispatcher } from 'svelte';
	import { formatDuration } from '../date/format-duration.ts';

	export let start = new Date();
	let now = new Date();
	let timer = formatDuration(start, now);

	export let name = '';
	export let tags = '';
	let intervalId = 0;

	intervalId = setInterval(() => (now = new Date()), 1000);
	const stop = () => {
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

<p>{timer}</p>
<form>
	<div class="flex">
		<input
			class="border border-gray-300 focus:outline-blue-400 rounded w-full h-8 p-3 text-sm"
			name="name"
			placeholder="name"
			bind:value={name}
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
