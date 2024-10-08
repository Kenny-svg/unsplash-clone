<template>
  <div class="photo-grid">
    <div v-if="!loading && photos.length === 0" class="no-results">
      No results found for "{{ searchQuery }}"
    </div>
    <div
      v-else
      v-for="(photo, index) in loading ? Array(8).fill({}) : photos"
      :key="photo.id || index"
      class="photo-item"
      :class="{ loading }"
      @click="() => showPhoto(photo)"
    >
      <div v-if="loading" class="skeleton-wrapper">
        <div class="skeleton-avatar"></div>
        <div class="skeleton-text skeleton-text-name"></div>
        <div class="skeleton-text skeleton-text-location"></div>
      </div>
      <div v-else>
        <img
          :src="photo?.urls?.small"
          :alt="photo?.alt_description"
          class="photo-image"
        />
        <div class="overlay">
          <p>{{ photo?.user?.name }}</p>
          <p class="photo-location">
            {{ photo?.user?.location || "Unknown location" }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PhotoGrid",
  props: ["photos", "loading", "searchQuery"],
  methods: {
    showPhoto(photo) {
      this.$emit("show-photo", photo);
    },
  },
};
</script>

<style scoped lang="scss">
.photo-grid {
  column-count: 3;
  column-gap: 20px;
  width: 65%;
  margin: auto;
  padding: 20px;

  @media (max-width: 800px) {
    column-count: 2;
  }

  @media (max-width: 500px) {
    column-count: 1;
  }

  .photo-item {
    display: inline-block;
    width: 100%;
    margin-bottom: 20px;
    border-radius: 10px;
    position: relative;
    cursor: pointer;
    overflow: hidden;
    break-inside: avoid;
    background: #e9edf1;
    transition: background 0.3s ease;

    &.loading {
      .photo-image,
      .overlay {
        display: none;
      }
    }

    .skeleton-wrapper {
      display: flex;
      align-items: center;
      padding: 1rem;
      height: 100%;
      justify-content: center;
    }

    .skeleton-text {
      width: 60%;
      height: 20px;
      background: linear-gradient(90deg, #e9edf1 25%, #f3f6f9 50%, #e9edf1 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite linear;
      border-radius: 5px;
      margin-bottom: 10px;
    }

    .skeleton-text-name {
      width: 80%;
    }

    .skeleton-text-location {
      width: 60%;
    }

    .photo-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 10px;
    }

    .overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 10px;
      background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.7),
        rgba(0, 0, 0, 0) 70%
      );
      color: white;
      text-align: left;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      height: 100%;
      transition: background 0.3s ease;
      z-index: 1;

      p {
        margin: 5px 0;
      }

      .photo-location {
        font-size: 12px;
      }
    }
  }

  .no-results {
    text-align: center;
    font-size: 1.5rem;
    color: #555;
    margin-top: 20px;
  }

  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
}
</style>
