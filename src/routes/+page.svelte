<script>
	import Counter from '../components/counter.svelte';
	import { formatDate } from '../date/format-date.ts';
	import { formatDuration } from '../date/format-duration.ts';
	import { MeasurementService } from '../client/measurement-service.ts';
	import { measurementSchema } from '../server/measurement/measurement.ts';
	import { login } from '../auth/auth-service.ts';
	import { auth } from '../auth/auth.ts';

	let finishedMeasurements = [];
	let unfinishedMeasurements = [];
	let status = 'stopped';
	let id = 0;
	let name = '';
	let tags = '';
	let start = new Date();
	let dataLoaded = false;

	const measurementService = new MeasurementService();
	const sorter = (m1, m2) => m2.start - m1.start;

	const fromTags = (tags) => tags.map((tag) => tag.name).join(' ');

	const updateMeasurements = (measurementsOverview) => {
		finishedMeasurements = measurementsOverview.finished;
		unfinishedMeasurements = measurementsOverview.unfinished;

		const { active } = measurementsOverview;
		if (active) {
			id = active.id;
			status = 'running';
			name = active.name;
			tags = fromTags(active.tags);
			start = active.start;
		} else {
			id = 0;
			status = 'stopped';
			name = '';
			tags = '';
		}
	};

	measurementService.findAll().then((measurementOverview) => {
		updateMeasurements(measurementOverview);
		dataLoaded = true;
	});

	const startMeasurement = async (measurementName = '', measurementTags = '') => {
		const measurement = await measurementService.start({
			name: measurementName,
			tags: measurementTags.split(' ')
		});
		name = measurement.name;
		tags = measurement.tags;
		start = measurement.start;
		status = 'running';
	};

	const edit = async (event) => {
		const measurement = event.detail;
		updateMeasurements(await measurementService.edit(measurement));
	};

	const finish = async (event) => {
		status = 'stopped';
		const entry = measurementSchema.parse({ id: 0, ...event.detail });
		const measurementsOverview = await measurementService.finish(entry);
		updateMeasurements(measurementsOverview);
	};

	const remove = async (id) => {
		const measurementsOverview = await measurementService.remove(id);
		updateMeasurements(measurementsOverview);
	};

	const resume = async (measurement) =>
		startMeasurement(measurement.name, measurement.tags.join(' '));
</script>

{#if $auth.username}
	{#if status === 'running'}
		<Counter on:finish={finish} on:edit={edit} {id} {name} {tags} {start} />
	{:else if dataLoaded}
		<button class="button-green" on:click={() => startMeasurement()}>Start</button>
	{/if}

	{#if finishedMeasurements.length}
		<h2 class="text-2xl font-bold mt-4 mb-2">Measurements</h2>

		<div class="grid grid-cols-6 gap-y-1 items-center">
			<p class="font-bold">Name</p>
			<p class="font-bold">Tags</p>
			<p class="font-bold">Start</p>
			<p class="font-bold">End</p>
			<p class="font-bold">Duration</p>
			<p class="font-bold">&nbsp;</p>
			{#each finishedMeasurements as measurement}
				<p>{measurement.name}</p>
				<div class="flex flex-col flex-wrap content-center gap-y-1">
					{#each measurement.tags as tag}<span
							class="py-0.5 px-1 rounded bg-blue-500 text-white text-xs">{tag}</span
						>
					{/each}
				</div>
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
