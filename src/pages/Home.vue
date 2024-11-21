<template>
  <div class="flex col-span-2 space-x-8">
    <div class="w-3/4 h-screen">
      <div class="bg-white h-32 rounded-xl">
        <h1 class="pl-2 pt-1 text-gray-600 font-bold">Announcements</h1>
        <div class="card">
          <Accordion value="3" expandIcon="pi pi-plus" collapseIcon="pi pi-minus">
            <AccordionPanel value="0">
              <AccordionHeader>
                <span class="flex items-center gap-2 w-full">
                  <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
                  <span class="font-bold whitespace-nowrap">Amy Elsner</span>
                  <Badge value="3" class="ml-auto mr-2" />
                </span>
              </AccordionHeader>
              <AccordionContent>
                <p class="m-0">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </AccordionContent>
            </AccordionPanel>
            <AccordionPanel value="1">
              <AccordionHeader>
                <span class="flex items-center gap-2 w-full">
                  <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png" shape="circle" />
                  <span class="font-bold whitespace-nowrap">Onyama Limba</span>
                  <Badge value="4" class="ml-auto mr-2" />
                </span>
              </AccordionHeader>
              <AccordionContent>
                <p class="m-0">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
                  ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
                </p>
              </AccordionContent>
            </AccordionPanel>
          </Accordion>

          <div class="flex col-span-2 space-x-4">
            <Card class="mt-5 w-1/2">
              <template #title>Completion Progress</template>
              <template #content>
                <div class="p-4 bg-white rounded-lg shadow-md w-full">
                  <div class="mb-4">
                    {{ subjectName1 }}<ProgressBar :value="value1" />
                  </div>
                  <div class="mb-4">
                    {{ subjectName2 }}<ProgressBar :value="value1" />
                  </div>
                  <div class="mb-4">
                    {{ subjectName3 }}<ProgressBar :value="value1" />
                  </div>
                  <div class="mb-4">
                    {{ subjectName4 }}<ProgressBar :value="value1" />
                  </div>
                </div>
              </template>
            </Card>

            <Card class="mt-5 w-1/2">
              <template #title>Courses</template>
              <template #content>
                <p class="m-0">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque
                  quas!
                </p>
              </template>
            </Card>
          </div>
        </div>
      </div>
    </div>
    <div class="w-1/4 bg-white rounded-xl">
      <div class="flex justify-center">
        <DatePicker v-model="date" inline showWeek class="w-full sm:w-[30rem] p-5 h-96" />
      </div>
      <div class="flex justify-center">
        <div>
          <h1 class="font-bold text-gray-700 ">Schedule</h1>
        </div>
      </div>
      <div class="card m-4">
        <DataTable :value="products" tableStyle="min-width: 100%">
          <Column field="code" header="Subject Code" sortable style="width: 40%"></Column>
          <Column field="subject" header="Subject" sortable style="width: 30%"></Column>
          <Column field="date" header="Date" sortable style="width: 30%"></Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import 'primeicons/primeicons.css';
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';
import Card from 'primevue/card';
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue';
import ProgressBar from 'primevue/progressbar';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import DatePicker from 'primevue/datepicker';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';                   // optional

export default defineComponent({
  name: 'Home',
  components: {
    Accordion,
    AccordionPanel,
    AccordionHeader,
    AccordionContent,
    Card,
    ProgressBar,
    Toast,
    DatePicker,
    DataTable,
    Column,
    ColumnGroup,
    Row,
  },
  setup() {
    const value1 = ref(0);
    const interval = ref<ReturnType<typeof setInterval> | null>(null);
    const toast = useToast();

    const startProgress = () => {
      interval.value = setInterval(() => {
        let newValue = value1.value + Math.floor(Math.random() * 10) + 1;
        if (newValue >= 100) {
          newValue = 100;
        }
        value1.value = newValue;
      }, 2000);
    };

    const endProgress = () => {
      if (interval.value) {
        clearInterval(interval.value);
        interval.value = null;
      }
    };

    onMounted(() => {
      startProgress();
    });

    onBeforeUnmount(() => {
      endProgress();
    });

    const date = ref(new Date());
    const formatDate = (date: Date) => {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

    const formattedDate = ref(formatDate(date.value));
    const subjectName1 = ref('Mathematics');
    const subjectName2 = ref('Physics');
    const subjectName3 = ref('Chemistry');
    const subjectName4 = ref('Biology');
    const products = ref([
      { code: 'A1', subject: 'Product 1', date: formattedDate },
      { code: 'A2', subject: 'Product 2', date: formattedDate },
      { code: 'A3', subject: 'Product 3', date: formattedDate },
      { code: 'A4', subject: 'Product 4', date: formattedDate },
      { code: 'A5', subject: 'Product 5', date: formattedDate }
    ]);

    return {
      value1,
      subjectName1,
      subjectName2,
      subjectName3,
      subjectName4,
      date,
      products
    };
  }
});
</script>
