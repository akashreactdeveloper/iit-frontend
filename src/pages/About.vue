<template>
  <div>
    <button @click="handleGet">Click Here</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import axios from "axios";
import  API_URL  from '../../constants.js';
import Cookies from 'js-cookie';

export default defineComponent({
  name: "About",
  components: {},
  setup() {
    const handleGet = async () => {
      try {
        const response = await axios.get(`${API_URL}courses/`, {
            headers: {
            Authorization: `Bearer ${Cookies.get('access_token')}`
            },
        });
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    return {
      handleGet,
      Cookies
    };
  },
});
</script>
