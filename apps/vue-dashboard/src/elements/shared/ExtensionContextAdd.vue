<template>
  <div v-if="show" class="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow">
    <form @submit.prevent="addExtension" class="space-y-4">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Extension Name:</label>
        <input
          v-model="form.name"
          id="name"
          type="text"
          required
          class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Description:</label>
        <input
          v-model="form.description"
          id="description"
          type="text"
          class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        class="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        Add Extension
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'ExtensionContextAdd',
  props: {
    show: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      form: {
        name: '',
        description: ''
      }
    }
  },
  methods: {
    addExtension() {
      // TODO: Send this.form to API
    }
  }
}
</script>