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
		'PMBOK2',
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
							import { child, get, query, ref } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js"
							import { firebaseApp } from './firebaseConfig.js';
							
							import { initializeApp } from "firebase/app";
							// TODO: Add SDKs for Firebase products that you want to use
							// https://firebase.google.com/docs/web/setup#available-libraries

							// Your web app's Firebase configuration
							const firebaseConfig = {
							  apiKey: "AIzaSyDIdYSvnnE0gw5W5gChAL1xe-QixcEWZzw",
							  authDomain: "exemplo2-57c2a.firebaseapp.com",
							  databaseURL: "https://exemplo2-57c2a-default-rtdb.firebaseio.com",
							  projectId: "exemplo2-57c2a",
							  storageBucket: "exemplo2-57c2a.appspot.com",
							  messagingSenderId: "943755642817",
							  appId: "1:943755642817:web:233e8bd9559ab31abdd140"
							};

							// Initialize Firebase
							const app = initializeApp(firebaseConfig);
							
							let dbref;
							let produtos = [];
							
						
							const search = async () => {
							const queryRef = query(child(dbref, 'produtos/'), orderByChild('ID'), equalTo('ID'));
							const snapshot = await get(queryRef);
							produtos = snapshot.exists() ? [snapshot.val()] : [];
							};
						
							onMount(() => {
							const db = firebaseApp.database();
							dbref = ref(db);
							});
						</script>
						<div>
								<input type="text" bind:value={ID}>
								<button on:click={search}>Search</button>
							
								{#if produtos.length > 0}
								<table>
									<thead>
									<tr>
										<th>ID</th>
										<th>Nome</th>
										<th>Preço</th>
									</tr>
									</thead>
									<tbody>
									{#each produtos as person}
										<tr>
										<td>{person.ID}</td>
										<td>{person.nome}</td>
										<td>{person.preco}</td>
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
