<template>
  <div class="m-5 bg-white h-auto rounded-3xl pb-10">
    <h1 class="ml-10 pt-6 font-bold text-gray-600 text-3xl">Course Creation</h1>
    <div class="card flex justify-between gap-x-4 p-6">
      <div class="w-full">
        <FloatLabel variant="on" class="w-full">
          <InputText id="on_label" v-model="value2" class="w-full" />
          <label for="on_label">Title</label>
        </FloatLabel>
        <FloatLabel variant="on" class="w-full mt-4">
          <Textarea
            id="over_label"
            v-model="value1"
            rows="5"
            cols="30"
            style="resize: none"
            class="w-full"
          />
          <label for="over_label">Description</label>
        </FloatLabel>
        <h1 class="text-gray-600 font-bold text-xl my-4">Course Content</h1>
        <Button
          label="Add Chapters"
          icon="pi pi-plus"
          class="w-full"
          @click="loginVisible = true"
        />
        <div class="flex justify-between space-x-4 mt-6">
          <div class="flex w-full justify-center space-x-6 items-center">
            <h1>Start Date</h1>
            <DatePicker v-model="date" />
          </div>
          <div class="flex w-full justify-center space-x-6 items-center">
            <h1>End Date</h1>
            <DatePicker v-model="date" />
          </div>
        </div>
      </div>
      <div class="w-full">
        <div class="card">
          <Toast />
          <FileUpload
            name="demo[]"
            url="/api/upload"
            @upload="onTemplatedUpload($event)"
            :multiple="true"
            accept="image/*"
            :maxFileSize="1000000"
            @select="onSelectedFiles"
          >
            <template
              #header="{ chooseCallback, uploadCallback, clearCallback, files }"
            >
              <div
                class="flex flex-wrap justify-between items-center flex-1 gap-4"
              >
                <div class="flex gap-2">
                  <Button
                    @click="chooseCallback()"
                    icon="pi pi-images"
                    rounded
                    outlined
                    severity="secondary"
                  ></Button>
                  <Button
                    @click="uploadEvent(uploadCallback)"
                    icon="pi pi-cloud-upload"
                    rounded
                    outlined
                    severity="success"
                    :disabled="!files || files.length === 0"
                  ></Button>
                  <Button
                    @click="clearCallback()"
                    icon="pi pi-times"
                    rounded
                    outlined
                    severity="danger"
                    :disabled="!files || files.length === 0"
                  ></Button>
                </div>
                <ProgressBar
                  :value="totalSizePercent"
                  :showValue="false"
                  class="md:w-20rem h-1 w-full md:ml-auto"
                >
                  <span class="whitespace-nowrap">{{ totalSize }}B / 1Mb</span>
                </ProgressBar>
              </div>
            </template>
            <template
              #content="{
                files,
                uploadedFiles,
                removeUploadedFileCallback,
                removeFileCallback,
              }"
            >
              <div class="flex flex-col gap-8 pt-4">
                <div v-if="files.length > 0">
                  <h5>Pending</h5>
                  <div class="flex flex-wrap gap-4">
                    <div
                      v-for="(file, index) of files"
                      :key="file.name + file.type + file.size"
                      class="p-8 rounded-border flex flex-col border border-surface items-center gap-4"
                    >
                      <div>
                        <img
                          role="presentation"
                          :alt="file.name"
                          :src="file.objectURL"
                          width="100"
                          height="50"
                        />
                      </div>
                      <span
                        class="font-semibold text-ellipsis max-w-60 whitespace-nowrap overflow-hidden"
                        >{{ file.name }}</span
                      >
                      <div>{{ formatSize(file.size) }}</div>
                      <Badge value="Pending" severity="warn" />
                      <Button
                        icon="pi pi-times"
                        @click="
                          onRemoveTemplatingFile(
                            file,
                            removeFileCallback,
                            index
                          )
                        "
                        outlined
                        rounded
                        severity="danger"
                      />
                    </div>
                  </div>
                </div>

                <div v-if="uploadedFiles.length > 0">
                  <h5>Completed</h5>
                  <div class="flex flex-wrap gap-4">
                    <div
                      v-for="(file, index) of uploadedFiles"
                      :key="file.name + file.type + file.size"
                      class="p-8 rounded-border flex flex-col border border-surface items-center gap-4"
                    >
                      <div>
                        <img
                          role="presentation"
                          :alt="file.name"
                          :src="file.objectURL"
                          width="100"
                          height="50"
                        />
                      </div>
                      <span
                        class="font-semibold text-ellipsis max-w-60 whitespace-nowrap overflow-hidden"
                        >{{ file.name }}</span
                      >
                      <div>{{ formatSize(file.size) }}</div>
                      <Badge
                        value="Completed"
                        class="mt-4"
                        severity="success"
                      />
                      <Button
                        icon="pi pi-times"
                        @click="removeUploadedFileCallback(index)"
                        outlined
                        rounded
                        severity="danger"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <template #empty>
              <div class="flex items-center justify-center flex-col">
                <i
                  class="pi pi-cloud-upload !border-2 !rounded-full !p-8 !text-4xl !text-muted-color"
                />
                <p class="mt-6 mb-0">Upload the Image for the Course</p>
              </div>
            </template>
          </FileUpload>
        </div>
      </div>
    </div>
    <div class="w-full flex justify-end">
      <Button label="Upload Course" icon="pi pi-check" class="mt-20 mx-6" />
    </div>
    <div class="card flex justify-center">
      <Dialog
        v-model:visible="loginVisible"
        pt:root:class="!border-0 !bg-transparent"
        pt:mask:class="backdrop-blur-sm"
      >
        <template #container="{ closeCallback }">
          <div
            class="flex flex-col px-8 py-8 gap-6 rounded-2xl"
            style="background-color: white"
          >
            <h1 class="flex justify-center text-gray-600 font-bold text-xl">Chapter Creation</h1>
            <div class="">
              <!-- <div class="flex items-center gap-4">
                <h1>Video Type : </h1>
                <SelectButton v-model="value3" :options="options" />
              </div>
              <div>
                <h1>Interval</h1>
              </div> -->

              <FloatLabel variant="on">
                <InputText id="on_label" v-model="value3" class="w-full" />
                <label for="on_label">Chapter Name</label>
              </FloatLabel>
              <FloatLabel variant="on" class="w-full mt-4">
                <Textarea
                  id="over_label"
                  v-model="value1"
                  rows="5"
                  cols="30"
                  style="resize: none"
                  class="w-full"
                />
                <label for="over_label">Chapter Description</label>
              </FloatLabel>
            </div>

            <div class="flex items-center gap-4">
              <Button
                label="Cancel"
                @click="closeCallback"
                text
                class="!p-4 w-full !text-primary-50 !border !border-white/30 hover:!bg-white/10 !border-gray-400"
              ></Button>
              <Button
                label="Create"
                @click="
                  () => {
                    closeCallback();
                  }
                "
                text
                class="!p-4 w-full !text-gray-100 !bg-green-600 !border !border-white/30 hover:!bg-white/10 !border-gray-400 hover:!text-green-600 "
              ></Button>
            </div>
          </div>
        </template>
      </Dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Textarea from "primevue/textarea";
import FloatLabel from "primevue/floatlabel";
import InputText from "primevue/inputtext";
import { usePrimeVue } from "primevue/config";
import { useToast } from "primevue/usetoast";
import FileUpload from "primevue/fileupload";
import DatePicker from "primevue/datepicker";
import Dialog from "primevue/dialog";
import SelectButton from "primevue/selectbutton";

export default defineComponent({
  name: "CourseCreation",
  components: {
    Textarea,
    FloatLabel,
    InputText,
    FileUpload,
    DatePicker,
    Dialog,
    SelectButton,
  },
  setup() {
    const value1 = ref("");
    const value2 = ref("");
    const date = ref();
    const $primevue = usePrimeVue();
    const toast = useToast();
    const loginVisible = ref(false);
    const value3 = ref("");
    const options = ref(["Long", "Short"]);

    const totalSize = ref(0);
    const totalSizePercent = ref(0);
    const files = ref([]);

    const onRemoveTemplatingFile = (file, removeFileCallback, index) => {
      removeFileCallback(index);
      totalSize.value -= parseInt(formatSize(file.size));
      totalSizePercent.value = totalSize.value / 10;
    };

    const onClearTemplatingUpload = (clear) => {
      clear();
      totalSize.value = 0;
      totalSizePercent.value = 0;
    };

    const onSelectedFiles = (event) => {
      files.value = event.files;
      files.value.forEach((file) => {
        totalSize.value += parseInt(formatSize(file.size));
      });
    };

    const uploadEvent = (callback) => {
      totalSizePercent.value = totalSize.value / 10;
      callback();
    };

    const onTemplatedUpload = () => {
      toast.add({
        severity: "info",
        summary: "Success",
        detail: "File Uploaded",
        life: 3000,
      });
    };

    const formatSize = (bytes) => {
      const k = 1024;
      const dm = 3;
      const sizes = $primevue.config.locale.fileSizeTypes;

      if (bytes === 0) {
        return `0 ${sizes[0]}`;
      }

      const i = Math.floor(Math.log(bytes) / Math.log(k));
      const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

      return `${formattedSize} ${sizes[i]}`;
    };
    return {
      value1,
      value2,
      onTemplatedUpload,
      totalSize,
      totalSizePercent,
      files,
      onRemoveTemplatingFile,
      onClearTemplatingUpload,
      onSelectedFiles,
      uploadEvent,
      formatSize,
      date,
      loginVisible,
      value3,
      options,
    };
  },
});
</script>
