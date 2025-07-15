import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import AnimatedWallpaper from './AnimatedWallpaper.vue';

// Mock the setTimeout and setInterval functions
vi.useFakeTimers();

describe('AnimatedWallpaper', () => {
  beforeEach(() => {
    vi.clearAllTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders properly with default props', async () => {
    const wrapper = mount(AnimatedWallpaper);
    
    // Initially should show loading spinner
    expect(wrapper.find('.loading-spinner').exists()).toBe(true);
    
    // Wait for the async operations to complete
    await flushPromises();
    
    // After loading, the wallpaper container should be visible
    expect(wrapper.find('.wallpaper-container').exists()).toBe(true);
  });

  it('changes image after interval', async () => {
    const wrapper = mount(AnimatedWallpaper, {
      props: {
        interval: 5000, // 5 seconds
        imageCount: 3
      }
    });
    
    // Wait for initial load
    await flushPromises();
    
    // Get the initial image URL
    const initialImageUrl = wrapper.vm.currentImage;
    
    // Fast-forward time by the interval
    vi.advanceTimersByTime(5500); // 5.5 seconds to account for transition
    
    // The image should have changed
    expect(wrapper.vm.currentImage).not.toBe(initialImageUrl);
  });

  it('accepts custom query parameters', async () => {
    const wrapper = mount(AnimatedWallpaper, {
      props: {
        query: 'city,night',
        width: 800,
        height: 600
      }
    });
    
    // Wait for initial load
    await flushPromises();
    
    // Check if the image URL contains the custom query
    expect(wrapper.vm.currentImage).toContain('800x600');
    expect(wrapper.vm.currentImage).toContain('city,night');
  });
});