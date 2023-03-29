<div class="w-full">
	<div
		class="text-center md:text-left font-bold text-slate-200 text-4xl md:text-5xl mb-8 md:mb-16 w-full"
	>
		Get curated show <br class="hidden md:block" /> and movie recommendations
		<br class="hidden md:block" /> with Open AI
	</div>
	<hr>
	<br>
	<script>
		import { initializeApp } from 'firebase/app'
		import { getFirestore } from 'firebase/firestore'
		let city = ''
		let resultados = ''
		
		// Inicializa o Firebase
		const firebaseConfig = {
			apiKey: "AIzaSyBfd--6fT0CJCPOIa4SOQVDTmiQBBhUQxM",
    		authDomain: "pmoflix-deb5a.firebaseapp.com",
    		databaseURL: "https://pmoflix-deb5a-default-rtdb.firebaseio.com",
    		projectId: "pmoflix-deb5a",
    		storageBucket: "pmoflix-deb5a.appspot.com",
    		messagingSenderId: "477067952595",
    		appId: "1:477067952595:web:a8b3ed6a1b200fcbfbef26",
    		measurementId: "G-3B5RF84JCE"
		}
		const app = initializeApp(firebaseConfig)
		const firestore = getFirestore(app)
		
		// Define a função de pesquisa por cidade
		async function searchByCity() {
		  const querySnapshot = await firestore.collection('Exemplo').where('CITY', '==', city).get()
		  resultados = ''
		  querySnapshot.forEach((doc) => {
			resultados += `Cidade: ${doc.data().CITY}, Estado: ${doc.data().STATE}<br>`
		  })
		  if (resultados === '') {
			resultados = 'Nenhum resultado encontrado.'
		  }
		  document.getElementById('resultados').innerHTML = resultados
		}
	  </script>
	  
	  <label>Digite o nome da cidade:</label>
	  <input type="text">
	  
	  <button on:click={searchByCity}>Pesquisar por cidade</button>
	  
	  <div id="resultados"></div>
		<br>
	<hr>
	<div class="flex flex-wrap items-center mr-auto">
		<button
			on:click
			class="w-full md:w-auto text-center bg-pink-600 hover:bg-pink-700 mb-4 flex-none rounded-full text-white font-medium py-3 px-6 mr-8"
		>
			Get recommendations
		</button>
		<a
			href="https://www.youtube.com/watch?v=Z3LrfdctOpU"
			target="_blank"
			class="w-full md:w-auto text-center bg-white/20 hover:bg-white/50 mb-4 flex-none rounded-full text-white font-medium py-3 px-6"
		>
			Learn how it's built
		</a>
	</div>
</div>
