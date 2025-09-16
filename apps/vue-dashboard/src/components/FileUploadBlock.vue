
<template>
    <Toast />
    <div class="card flex flex-wrap gap-6 items-center justify-between">
        <FileUpload ref="fileupload" mode="basic" name="demo[]" url="/api/upload" accept="image/*" :maxFileSize="1000000" @upload="onUpload" />
        <Button label="Upload" @click="upload" severity="secondary" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useToast } from "primevue/usetoast";
import FileUpload from 'primevue/fileupload';
import Button from 'primevue/button';

const toast = useToast();
const fileupload = ref();

const upload = () => {
    fileupload.value.upload();
};

const onUpload = () => {
    toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
};
</script>
