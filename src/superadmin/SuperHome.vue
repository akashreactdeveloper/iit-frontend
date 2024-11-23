<template>
  <div class="flex flex-wrap justify-between gap-6 p-4">
    <div class="card flex-1 bg-white rounded-3xl max-w-full">
      <div class="flex justify-between mx-5">
        <h1 class="text-2xl my-4 uppercase font-bold text-gray-700">
          Institutes
        </h1>
        <Button
          label="Add New Institute"
          icon="pi pi-plus"
          @click="openPosition('bottom')"
          severity="secondary"
          style="min-width: 10rem"
        />
      </div>
      <DataTable
        v-model:editingRows="editingRows"
        :value="products"
        editMode="row"
        dataKey="id"
        @row-edit-save="onRowEditSave"
        :pt="{
          table: {
            style: 'min-width: 100%; max-width: 100%; overflow-x: auto;',
          },
          column: {
            bodycell: ({ state }) => ({
              style: state['d_editing']
                ? 'padding-top: 0.75rem; padding-bottom: 0.75rem'
                : '',
            }),
          },
        }"
        paginator
        :rows="5"
      >
        <Column field="name" header="Name" style="width: 20%" />
        <Column field="status" header="Status" style="width: 20%" />
        <Column field="description" header="Description" style="width: 40%" />
        <Column field="url" header="URL" style="width: 40%" />
        <Column
          :rowEditor="true"
          style="width: 10%"
          bodyStyle="text-align:center"
        />
      </DataTable>
    </div>

    <Dialog
      v-model:visible="visible"
      header="Add New Institute"
      :style="{ width: '25rem' }"
      :position="position"
      :modal="true"
      :draggable="false"
    >
      <span class="text-surface-500 dark:text-surface-400 block mb-8"
        >Enter the Details of Institute</span
      >
      <div class="flex items-center gap-4 mb-4">
        <label for="institutename" class="font-semibold w-24">Name</label>
        <InputText
          id="institutename"
          v-model="institutename"
          class="flex-auto"
          autocomplete="off"
        />
      </div>
      <div class="flex items-center gap-4 mb-8">
        <label for="institutedescription" class="font-semibold w-24"
          >Description</label
        >
        <Textarea v-model="institutedescription" rows="5" cols="30" />
      </div>
      <div class="flex items-center gap-4 mb-8">
        <label for="instituteurl" class="font-semibold w-24">Url</label>
        <InputText
          id="instituteurl"
          v-model="instituteurl"
          class="flex-auto"
          autocomplete="off"
        />
      </div>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancel"
          severity="secondary"
          @click="visible = false"
        ></Button>
        <Button
          type="button"
          label="Create"
          @click="
            addInstitute();
            visible = false;
          "
        ></Button>
      </div>
    </Dialog>

    <div class="card flex-1 bg-white rounded-3xl max-w-full">
      <div class="flex justify-between mx-5">
        <h1 class="text-2xl my-4 uppercase font-bold text-gray-700">Staff</h1>
        <button
          class="px-2 border-2 bg-green-300 rounded-2xl text-green-900 hover:scale-110 transition-all"
        >
          Add new Staff
        </button>
      </div>
      <DataTable
        v-model:editingRows="editingRows"
        :value="staffData"
        editMode="row"
        dataKey="id"
        @row-edit-save="onRowEditSave"
        :pt="{
          table: {
            style: 'min-width: 100%; max-width: 100%; overflow-x: auto;',
          },
          column: {
            bodycell: ({ state }) => ({
              style: state['d_editing']
                ? 'padding-top: 0.75rem; padding-bottom: 0.75rem'
                : '',
            }),
          },
        }"
      >
        <Column field="username" header="Name" style="width: 20%" />
        <Column field="phone" header="Phone" style="width: 20%" />
        <Column field="email" header="Email" style="width: 40%" />
        <Column field="user_type" header="Role" style="width: 40%" />
        <Column
          field="
institution
"
          header="Institute"
          style="width: 20%"
        />
        <Column
          :rowEditor="true"
          style="width: 10%"
          bodyStyle="text-align:center"
        />
      </DataTable>
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
import Textarea from "primevue/textarea";
import Dialog from "primevue/dialog";

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
    Dialog,
    Textarea,
  },
  setup() {
    const products = ref<Institute[]>([]); // type products as Institute array
    const institutename = ref<string>("");
    const editingRows = ref<any[]>([]);
    const staffData = ref<any[]>([]);
    const staffinstitute = ref<string>("");
    const institutedescription = ref<string>("");
    const instituteurl = ref<string>("");
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

    const position = ref("center");
    const visible = ref(false);

    const openPosition = (pos) => {
      position.value = pos;
      visible.value = true;
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
    const getStaff = async () => {
      try {
        const response = await axios.get(`${API_URL}login/`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("access_token")}`,
          },
        });

        const staffdata = response.data.users;
        console.log("Staff data:", staffdata);
        staffData.value = staffdata;
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
            url: instituteurl.value,
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
      getStaff();
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
      openPosition,
      position,
      visible,
      instituteurl,
      staffinstitute,
      getStaff,
      staffData,
    };
  },
});
</script>
