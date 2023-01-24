<slot />

<style global>
	:root {
		--gray: #282c34;
        --light-gray: #626c80;
        --dark-gray: #21252b;
        --darker-gray: rgba(23,23,23,1);
        --green: #3ba55c;


        --bg-color: var(--gray);
        --button-bg-color: var(--light-gray);

        background-color: var(--bg-color);
        color: azure;
        font-family: Arial, Helvetica, sans-serif;
	}

    .blur {
        filter: blur(10px);
    }
</style>
