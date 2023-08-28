<script lang="ts">
    import Pokry from "$lib/components/Pokry.svelte";
	import type { FormSchema } from "$lib/interfaces";

    const schema: FormSchema = {
        fields: [
            {
                name: 'email',
                label: 'Email address',
                type: 'email',
                validators: ['required', 'email']
            },
            {
                name: 'confirmEmail',
                label: 'Confirm Email Address',
                type: 'email',
                validators: ['same:email']
            },
            {
                name: 'password',
                label: 'Password',
                type: 'password',
                validators: ['required']
            }
        ]
    }
</script>

<Pokry {schema} />