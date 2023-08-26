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
                type: 'input'
            },
            {
                name: 'password',
                type: 'input'
            },
            {
                name: 'domain',
                type: 'input'
            }
        ],
        validators: {
            email: ['required', 'email'],
            password: ['required_if:email,support@pokry.lib'],
            domain: ['required', 'url']
        }
    }
</script>

<Pokry {schema} />