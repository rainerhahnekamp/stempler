<script>
	import Counter from '../components/Counter.svelte';
	let measurements = [];
	const saveMeasurement = (event) => {
		console.log(event.detail);
		measurements = [...measurements, event.detail];
	};
</script>

<h1>Stempler</h1>
<Counter on:measured={saveMeasurement} />

<h2>Measurements</h2>
{#each measurements as measurement}
	<div style="display: flex">
		<p>{measurement.name}</p>
		<p>{measurement.tags}</p>
		<p>{measurement.startedAt}</p>
		<p>{measurement.endedAt}</p>
	</div>
{/each}
