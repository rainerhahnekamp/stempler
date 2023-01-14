<script>
	import Counter from '../components/counter.svelte';
	import { formatDate } from '../date/format-date.ts';
	import { formatDuration } from '../date/format-duration.ts';
	import { MeasurementService } from '../client/measurement-service.ts';
	import { measurementSchema } from '../client/model/measurement.ts';
	import { login } from '../auth/auth-service.ts';
	import { auth } from '../auth/auth.ts';

	let measurements = [];
	let status = 'stopped';
	let name = '';
	let tags = '';
	const start = (measurementName = '', measurementTags = '') => {
		name = measurementName;
		tags = measurementTags;
		status = 'running';
	};
	const measurementService = new MeasurementService();
	const sorter = (m1, m2) => m2.start - m1.start;

	measurementService.findAll().then((records) => (measurements = records.sort(sorter)));

	const saveMeasurement = async (event) => {
		status = 'stopped';
		const entry = measurementSchema.parse({ id: 0, ...event.detail });
		const measurement = await measurementService.saveMeasurement(entry);
		measurements = [...measurements, measurement].sort(sorter);
	};

	const remove = async (id) => {
		measurements = [...(await measurementService.remove(id)).sort(sorter)];
	};

	const resume = async (measurement) => {
		start(measurement.name, measurement.tags.join(', '));
	};
</script>

{#if $auth.username}
	{#if status === 'running'}
		<Counter on:measured={saveMeasurement} {name} {tags} />
	{:else}
		<button class="button-green" on:click={() => start()}>Start</button>
	{/if}

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
				<p>{measurement.tags.join(', ')}</p>
				<p>{formatDate(measurement.start)}</p>
				<p>{formatDate(measurement.end)}</p>
				<p>{formatDuration(measurement.start, measurement.end)}</p>
				<div>
					<button class="button-red" on:click={() => remove(measurement.id)}>Delete</button>
					<button class="button" on:click={() => resume(measurement)}>Resume</button>
				</div>
			{/each}
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
