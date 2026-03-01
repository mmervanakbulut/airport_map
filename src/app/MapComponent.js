"use client";

import { useMemo, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useRouter } from "next/navigation";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import worldGeoJson from "@/app/world.geojson.json";
import { allAirports, typeIconMap, countryNames } from "@/app/airportData";

// Leaflet icon'ları modül yüklenirken bir kez oluşturulur
const iconCache = Object.fromEntries(
  Object.entries(typeIconMap).map(([type, def]) => [
    type,
    new L.DivIcon({
      html: `<span style="font-size:${def.size}px;line-height:1;">${def.html}</span>`,
      className: "",
      iconSize: [def.size, def.size],
      iconAnchor: [def.size / 2, def.size / 2],
    }),
  ])
);

function AirportPopup({ airport }) {
  return (
    <div className="text-sm">
      <p className="font-bold">{airport.name}</p>
      <p>✈️ {airport.iata_code}</p>
      <p>🌍 {countryNames.of(airport.iso_country) ?? airport.iso_country}</p>
      <p>🏙️ {airport.municipality ?? "—"}</p>
    </div>
  );
}

export default function MapComponent({
  selectedTypes = ["large_airport"],
  selectedCountries = [],
}) {
  const router = useRouter();

  const visibleAirports = useMemo(
    () =>
      allAirports.filter(
        (a) =>
          selectedTypes.includes(a.type) &&
          (selectedCountries.length === 0 || selectedCountries.includes(a.iso_country))
      ),
    [selectedTypes, selectedCountries]
  );

  // const onCountryClick = useCallback(
  //   (feature, layer) => {
  //     layer.on("click", () => router.push(`/${feature.properties.ISO_A2}`));
  //   },
  //   [router]
  // );

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{ height: "100%", width: "100%" }}
      preferCanvas={true}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* <GeoJSON data={worldGeoJson} onEachFeature={onCountryClick} /> */}

      <MarkerClusterGroup chunkedLoading>
        {visibleAirports.map((airport) => (
          <Marker
            key={airport.iata_code ?? airport.id}
            position={[airport.latitude_deg, airport.longitude_deg]}
            icon={iconCache[airport.type]}
          >
            <Popup>
              <AirportPopup airport={airport} />
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
