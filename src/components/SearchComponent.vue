<template>
  <div class="search-bar">
    <div class="search-input-wrapper">
      <span class="search-icon">
        <font-awesome-icon icon="search" />
      </span>
      <input
        v-model="query"
        placeholder="Search for photo"
        @keyup.enter="searchPhotos"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchComponent",
  data() {
    return {
      query: "",
    };
  },
  methods: {
    async searchPhotos() {
      this.$emit("searching", this.query);
      try {
        this.$emit("search", this.query);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.search-bar {
  margin-bottom: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-input-wrapper {
  position: relative;
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1rem;
  color: #aaa;
  pointer-events: none;
}

input {
  width: 100%;
  padding: 25px 15px 25px 35px;
  font-size: 1rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: none;
  color: #000;
}
@media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
  .search-bar {
    margin-bottom: 35px;
    margin: auto;
  }
  .search-input-wrapper {
    position: relative;
    width: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  input {
    width: 100%;
    padding: 15px 15px 15px 35px;
    font-size: 1rem;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border: none;
  }
}
</style>
