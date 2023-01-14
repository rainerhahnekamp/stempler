<script ✂prettier:content✂="CglpbXBvcnQgQ291bnRlciBmcm9tICcuLi9jb21wb25lbnRzL2NvdW50ZXIuc3ZlbHRlJzsKCWltcG9ydCB7Zm9ybWF0RGF0ZX0gZnJvbSAnLi4vZGF0ZS9mb3JtYXQtZGF0ZS50cyc7CglpbXBvcnQge2Zvcm1hdER1cmF0aW9ufSBmcm9tICcuLi9kYXRlL2Zvcm1hdC1kdXJhdGlvbi50cyc7CglpbXBvcnQge01lYXN1cmVtZW50U2VydmljZX0gZnJvbSAnLi4vY2xpZW50L21lYXN1cmVtZW50LXNlcnZpY2UudHMnOwoJaW1wb3J0IHttZWFzdXJlbWVudFNjaGVtYX0gZnJvbSAnLi4vY2xpZW50L21vZGVsL21lYXN1cmVtZW50LnRzJzsKCWltcG9ydCB7bG9naW59IGZyb20gJy4uL2F1dGgvYXV0aC1zZXJ2aWNlLnRzJzsKCWltcG9ydCB7YXV0aH0gZnJvbSAnLi4vYXV0aC9hdXRoLmpzJzsKCglsZXQgbWVhc3VyZW1lbnRzID0gW107Cgljb25zdCBtZWFzdXJlbWVudFNlcnZpY2UgPSBuZXcgTWVhc3VyZW1lbnRTZXJ2aWNlKCk7CgltZWFzdXJlbWVudFNlcnZpY2UuZmluZEFsbCgpLnRoZW4oKHJlY29yZHMpID0+IChtZWFzdXJlbWVudHMgPSByZWNvcmRzKSk7CgoJY29uc3Qgc2F2ZU1lYXN1cmVtZW50ID0gYXN5bmMgKGV2ZW50KSA9PiB7CgkJY29uc3QgZW50cnkgPSBtZWFzdXJlbWVudFNjaGVtYS5wYXJzZSh7aWQ6IDAsIC4uLmV2ZW50LmRldGFpbH0pOwoJCWNvbnN0IG1lYXN1cmVtZW50ID0gYXdhaXQgbWVhc3VyZW1lbnRTZXJ2aWNlLnNhdmVNZWFzdXJlbWVudChlbnRyeSk7CgkJbWVhc3VyZW1lbnRzID0gWy4uLm1lYXN1cmVtZW50cywgbWVhc3VyZW1lbnRdLnNvcnQoKG0xLCBtMikgPT4gbTIuc3RhcnQgLSBtMS5zdGFydCk7Cgl9OwoKCWNvbnN0IHJlbW92ZSA9IGFzeW5jIChpZCkgPT4gewoJCW1lYXN1cmVtZW50cyA9IFsuLi4oYXdhaXQgbWVhc3VyZW1lbnRTZXJ2aWNlLnJlbW92ZShpZCkpXTsKCX07CgoJY29uc3QgcmVzdW1lID0gYXN5bmMgKCkgPT4gewoJCWFsZXJ0KCdub3QgeWV0IGltcGxlbWVudGVkJyk7Cgl9Owo=">{}</script>

{#if $auth.username}
	<Counter on:measured={saveMeasurement}/>

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
{:else}
	<div class="flex flex-col items-center gap-y-4 ">
		<p>Please login, to continue</p>
		<p>
			<button on:click={login} class="button">Login</button>
		</p>
	</div>
{/if}