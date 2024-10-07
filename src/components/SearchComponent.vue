<template>
  <div class="search-bar">
    <div class="search-input-wrapper">
      <span class="search-icon">🔍</span>
      <input
        v-model="query"
        placeholder="Search for photo"
        @input="searchPhotos"
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
      try {
        this.$emit("search", this.query);
        // this.$emit("searching");
        const response = await this.$axios.get(
          `https://api.unsplash.com/search/photos?query=${this.query}`
        );
        this.$emit("search", response.data.results, this.query);
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
  padding: 15px 15px 15px 35px; /* Padding-left adjusted for the icon */
  font-size: 1rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: none;
}
</style>
