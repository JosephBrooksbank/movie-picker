<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import type { IParty } from '$lib/schema/party.schema';
	import dayjs from 'dayjs';

	export let events: IParty[];

    $: events = events.sort((a,b) => {
        if (a.date > b.date) {
            return 1;
        }
        if (b.date > a.date) {
            return -1;
        }
        return 0;
    });

    const handleDelete = async (date: Date) => {
        await fetch('/api/db/delete/event', {
            method: "POST",
            body: JSON.stringify({date})
        });
        events = events.filter(e => e.date != date)
    }

</script>

<div id="container">
	{#each events as event}
		<div id="row">
			<div>
				{dayjs(event.date).format('MMMM D, hh:mmA')}
			</div>
			<button on:click={() => handleDelete(event.date)}><i class="fa-regular fa-trash-can fa-xl" aria-hidden="true" /></button>
		</div>
	{/each}
</div>

<style>
	#container {
		display: flex;
		background-color: #626c80;
		padding: 20px;
		width: 50%;
		border-radius: 5px;
        /* flex-direction: column; */
        flex-wrap: wrap;
        gap: 10px;
	}

    #row {
        display: flex;
        background-color: #282C34;
        padding: 10px;
        border-radius: 5px;
        
    }
    button {
        border: none;
        background-color: transparent;
        color: black;
    }

    button:hover {
        color: red;
    }
</style>
