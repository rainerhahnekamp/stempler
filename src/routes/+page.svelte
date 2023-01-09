<script>
	import Counter from '../components/counter.svelte';
	import { formatDate } from '../date/format-date.ts';
	import { formatDuration } from '../date/format-duration.ts';
	export let data;
	if (!data) {
		throw new Error('data is not initialised');
	}
	let measurements = data.measurements;

	const saveMeasurement = async (event) => {
		await fetch('/api/measurement', { method: 'POST', body: JSON.stringify(event.detail) });
		measurements = [...measurements, event.detail].sort((m1, m2) => m2.startedAt - m1.startedAt);
	};
</script>

<Counter on:measured={saveMeasurement} />

{#if measurements.length}
	<h2 class="text-2xl font-bold mt-4 mb-2">Measurements</h2>

	<div class="grid grid-cols-5">
		<p class="font-bold">Name</p>
		<p class="font-bold">Tags</p>
		<p class="font-bold">Start</p>
		<p class="font-bold">End</p>
		<p class="font-bold">Duration</p>
		{#each measurements as measurement}
			<p>{measurement.name}</p>
			<p>{measurement.tags}</p>
			<p>{formatDate(measurement.startedAt)}</p>
			<p>{formatDate(measurement.endedAt)}</p>
			<p>{formatDuration(measurement.startedAt, measurement.endedAt)}</p>
		{/each}
	</div>
{/if}

{#if data.error}
	<div class="bg-red-500 text-white rounded p-4 mt-4">
		<p>{data.error.name}</p>
		<p>{data.error.message}</p>
	</div>
{/if}
