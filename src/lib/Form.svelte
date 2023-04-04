<script>
  import { onMount } from "svelte";
  import { getDatabase, ref, query, orderByChild, equalTo } from "firebase/database";
  
  let loadingv1 = false;
  let results = null;
  let nome = '';
  let age = '';
  
  function search() {
    loadingv1 = true;
    
    const db = getDatabase();
    const peopleRef = ref(db, "produtos");
    const ageQuery = query(peopleRef, orderByChild("preco"), equalTo(preco));
    const nameQuery = query(peopleRef, orderByChild("nome"), equalTo(nome));
    
    Promise.all([get(ageQuery), get(nameQuery)]).then((snapshots) => {
      loadingv1 = false;
      
      const ageResults = snapshots[0];
      const nameResults = snapshots[1];
      
      // Combine results into a single array
      const combinedResults = ageResults.concat(nameResults);
      
      // Remove duplicates from the array
      results = Array.from(new Set(combinedResults.map((result) => result.ID))).map((id) => {
        return combinedResults.find((result) => result.ID === id);
      });
    });
  }
  
  onMount(() => {
    // Initialize Firebase here
	firebase.initializeApp ({
  apiKey: "AIzaSyDIdYSvnnE0gw5W5gChAL1xe-QixcEWZzw",
  authDomain: "exemplo2-57c2a.firebaseapp.com",
  databaseURL: "https://exemplo2-57c2a-default-rtdb.firebaseio.com",
  projectId: "exemplo2-57c2a",
  storageBucket: "exemplo2-57c2a.appspot.com",
  messagingSenderId: "943755642817",
  appId: "1:943755642817:web:233e8bd9559ab31abdd140"
});
  });
</script>

<main>
  <h1>Pesquisa avançada no Firebase</h1>
  
  <form on:submit|preventDefault={search}>
    <label>
      Nome:
      <input type="text" bind:value={nome} />
    </label>
    
    <label>
      Idade:
      <input type="number" bind:value={preco} />
    </label>
    
    <button type="submit">Pesquisar</button>
  </form>
  
  {#if loadingv1}
    <p>Carregando...</p>
  {:else if results === null}
    <p>Faça uma pesquisa para ver os resultados</p>
  {:else if results.length === 0}
    <p>Nenhum resultado encontrado</p>
  {:else}
    <ul>
      {#each results as result}
        <li>{result.nome} ({result.preco} anos)</li>
      {/each}
    </ul>
  {/if}
</main>


