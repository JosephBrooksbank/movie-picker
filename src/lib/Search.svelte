<script lang="ts">

    let value: string;
    var delayTimer: NodeJS.Timeout;
    let results: Record<any, any>;

    // $: handleSearch(value)
    $: handleSearch(value);

    const handleSearch = (value: string) => {
            clearTimeout(delayTimer);
            delayTimer = setTimeout(() => {
                searchMovies(value);
            }, 1000);
    }

    const searchMovies = async (searchTerm: string) => {
        if (searchTerm == null || searchTerm === "") {
            return;
        }

        const body = {
            URL: `/search/movie?query=${encodeURIComponent(searchTerm)}`,
        }

        const data = await fetch('/api/tmdb', {
            method: 'POST',
            body: JSON.stringify(body)
        });
        results = await data.json();
    }
</script>

<input bind:value>
<pre>
    {JSON.stringify(results, null, 2)}
</pre>

<style>
    input {
        width: 100%;
        border-radius: 10px;
    }
</style>