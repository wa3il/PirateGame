<template>
  <section>
    <h2>Carte</h2>
    <p class="content">
      <strong>TODO :</strong> mettre à jour les positions des différents objets
      sur la carte.
    </p>
    <div id="map" class="map" ref="map"></div>
  </section>
</template>

<script>
import "leaflet/dist/leaflet.css";
import { useMapStore } from '../stores/mapStore';

let mymap = {};

export default {
  name: "MyMap",
  setup() {
    const mapStore = useMapStore();

    return { mapStore };
  },
  methods: {
    // Procédure de mise à jour de la map
    updateMap() {
      mymap.setView([this.lat, this.lng], this.zoom);

      // La fonction de validation du formulaire renvoie false pour bloquer le rechargement de la page.
      return false;
    },
    addMarkers() {
      this.mapStore.locations.forEach(location => {
        L.marker([location.lat, location.lng])
            .addTo(mymap)
            .bindPopup(`Location: ${location.name}`)
            .openPopup();
      });
    },
    clearMarkers() {
      // This function can be used to clear existing markers from the map before adding new ones.
      for (let i in mymap._layers) {
        if (mymap._layers[i]._icon) {
          mymap.removeLayer(mymap._layers[i]);
        }
      }
    },
  },
  async beforeMount() {
    const L = await import("leaflet");
    this.lat = 45.782;
    this.lng = 4.8656;
    this.zoom = 19;

    // Procédure d'initialisation
    mymap = L.map("map", {
      center: [this.lat, this.lng],
      zoom: this.zoom,
    });

    // Création d'un "tile layer" (permet l'affichage sur la carte)
    L.tileLayer(
        "https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}@2x.jpg90?access_token=pk.eyJ1IjoieGFkZXMxMDExNCIsImEiOiJjbGZoZTFvbTYwM29sM3ByMGo3Z3Mya3dhIn0.df9VnZ0zo7sdcqGNbfrAzQ",
        {
          maxZoom: 22,
          minZoom: 1,
          attribution:
              'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
              '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
              'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          id: "mapbox/streets-v11",
          tileSize: 512,
          zoomOffset: -1,
          accessToken:
              "pk.eyJ1IjoieGFkZXMxMDExNCIsImEiOiJjbGZoZTFvbTYwM29sM3ByMGo3Z3Mya3dhIn0.df9VnZ0zo7sdcqGNbfrAzQ",
        }
    ).addTo(mymap);

    this.addMarkers();

    // Clic sur la carte
    mymap.on("click", (e) => {
      this.lat = e.latlng.lat;
      this.lng = e.latlng.lng;

      const newLocation = {
        id: this.mapStore.locations.length + 1,
        name: `Location ${this.mapStore.locations.length + 1}`,
        lat: this.lat,
        lng: this.lng
      };

      this.mapStore.addLocation(newLocation);

      this.clearMarkers();
      this.addMarkers();
    });
  },
};
</script>

<style scoped>
.map {
  height: 500px;
  width: 100%;
  border: 1px solid;
}
</style>
