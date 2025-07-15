<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';

// Props for component configuration
const props = defineProps({
  // Time interval between image changes in milliseconds (default: 10 seconds)
  interval: {
    type: Number,
    default: 10000
  },
  // Number of images to cycle through
  imageCount: {
    type: Number,
    default: 5
  },
  // Optional search query for images
  query: {
    type: String,
    default: 'nature,landscape'
  },
  // Image width
  width: {
    type: Number,
    default: 1920
  },
  // Image height
  height: {
    type: Number,
    default: 1080
  }
});

// State
const images = ref<string[]>([]);
const currentImageIndex = ref(0);
const isLoading = ref(true);
const fadeIn = ref(false);

// Computed property for current image URL
const currentImage = computed(() => images.value[currentImageIndex.value] || '');

// Timer reference for cleanup
let intervalId: number | null = null;

// Fetch images from Unsplash
const fetchImages = async () => {
  isLoading.value = true;
  // Set the static images to be used
  images.value.push(
    'https://images.unsplash.com/photo-1512551980832-13df02babc9e?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1533135091724-62cc5402aa20?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

  );
  setTimeout(() => {
    isLoading.value = false;
  },1000)
};

// Change to the next image with fade transition
const changeImage = () => {
  fadeIn.value = false;

  // Wait for fade out transition to complete
  setTimeout(() => {
    currentImageIndex.value = (currentImageIndex.value + 1) % images.value.length;
    fadeIn.value = true;
  }, 500); // Half a second for fade out
};

// Start the image rotation
const startImageRotation = () => {
  if (intervalId) clearInterval(intervalId);
  intervalId = setInterval(changeImage, props.interval);
};

// Setup on component mount
onMounted(async () => {
  await fetchImages();
  fadeIn.value = true;
  startImageRotation();
});

// Clean up on component unmount
onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});
</script>

<template>
  <div class="animated-wallpaper">
    <div v-if="isLoading" class="loading">
      <div class="loading-spinner"></div>
    </div>
    <div 
      v-else 
      class="wallpaper-container"
      :style="{ backgroundImage: `url(${currentImage})` }"
      :class="{ 'fade-in': fadeIn }"
    ></div>
    <slot></slot>
  </div>
</template>

<style scoped>
.animated-wallpaper {
  position: relative;
  width: 100%;
  height: 100%;
}

.wallpaper-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: opacity 1s ease;
  opacity: 0;
}

.fade-in {
  opacity: 1;
}

.loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.1);
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
