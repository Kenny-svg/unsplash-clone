<template>
  <div class="photo-grid">
    <div
      v-for="photo in photos"
      :key="photo.id"
      class="photo-item"
      :class="{ loading }"
      @click="showPhoto(photo)"
    >
      <img
        v-if="!loading"
        :src="photo?.urls?.small"
        :alt="photo?.alt_description"
      />
      <div v-if="loading" class="skeleton-overlay"></div>
      <div class="overlay">
        <p>{{ photo?.user?.name }}</p>
        <p class="photo-location">
          {{ photo?.user?.location || "Unknown location" }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PhotoGrid",
  props: ["photos", "loading"],
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

    &.loading .skeleton-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(90deg, #e9edf1 25%, #f3f6f9 50%, #e9edf1 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite linear;
      z-index: 2;
    }

    img {
      width: 100%;
      height: auto;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    &:hover img {
      transform: scale(1.05);
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
