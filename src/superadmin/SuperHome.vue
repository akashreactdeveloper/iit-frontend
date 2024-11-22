<template>
  <div class="flex flex-cols">
    <div class="card flex-1 bg-white rounded-3xl">
       <div class="flex justify-between mx-5">
        <h1 class="text-2xl my-4 uppercase ">Institutes</h1>
        <button>Add new Institute</button>
       </div> 
      <DataTable
        v-model:editingRows="editingRows"
        :value="products"
        editMode="row"
        dataKey="id"
        @row-edit-save="onRowEditSave"
        :pt="{
          table: { style: 'min-width: 50rem' },
          column: {
            bodycell: ({ state }) => ({
              style: state['d_editing']
                ? 'padding-top: 0.75rem; padding-bottom: 0.75rem'
                : '',
            }),
          },
        }"
      >
        <Column field="name" header="Name" style="width: 20%">
          <template #editor="{ data, field }">
            <InputText v-model="data[field]" fluid />
          </template>
        </Column>
        <Column field="status" header="Status" style="width: 20%">
          <template #editor="{ data, field }">
            <Select
              v-model="data[field]"
              :options="statuses"
              optionLabel="label"
              optionValue="value"
              placeholder="Select a Status"
              fluid
            >
              <template #option="slotProps">
                <Tag
                  :value="slotProps.option.value"
                  :severity="getStatusLabel(slotProps.option.value)"
                />
              </template>
            </Select>
          </template>
          <template #body="slotProps">
            <Tag
              :value="slotProps.data.status"
              :severity="getStatusLabel(slotProps.data.status)"
            />
          </template>
        </Column>
        <Column field="description" header="Description" style="width: 40%">
          <template #editor="{ data, field }">
            <InputText v-model="data[field]" fluid />
          </template>
        </Column>
        <Column field="url" header="URL" style="width: 40%">
          <template #editor="{ data, field }">
            <InputText v-model="data[field]" fluid />
          </template>
        </Column>
        <Column
          :rowEditor="true"
          style="width: 10%; min-width: 8rem"
          bodyStyle="text-align:center"
        />
      </DataTable>
    </div>
    <div class="card flex-1">

    </div>

    <div>
      <input type="text" v-model="institutename" placeholder="Institute Name" />
      <input
        type="text"
        v-model="institutedescription"
        placeholder="Institute Description"
      />
      <input type="text" v-model="url" placeholder="URL" />
      <button @click="addInstitute">Add Institute</button>
      <button @click="getInstitute">Get Institute</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import axios from "axios";
import InputText from "primevue/inputtext";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Select from "primevue/selectbutton";
import Tag from "primevue/tag";
import Cookies from "js-cookie"; // Import js-cookie
import API_URL from "../../constants.js";

// Define interfaces for data to make it type-safe
interface Institute {
  id: number;
  name: string;
  description: string;
  status: "VERIFIED" | "BANNED" | "UNVERIFIED";
  url: string;
}

interface StatusOption {
  label: string;
  value: "VERIFIED" | "BANNED" | "UNVERIFIED";
}

export default defineComponent({
  name: "SuperHome",
  components: {
    DataTable,
    Column,
    InputText,
    Select,
    Tag,
  },
  setup() {
    const products = ref<Institute[]>([]); // type products as Institute array
    const editingRows = ref<any[]>([]);
    const institutename = ref<string>("");
    const institutedescription = ref<string>("");
    const url = ref<string>("");
    const statuses = ref<StatusOption[]>([
      { label: "Verified", value: "VERIFIED" },
      { label: "Banned", value: "BANNED" },
      { label: "Unverified", value: "UNVERIFIED" },
    ]);

    // Add the function to map the response status to your internal status
    const mapStatus = (
      statusCode: number
    ): "VERIFIED" | "BANNED" | "UNVERIFIED" => {
      if (statusCode === 1) return "VERIFIED";
      if (statusCode === -1) return "BANNED";
      return "UNVERIFIED"; // for 0 or other values
    };

    // Function to handle editing of rows
    const onRowEditSave = (event: any) => {
      const { newData, index } = event;
      products.value.splice(index, 1, newData);
    };

    // Get the severity label based on the status
    const getStatusLabel = (
      status: "VERIFIED" | "BANNED" | "UNVERIFIED"
    ): string => {
      switch (status) {
        case "VERIFIED":
          return "success";
        case "UNVERIFIED":
          return "warn";
        case "BANNED":
          return "danger";
        default:
          return "";
      }
    };

    // Fetch institute data from the server and handle status conversion
    const getInstitute = async () => {
      try {
        const response = await axios.get(`${API_URL}institutes/`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("access_token")}`,
          },
        });

        const institutesData = response.data.map((institute: any) => ({
          ...institute,
          status: mapStatus(institute.status), // Convert numeric status to string status
        }));

        products.value = institutesData;
      } catch (error) {
        console.error("Error fetching institutes:", error);
        alert("Error fetching institutes.");
      }
    };

    // Add a new institute
    const addInstitute = async () => {
      try {
        const response = await axios.post(
          `${API_URL}institutes/`,
          {
            name: institutename.value,
            description: institutedescription.value,
            url: "http://" + url.value,
          },
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("access_token")}`,
            },
          }
        );
        console.log("Institute added:", response.data);
        // Optionally, fetch the updated list of institutes after adding
        await getInstitute();
      } catch (error) {
        console.error("Error adding institute:", error);
        alert("Error adding institute.");
      }
    };

    onMounted(() => {
      getInstitute(); // Fetch institutes on mount
    });

    return {
      products,
      editingRows,
      statuses,
      onRowEditSave,
      getStatusLabel,
      institutename,
      institutedescription,
      addInstitute,
      Cookies,
      url,
      getInstitute,
    };
  },
});
</script>
