<template>
  <div v-if="photo">
    <div class="modal-overlay" @click="$emit('close')"></div>
    <span class="close-icon" @click="$emit('close')">X</span>
    <div class="modal-content">
      <img
        :src="loading ? photo?.urls.thumb : photo?.urls.full"
        :alt="photo?.alt_description"
        @load="handleImageLoad"
        :class="{ loading: loading }"
      />
      <div v-if="loading" class="spinner">Loading...</div>
      <div class="modal-details">
        <p class="photo-name">{{ photo?.user.name }}</p>
        <p class="photo-location">
          {{ photo?.location?.title || "Unknown location" }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalComponent",
  props: ["photo"],
  data() {
    return {
      loading: true,
    };
  },
  methods: {
    handleImageLoad() {
      this.loading = false;
    },
  },
};
</script>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10;
}

.modal-content {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 60%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 10px;
  text-align: center;
  z-index: 20;
  overflow: hidden;

  img {
    height: 500px;
    width: 100%;
    object-fit: cover;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
  }
  img.loading {
    filter: blur(10px);
  }

  .modal-details {
    margin-top: 10px;
    padding: 15px 20px;
    text-align: left;
  }
}

.close-icon {
  position: fixed;
  top: 30px;
  right: 200px;
  font-size: 1.2rem;
  cursor: pointer;
  color: #fff;
  padding: 5px;
  border-radius: 50%;
  z-index: 30;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
}

.spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.8);
  padding: 10px 15px;
  border-radius: 5px;
  color: #333;
  font-size: 1rem;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
</style>
