<script>
	import '../app.css';

	let showMenu = false;

	const menuItems = [
		{ label: 'Home', link: '/' },
		{ label: 'Tags', link: '/tags' },
		{ label: 'Reports', link: '/reports' },
		{ label: 'Impressum', link: '/impressum' },
		{ label: 'Feedback', link: '/feedback' }
	];
</script>

<nav class="border-b">
	<div class="container relative max-w-screen-lg mx-auto flex justify-between h-14">
		<a href="#" class="flex items-center cursor-pointer hover:bg-purple-50 px-2 ml-3">
			<div class="text-gray-700 font-semibold ml-2">Stempler</div>
		</a>

		<button
			on:click={() => (showMenu = !showMenu)}
			class="block md:hidden text-gray-700 p-2 rounded hover:border focus:border focus:bg-gray-100 my-2 mr-5"
			type="button"
			aria-controls="navbar-main"
			aria-expanded="false"
			aria-label="Toggle navigation"
		>
			<svg
				class="w-5 h-5"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 6h16M4 12h16M4 18h16"
				/></svg
			>
		</button>
		<ul class={showMenu ? 'menu mobile-menu-visible' : 'menu mobile-menu-hidden'} id="navbar-main">
			{#each menuItems as menuItem}
				<li class={showMenu ? 'menu-item py-1' : 'menu-item'}>
					<a href={menuItem.link}>{menuItem.label}</a>
				</li>
			{/each}
		</ul>
	</div>
</nav>
<div class="container relative max-w-screen-lg mx-auto pt-2">
	<slot />
</div>
