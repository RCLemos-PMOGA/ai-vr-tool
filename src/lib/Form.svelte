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
    const peopleRef = ref(db, "People");
    const ageQuery = query(peopleRef, orderByChild("Age"), equalTo(age));
    const nameQuery = query(peopleRef, orderByChild("Nome"), equalTo(nome));
    
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
    apiKey: "AIzaSyBfd--6fT0CJCPOIa4SOQVDTmiQBBhUQxM",
    authDomain: "pmoflix-deb5a.firebaseapp.com",
    databaseURL: "https://pmoflix-deb5a-default-rtdb.firebaseio.com",
    projectId: "pmoflix-deb5a",
    storageBucket: "pmoflix-deb5a.appspot.com",
    messagingSenderId: "477067952595",
    appId: "1:477067952595:web:a8b3ed6a1b200fcbfbef26",
    measurementId: "G-3B5RF84JCE"
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
      <input type="number" bind:value={age} />
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
        <li>{result.Nome} ({result.Age} anos)</li>
      {/each}
    </ul>
  {/if}
</main>


