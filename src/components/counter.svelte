<script>
	const startDate = new Date();
	let now = new Date();
	let elapsed = 0;
	window.setInterval(() => (now = new Date()), 1000);

	$: {
		elapsed = Math.floor((now - startDate) / 1000);
		console.log(elapsed);
	}
</script>

<p>{elapsed}</p>
