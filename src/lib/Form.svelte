<script>
	import LoadingIndicator from './Loading.svelte';

	/**
	 * @type string
	 */
	export let cinemaType;
	/**
	 * @type Array<string>
	 */
	export let selectedCategories;
	/**
	 * @type string
	 */
	export let specificDescriptors;
	/**
	 * @type Boolean
	 */
	export let loading;

	const categoryTypes = [
		'Future of PM',
		'PMO',
		'PMI',
		'PMO Awards',
		'Agile',
		'PMBOK',
		'AI'
	];

	let cinemaTypes = [
		{ value: 'tv show', title: 'Educational' },
		{ value: 'movie', title: 'Benchmarking' },
		{ value: 'tv show or movie', title: 'Talk Show' }
	];

</script>

<div class="pt-6 md:pt-10 text-slate-200">
	<div>
			<div class="mb-8">
				<div class="mb-4 font-semibold text-lg">What kind of session are you searching for?</div>
					<div class="flex items-center">
						<script>
							import { onMount } from 'svelte';
							import { child, get, query, ref } from 'firebase/database';
							import { firebaseApp } from './firebaseConfig.js';
						
							let dbref;
							let People = [];
							
						
							const search = async () => {
							const queryRef = query(child(dbref, 'People/'), orderByChild('ID'), equalTo(ID));
							const snapshot = await get(queryRef);
							People = snapshot.exists() ? [snapshot.val()] : [];
							};
						
							onMount(() => {
							const db = firebaseApp.database();
							dbref = ref(db);
							});
						</script>
						<div>
								<input type="text" bind:value={ID}>
								<button on:click={search}>Search</button>
							
								{#if People.length > 0}
								<table>
									<thead>
									<tr>
										<th>ID</th>
										<th>Nome</th>
										<th>Age</th>
									</tr>
									</thead>
									<tbody>
									{#each People as person}
										<tr>
										<td>{person.ID}</td>
										<td>{person.Nome}</td>
										<td>{person.Age}</td>
										</tr>
									{/each}
									</tbody>
								</table>
								{:else}
								<p>No results found.</p>
								{/if}
						</div>
				</div>
			</div>
			<div class="mt-8">
				<button
					on:click
					class={`${
						loading
							? 'bg-pink-400/50'
							: 'bg-pink-600 hover:bg-gradient-to-r from-pink-700 via-pink-600 to-pink-700 '
					} mt-4 w-full h-10 text-white font-bold p-3 rounded-full flex items-center justify-center`}
				>
					{#if loading}
						<LoadingIndicator />
					{:else}
						<p>Curate My List</p>
					{/if}
				</button>
			</div>
	</div>
</div>
