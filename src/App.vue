<template>
  <div class="background">
    <div v-if="searching" class="search-status">
      Searching for "{{ searchQuery }}"
    </div>
    <SearchComponent @searching="handleSearching" @search="getPhotos" />

    <div v-if="!searching && searchQuery" class="search-status">
      Search results for "{{ searchQuery }}"
    </div>
    <PhotoGrid :photos="photos" :loading="loading" @show-photo="showPhoto" />
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
    handleSearching(query) {
      this.searchQuery = query;
      this.searching = true;
      this.loading = true;
    },
    async getPhotos(photos = null, query = "") {
      this.searchQuery = query;

      if (photos) {
        this.photos = photos;
      } else {
        try {
          this.loading = true;
          const response = await this.$axios.get(
            "https://api.unsplash.com/photos"
          );
          this.photos = response.data;
        } catch (error) {
          console.error("Error fetching photos:", error);
        }
      }

      this.loading = false;
      this.searching = false;
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
  text-align: center;
  margin: 20px;
  font-size: 1.2rem;
  color: #555;
}
</style>
