<template>
  <div class="background">
    <SearchComponent
      v-if="!searching && !searchQuery"
      @searching="handleSearching"
      @search="searchPhotos"
    />
    <div v-if="searching" class="search-status">
      Searching for <span class="search-query">"{{ searchQuery }}"</span>
    </div>

    <div v-if="!searching && searchQuery" class="search-status">
      Search results for <span class="search-query">"{{ searchQuery }}"</span>
    </div>
    <PhotoGrid
      :photos="photos"
      :loading="loading"
      :searchQuery="searchQuery"
      @show-photo="showPhoto"
    />

    <ModalComponent
      v-if="selectedPhoto"
      :photo="selectedPhoto"
      @close="closeModal"
    />
  </div>
</template>

<script>
import SearchComponent from "./components/SearchComponent.vue";
import PhotoGrid from "./components/PhotoGrid.vue";
import ModalComponent from "./components/ModalComponent.vue";

export default {
  components: {
    SearchComponent,
    PhotoGrid,
    ModalComponent,
  },
  data() {
    return {
      photos: [],
      selectedPhoto: null,
      loading: true,
      searching: false,
      searchQuery: "",
    };
  },
  mounted() {
    this.getPhotos();
  },
  methods: {
    // handleSearching(query) {
    //   this.searchQuery = query;
    //   this.searching = true;
    //   this.loading = true;
    // },
    async searchPhotos(query = "") {
      this.searchQuery = query;
      this.searching = true;
      this.loading = true;
      try {
        const response = await this.$axios.get(
          `https://api.unsplash.com/search/photos?query=${query}`
        );
        this.photos = response.data.results;
        console.log(this.photos, "search results");
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        this.loading = false;
        this.searching = false;
      }
    },
    async getPhotos() {
      this.loading = true;
      try {
        const response = await this.$axios.get(
          "https://api.unsplash.com/search/photos",
          {
            params: {
              query: "Africa",
              per_page: 8,
            },
          }
        );
        this.photos = response.data.results;
        console.log(this.photos, "default results");
      } catch (error) {
        console.error("Error fetching African-themed photos:", error);
      } finally {
        this.loading = false;
      }
    },
    showPhoto(photo) {
      this.selectedPhoto = photo;
    },
    closeModal() {
      this.selectedPhoto = null;
    },
  },
};
</script>

<style scoped lang="scss">
.background {
  width: 100%;
  height: 100vh;
  padding-top: 105px;
  background: linear-gradient(to bottom, #dde3eb 28%, #fff 20%);
}

.search-status {
  margin-left: 150px;
  font-size: 2rem;
  color: #555;
  font-weight: 500;
}
.search-query {
  color: darkgray;
}
</style>
