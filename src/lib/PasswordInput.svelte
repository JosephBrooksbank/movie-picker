<script lang="ts">
	import Cookies from 'js-cookie';
    import {createEventDispatcher} from 'svelte';
	let value: string;
	const pwd = 'secret';

    const dispatch = createEventDispatcher();


	const handleSubmit = () => {
        if (value === pwd) {
			Cookies.set('isAuth', 'true');
            dispatch('auth', {
                isAuth: true
            });
        }
	};
</script>

<div class="container">
	<span class="spacer" />
	<h1>Enter Password</h1>
	<div class="search-box">
		<form on:submit={handleSubmit}>
			<button class="btn-login"><i class="fas fa-lock" /></button>
			<input bind:value type="password" class="input-login" placeholder="Secret Secret..." autofocus/>
			<input type="submit" style="display: none" />
		</form>
	</div>
	<span class="spacer" />
</div>

<style>
	/* reposition flex from 'center' to be 70% up the screen. Looks more natural */
	.spacer:first-child {
		flex: 1 1 30%;
	}
	.spacer:last-child {
		flex: 1 1 70%;
	}
	* {
		box-sizing: border-box;
	}
	.container {
		margin: 0px;
		padding: 0px;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: fixed;
	}
	.search-box {
		width: fit-content;
		height: fit-content;
		position: relative;
	}
	.input-login {
		height: 50px;
		width: 50px;
		border-style: none;
		padding: 10px;
		font-size: 18px;
		letter-spacing: 2px;
		outline: none;
		border-radius: 25px;
		transition: all 0.5s ease-in-out;
		background-color: var(--dark-gray);
		padding-right: 40px;
		color: azure;
	}
	.input-login::placeholder {
		color: var(--light-gray);
		font-size: 18px;
		letter-spacing: 2px;
		font-weight: 100;
	}
	.btn-login {
		width: 50px;
		height: 50px;
		border-style: none;
		font-size: 20px;
		font-weight: bold;
		outline: none;
		cursor: pointer;
		border-radius: 50%;
		position: absolute;
		right: 0px;
		color: azure;
		background-color: transparent;
		pointer-events: painted;
	}
	.btn-login:focus ~ .input-login,
	.input-login:focus {
		width: 300px;
		border-radius: 0px;
		background-color: transparent;
		border-bottom: 1px solid rgba(255, 255, 255, 0.5);
		transition: all 500ms cubic-bezier(0, 0.11, 0.35, 2);
	}
</style>
