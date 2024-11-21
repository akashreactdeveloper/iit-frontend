<template>
    <div class="p-4">
        <h1 class="text-2xl font-bold mb-4">Welcome to the Admin Home Page</h1>
        <Button label="Click Me" class="p-button-raised p-button-rounded" />
        <DataTable :value="users" class="mt-4">
            <Column field="name" header="Name"></Column>
            <Column field="email" header="Email"></Column>
            <Column field="role" header="Role"></Column>
        </DataTable>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

export default defineComponent({
    name: 'AdminHome',
    components: {
        Button,
        DataTable,
        Column
    },
    setup() {
        const users = ref([
            { name: 'John Doe', email: 'john@example.com', role: 'Admin' },
            { name: 'Jane Smith', email: 'jane@example.com', role: 'Editor' },
            { name: 'Sam Johnson', email: 'sam@example.com', role: 'Viewer' }
        ]);

        return {
            users
        };
    },
});
</script>