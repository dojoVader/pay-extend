# AnimatedWallpaper Component

A Vue 3 component that displays a rotating gallery of images from Unsplash with smooth transitions.

## Features

- Automatically fetches random images from Unsplash
- Smoothly transitions between images with fade effects
- Configurable image rotation interval
- Customizable image search queries
- Responsive design that fills its container
- Loading indicator while images are being fetched

## Usage

```vue
<script setup>
import AnimatedWallpaper from '@/elements/shared/AnimatedWallpaper.vue';
</script>

<template>
  <div class="app-container">
    <!-- Basic usage with default settings -->
    <AnimatedWallpaper />
    
    <!-- Advanced usage with custom settings -->
    <AnimatedWallpaper
      :interval="5000"
      :imageCount="3"
      query="city,night"
      :width="1280"
      :height="720"
    />
  </div>
</template>

<style>
.app-container {
  width: 100%;
  height: 100vh;
  position: relative;
}
</style>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `interval` | Number | 10000 | Time in milliseconds between image changes |
| `imageCount` | Number | 5 | Number of images to cycle through |
| `query` | String | 'nature,landscape' | Search query for Unsplash images |
| `width` | Number | 1920 | Width of the images to request |
| `height` | Number | 1080 | Height of the images to request |

## Example Integration with Login Component

```vue
<script setup>
import AnimatedWallpaper from '@/elements/shared/AnimatedWallpaper.vue';
import LoginForm from '@/components/LoginForm.vue';
</script>

<template>
  <div class="login-page">
    <AnimatedWallpaper query="office,workspace" />
    
    <div class="login-container">
      <LoginForm />
    </div>
  </div>
</template>

<style scoped>
.login-page {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.login-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  background: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
```

## Notes

- The component uses the Unsplash Source API which doesn't require an API key but has rate limitations
- For production applications with higher traffic, consider using the official Unsplash API with an API key