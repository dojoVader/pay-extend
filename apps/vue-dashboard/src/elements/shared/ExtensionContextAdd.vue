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
  <div v-if="show">
    <form @submit.prevent="addExtension" class="space-y-5 flex flex-col gap-4 text-white">
      <!-- Extension Item ID -->
      <div class="flex  flex-col gap-2">
        <label class="block text-xs mb-1">Extension Item ID *</label>
        <InputText v-model="form.extensionId" placeholder="EXT123456" class="w-full text-sm" />
      </div>

      <!-- Extension Name -->
      <div class="flex  flex-col gap-2">
        <label class="block text-xs mb-1">Extension Name *</label>
        <InputText v-model="form.extensionName" placeholder="My Extension" class="w-full text-sm" />
      </div>

      <!-- Extension Description -->
      <div class="flex  flex-col gap-2">
        <label class="block text-xs mb-1">Extension Description *</label>
        <Textarea v-model="form.extensionDescription" placeholder="This extension provides..." rows="3"
          class="w-full text-sm" />
      </div>

      <div class="flex  justify-between items-center gap-4">
        <!-- Status -->
        <div class="flex-1 flex flex-col gap-2">
          <label class="block text-xs mb-1">Status</label>
          <Dropdown v-model="form.status" :options="statuses" placeholder="Select status" class="w-full text-sm" />
        </div>

        <!-- Public Key -->
        <div class="flex-1 flex flex-col gap-2">
          <label class="block text-xs mb-1">Public Key</label>
          <InputText v-model="form.publicKey" placeholder="pub_key_abc123" class="w-full text-sm" />
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
            <FileUpload ref="fileupload" mode="basic" name="demo[]" url="/api/upload" accept="image/*"
              :maxFileSize="1000000" @upload="onUpload" />
            <Button label="Upload" @click="upload" severity="secondary" />
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

      <!-- Active -->
      <div class="flex items-center gap-2">
        <Checkbox v-model="form.active" inputId="active" :binary="true" />
        <label for="active" class="ml-2 text-xs">Active</label>
      </div>

      <!-- Actions -->
      <div class="flex justify-end gap-3 pt-4">
        <Button label="Cancel" severity="secondary" @click="$emit('close')" />
        <Button label="Save" type="submit" />
      </div>
    </form>
  </div>
</template>
