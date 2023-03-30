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

<script type="module">

	// Import the functions you need from the SDKs you need
	import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
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

	//THIS IS WHERE YOU PASTE THE CODE TO CONNECT TO YOUR OWN DATABASE
	//Copy and paste the CDN bit of code from your app that you created on Firebase.
	//The script tag above is already there, so careful not to have duplicate script tags.
	//After you've copied and pasted, just delete the unnecessary script tags. 

	import {getDatabase, ref, get, set, child, update, remove}
	from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";

	const db = getDatabase();

	var enterID = document.querySelector("#enterID");
	var enterName = document.querySelector("#enterName");
	var enterAge = document.querySelector("#enterAge");
	var findID = document.querySelector("#findID");
	var findName = document.querySelector("#findName");
	var findAge = document.querySelector("#findAge");
  

	var insertBtn = document.querySelector("#insert");
	var updateBtn = document.querySelector("#update");
	var removeBtn = document.querySelector("#remove");
	var findBtn = document.querySelector("#find");

	function InsertData() {
		set(ref(db, "People/"+ enterID.value),{
			Nome: enterName.value,
			ID: enterID.value,
			Age: enterAge.value
		})
		.then(()=>{
			alert("Data added successfully");
		})
		.catch((error)=>{
			alert(error);
		});
	}

	function FindData() {
		const dbref = ref(db);

		get(child(dbref, "People/" + findID.value))
		.then((snapshot)=>{
			if(snapshot.exists()){
				findName.innerHTML = "Nome: " + snapshot.val().Nome;
				findAge.innerHTML = "Age: " + snapshot.val().Age;
			} else {
				alert("No data found");
			}
		})
		.catch((error)=>{
			alert(error)
		})
		
	}

	function UpdateData(){
		update(ref(db, "People/"+ enterID.value),{
			Nome: enterName.value,
			Age: enterAge.value
		})
		.then(()=>{
			alert("Data updated successfully");
		})
		.catch((error)=>{
			alert(error);
		});
	}

	function RemoveData(){
		remove(ref(db, "People/"+ enterID.value))
		.then(()=>{
			alert("Data deleted successfully");
		})
		.catch((error)=>{
			alert(error);
		});
	}

	insertBtn.addEventListener('click', InsertData);
	updateBtn.addEventListener('click', UpdateData);
	removeBtn.addEventListener('click', RemoveData);
	findBtn.addEventListener('click', FindData);

  </script>

<div class="pt-6 md:pt-10 text-slate-200">
	<div>
		<div class="mb-8">
			<div class="mb-4 font-semibold text-lg">What kind of session are you searching for?</div>
			<div class="flex items-center">

			<div id="findDetails">
				<h1>Find by ID</h1>
				<h4>ID</h4>
				<input id="findID" type="text"> <br><br>
				<button id="find">FIND</button>
				<h3 id="findName" type="text"></h3>
				<h3 id="findAge" type="number"></h3> <br><br>
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
