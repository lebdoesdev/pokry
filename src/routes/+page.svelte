<script lang="ts">
    import { VALIDATOR_MAP, parseValidationString } from "$lib";
	import { onMount } from "svelte";

    onMount(async () => {
        const example: any = {
            name: 'Pokry',
            age: null 
        }

        const validationString = 'required_if:name,Pokry';
        const parsed = parseValidationString(validationString);

        console.log(await VALIDATOR_MAP.required_if(example.age, parsed.args[1], example[parsed.args[0]]));
    });

</script>
<h1>Welcome to your library project</h1>
<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
