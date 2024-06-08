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
import { ref, onMounted, onUnmounted } from 'vue';
import "leaflet/dist/leaflet.css";
import L from "leaflet";

let lat = 45.782,
    lng = 4.8656,
    zoom = 19;
let mymap = {};

export default {
  name: "MyMap",
  setup() {
    const map = ref(null);

    const updateMap = () => {
      if (map.value) {
        mymap.setView([lat, lng], zoom);
      }
    };

    onMounted(() => {
      mymap = L.map(map.value, {
        center: [lat, lng],
        zoom: zoom,
      });

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

      L.marker([45.78207, 4.86559])
          .addTo(mymap)
          .bindPopup("Entrée du bâtiment<br><strong>Nautibus</strong>.")
          .openPopup();

      mymap.on("click", (e) => {
        lat = e.latlng.lat;
        lng = e.latlng.lng;
        updateMap();
      });
    });

    onUnmounted(() => {
      mymap.remove();
    });

    return {
      map,
    };
  },
};
</script>
