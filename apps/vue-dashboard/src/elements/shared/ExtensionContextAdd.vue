<script setup>
import { reactive } from "vue"
import InputText from "primevue/inputtext"
import Textarea from "primevue/textarea"
import Dropdown from "primevue/dropdown"
import Checkbox from "primevue/checkbox"
import Button from "primevue/button"

import FileUpload from 'primevue/fileupload';
import Toast from 'primevue/toast';

defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

const form = reactive({
  extensionId: "",
  extensionName: "",
  extensionDescription: "",
  status: "",
  publicKey: "",
  extensionLogo: "",
  active: true
})

const Placeholders = {
  ExtensionID: 'e.g 2879872hjhas',
  ExtensionName: 'e.g Extension Name',
  ExtensionDescription: 'Describe it\'s features',
  ExtensionPublicKey: "Get public key from Chrome Webstore",
}

const statuses = ["Active", "Inactive", "Pending", "Deprecated"]

function addExtension() {
  console.log("Form submitted:", form)
}

// import { ref } from 'vue';
// import { useToast } from "primevue/usetoast";
// const toast = useToast();
// const fileupload = ref();

const upload = () => {
    fileupload.value.upload();
};

const onUpload = () => {
    toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
};
</script>

<template>
    <h1 class="text-2xl font-bold pl-1 mb-5 ">Register your Extension</h1>
    <form @submit.prevent="addExtension" class="space-y-5 p-1 mt-4 flex flex-col gap-4 text-white">
      <!-- Extension Item ID -->
      <div class="flex  flex-col gap-2">
        <label class="block text-xs mb-1">Extension Item ID *</label>
        <InputText v-model="form.extensionId" :placeholder="Placeholders.ExtensionID" class="w-full text-sm" />
        <small>{{Placeholders.ExtensionID}}</small>
      </div>

      <!-- Extension Name -->
      <div class="flex  flex-col gap-2">
        <label class="block text-xs mb-1">Extension Name *</label>
        <InputText v-model="form.extensionName" :placeholder="Placeholders.ExtensionName" class="w-full text-sm" />
        <small>{{Placeholders.ExtensionName}}</small>
      </div>

      <!-- Extension Description -->
      <div class="flex  flex-col gap-2">
        <label class="block text-xs mb-1">Extension Description *</label>
        <Textarea v-model="form.extensionDescription" :placeholder="Placeholders.ExtensionDescription" rows="3"
          class="w-full text-sm" />
        <small>{{Placeholders.ExtensionDescription}}</small>
      </div>

      <div class="flex  justify-between items-center gap-4">

        <!-- Public Key -->
        <div class="flex-1 flex flex-col gap-2">
          <label class="block text-xs mb-1">Public Key</label>
          <InputText v-model="form.publicKey" :placeholder="Placeholders.ExtensionPublicKey"  class="w-full text-sm" />
          <small>{{Placeholders.ExtensionPublicKey}}</small>
        </div>
      </div>

      <!-- Extension Logo -->
      <div class="flex  flex-col gap-2">
        <label class="block text-xs mb-1">Extension Logo</label>
        <!-- <InputText v-model="form.extensionLogo" placeholder="https://example.com/logo.png" class="w-full text-sm" /> -->

        <!-- file upload -->
        <FileUploadBlock />
        <div class="card w-full">
          <Toast />
          <div class="card flex flex-wrap gap-6 items-center justify-between">
            <FileUpload ref="fileupload" mode="basic" size="small" name="demo[]" url="/api/upload" accept="image/*"
              :maxFileSize="1000000" @upload="onUpload" />
            <Button size="small" label="Upload" @click="upload" severity="secondary" />
          </div>


          <!-- <Toast />
          <FileUpload name="demo[]" url="/api/upload" @upload="onAdvancedUpload($event)" :multiple="true"
            accept="image/*" :maxFileSize="1000000">
            <template #empty>
              <span>Drag and drop files to here to upload.</span>
            </template>
</FileUpload> -->
        </div>

        <p class="mt-1 text-xs text-gray-400">Upload image or paste URL</p>
      </div>



      <!-- Actions -->
      <div class="flex justify-end gap-3 pt-4">
        <Button size="small" :style="{ width: '10%' }" label="Cancel" class="p-2 rounded" severity="secondary" @click="$emit('close')" />
        <Button size="small" :style="{ width: '10%' }" label="Save" class="p-2 rounded" type="submit" />
      </div>
    </form>
</template>

<style scoped>
label{
  color:white;
  font-weight: bold;
}

h1{
  margin-bottom: 2%;
}
</style>