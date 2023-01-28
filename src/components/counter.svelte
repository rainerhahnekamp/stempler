<script>
	import { createEventDispatcher } from 'svelte';
	import { formatDuration } from '../date/format-duration.ts';

	export let measurement = {
		id: 0,
		name: '',
		tags: '',
		start: new Date()
	};

	let now = new Date();
	let timer = formatDuration(measurement.start, now);

	let intervalId = 0;

	const mapTags = (value) => value.split(' ').filter(Boolean);

	intervalId = setInterval(() => (now = new Date()), 1000);
	const finish = () => {
		clearInterval(intervalId);
		dispatch('finish', { ...measurement, tags: mapTags(measurement.tags) });
	};

	const edit = () => {
		dispatch('edit', { ...measurement, tags: mapTags(measurement.tags) });
	};

	$: {
		if (measurement.start && now) {
			timer = formatDuration(measurement.start, now);
		}
	}

	const dispatch = createEventDispatcher();
</script>

<p>{timer}</p>
<form on:submit|preventDefault={edit}>
	<input type="submit" hidden />
	<input name="id" bind:value={measurement.id} type="hidden" />
	<div class="flex gap-x-2 items-center">
		<input class="input" name="name" placeholder="Name" bind:value={measurement.name} />
		<input class="input" name="tags" placeholder="Tags" bind:value={measurement.tags} />

		<button class="button-red" on:click={finish} type="button">Finish</button>
	</div>
</form>
