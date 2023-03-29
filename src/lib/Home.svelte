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
		
		async function searchByCity() {
		  const city = prompt('Digite o nome da cidade:')
		  const querySnapshot = await firestore.collection('Exemplo').where('CITY', '==', city).get()
		  querySnapshot.forEach((doc) => {
			console.log(doc.id, " => ", doc.data())
			// ou, por exemplo:
			// this.resultados = doc.data() (se você estiver usando o Svelte)
		  })
		}
		</script>
		
		<button on:click={searchByCity}>Pesquisar por cidade</button>
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
