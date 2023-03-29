<div class="w-full">
	<div
		class="text-center md:text-left font-bold text-slate-200 text-4xl md:text-5xl mb-8 md:mb-16 w-full"
	>
		Get curated show <br class="hidden md:block" /> and movie recommendations
		<br class="hidden md:block" /> with Open AI
	</div>
	<hr>
	<script>
		import { firestore } from './firebase.js'
		let city = ''
		let resultados = ''
	  
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
	  
	  <label for="city">Digite o nome da cidade:</label>
	  <input type="text" id="city" bind:value={city}>
	  
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
