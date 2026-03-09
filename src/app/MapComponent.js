"use client";

import { useMemo, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
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

function CtrlScrollZoom() {
  const map = useMap();

  useEffect(() => {
    map.scrollWheelZoom.disable();

    const handleWheel = (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
        if (e.deltaY < 0) map.zoomIn();
        else map.zoomOut();
      }
    };

    const container = map.getContainer();
    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [map]);

  return null;
}

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
  const visibleAirports = useMemo(
    () =>
      allAirports.filter(
        (a) =>
          selectedTypes.includes(a.type) &&
          (selectedCountries.length === 0 || selectedCountries.includes(a.iso_country))
      ),
    [selectedTypes, selectedCountries]
  );

  return (
    <MapContainer
      key="map"
      center={[39, 35]}
      zoom={6}
      style={{ height: "100%", width: "100%" }}
      preferCanvas={true}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <CtrlScrollZoom />
      {/* <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" /> */}

      <MarkerClusterGroup chunkedLoading disableClusteringAtZoom={0}>
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
