<script lang="ts">
    import Pokry from "$lib/components/Pokry.svelte";
	import type { FormSchema } from "$lib/interfaces";
	import { pokryForms } from "$lib/utils";

    pokryForms.subscribe(value => {
        console.log(value);
    })

    const schema: FormSchema = {
        fields: [
            { 
                name: 'email',
                type: 'input',
                validators: ['required', 'email']
            },
            {
                name: 'password',
                type: 'input',
                validators: ['required']
            },
            {
                name: 'domain',
                type: 'input',
                validators: ['required', 'url']
            }
        ]
    }
</script>

<Pokry {schema} />