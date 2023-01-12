<script>
	import Counter from '../components/counter.svelte';
	import { formatDate } from '../date/format-date.ts';
	import { formatDuration } from '../date/format-duration.ts';
	import { MeasurementService } from '../client/measurement-service.ts';
	import { measurementSchema } from '../client/model/measurement.ts';
	import { login, user } from '../auth/auth-service.ts';
	export let data;
	if (!data) {
		throw new Error('data is not initialised');
	}
	let measurements = data.measurements;

	const measurementService = new MeasurementService();

	const saveMeasurement = async (event) => {
		const entry = measurementSchema.parse({ id: 0, ...event.detail });
		const measurement = await measurementService.saveMeasurement(entry);
		measurements = [...measurements, measurement].sort((m1, m2) => m2.start - m1.start);
	};

	const remove = async (id) => {
		measurements = [...(await measurementService.remove(id))];
	};

	const resume = async () => {
		alert('not yet implemented');
	};
</script>

{#if $user}
	<Counter on:measured={saveMeasurement} />

	{#if measurements.length}
		<h2 class="text-2xl font-bold mt-4 mb-2">Measurements</h2>

		<div class="grid grid-cols-6 gap-y-1 items-center">
			<p class="font-bold">Name</p>
			<p class="font-bold">Tags</p>
			<p class="font-bold">Start</p>
			<p class="font-bold">End</p>
			<p class="font-bold">Duration</p>
			<p class="font-bold">&nbsp;</p>
			{#each measurements as measurement}
				<p>{measurement.name}</p>
				<p>{measurement.tags}</p>
				<p>{formatDate(measurement.start)}</p>
				<p>{formatDate(measurement.end)}</p>
				<p>{formatDuration(measurement.start, measurement.end)}</p>
				<div>
					<button class="button-red" on:click={() => remove(measurement.id)}>Delete</button>
					<button class="button" on:click={() => resume(measurement.id)}>Resume</button>
				</div>
			{/each}
		</div>
	{/if}

	{#if data.error}
		<div class="bg-red-500 text-white rounded p-4 mt-4">
			<p>{data.error.name}</p>
			<p>{data.error.message}</p>
		</div>
	{/if}
{:else}
	<div class="flex flex-col items-center gap-y-4 ">
		<p>Please login, to continue</p>
		<p>
			<button on:click={login} class="button">Login</button>
		</p>
	</div>
{/if}
