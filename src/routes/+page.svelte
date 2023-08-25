<script lang="ts">
    import Pokry from "$lib/components/Pokry.svelte";
	import type { FormSchema } from "$lib/interfaces";
    import { pokryForms } from "$lib/utils";

    const schema: FormSchema = {
        fields: [
            { 
                name: 'name',
                type: 'input'
            },
            {
                name: 'email',
                type: 'email'
            }
        ],
        validators: {
            name: ['required'],
            email: ['required_if:name,Chloe']
        }
    }

    // pokryForms.subscribe(form => console.log(form));
</script>

<Pokry {schema} realTimeValidation={true} />
