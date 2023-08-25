<script lang="ts">
	import type { FormField } from "$lib/interfaces";
	import { pokryForms } from "$lib/utils";
	import { createEventDispatcher } from "svelte";
    type InputEvent = Event & { currentTarget: EventTarget & HTMLInputElement };

    export let field: FormField;

    const dispatch = createEventDispatcher();

    const onInput = (event: InputEvent) => {
        let value: string | number = event.currentTarget.value;
        
        if (field.type === 'number') {
            value = parseInt(value);
        }

        dispatch('change', {
            name: field.name,
            value
        })
    }

    const markAsTouched = () => {
        pokryForms.markFieldAsDirtyOrTouched(field.name, 'touched');
    }
</script>

<input 
    type={field.type}
    value={field.value || ''}
    placeholder={field.attributes?.placeholder}
    disabled={field.attributes?.disabled}
    readonly={field.attributes?.readonly}
    on:input={onInput}
    on:focus={markAsTouched}
/>