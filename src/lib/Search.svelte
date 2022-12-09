<script lang="ts">
    let value: string;

    var delayTimer: NodeJS.Timeout;

    const handleSearch = (searchTerm: any) => {
            clearTimeout(delayTimer);
            delayTimer = setTimeout(() => {
                alert('searched');
            }, 1000);
    }
</script>

<input bind:value on:input={handleSearch}>

<style>
    input {
        width: 100%;
        border-radius: 10px;
    }
</style>