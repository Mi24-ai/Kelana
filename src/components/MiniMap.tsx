import { useRef } from "react";
import { MapContainer, TileLayer, Marker, Polyline, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { ItineraryStop } from "../types";

function numberIcon(index: number, isFirst: boolean) {
  return L.divIcon({
    className: "",
    html: `<div style="
      width:28px;height:28px;border-radius:9999px;
      background:${isFirst ? "#A6432A" : "var(--color-indigo-800)"};
      color:#F5E7C4;display:flex;align-items:center;justify-content:center;
      font-family:'IBM Plex Mono',monospace;font-size:12px;font-weight:700;
      border:2px solid #F5E7C4;box-shadow:0 2px 6px rgba(0,0,0,.35);
    ">${index + 1}</div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
}

export default function MiniMap({ stops }: { stops: ItineraryStop[] }) {
  const mapRef = useRef<L.Map | null>(null);

  if (stops.length === 0) return null;
  const center: [number, number] = [stops[0].lat, stops[0].lng];
  const path: [number, number][] = stops.map((s) => [s.lat, s.lng]);

  const flyToStop = (s: ItineraryStop) => {
    mapRef.current?.flyTo([s.lat, s.lng], 16, { duration: 0.8 });
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="heritage-frame overflow-hidden rounded-2xl" style={{ height: 340 }}>
        <MapContainer
          center={center}
          zoom={14}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Polyline
            positions={path}
            pathOptions={{ color: "#A6432A", weight: 3, dashArray: "1 10", lineCap: "round" }}
          />
          {stops.map((s, i) => (
            <Marker key={s.id} position={[s.lat, s.lng]} icon={numberIcon(i, i === 0)}>
              <Tooltip direction="top" offset={[0, -10]}>
                <span className="font-semibold">{s.name}</span>
              </Tooltip>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Strip kartu foto stop */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
        {stops.map((s, i) => (
          <button
            key={s.id}
            onClick={() => flyToStop(s)}
            className="heritage-frame flex-shrink-0 w-40 rounded-xl overflow-hidden text-left transition hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#A6432A]"
          >
            <div className="relative h-24 w-full">
              {s.image ? (
                <img
                  src={s.image}
                  alt={s.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${s.id}/400/300`;
                  }}
                />
              ) : (
                <div className="h-full w-full bg-[var(--color-indigo-800)]/20" />
              )}
              <span
                className="absolute top-1 left-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold"
                style={{
                  background: i === 0 ? "#A6432A" : "var(--color-indigo-800)",
                  color: "#F5E7C4",
                }}
              >
                {i + 1}
              </span>
            </div>
            <div className="p-2">
              <p className="text-xs font-semibold leading-tight line-clamp-2">{s.name}</p>
              <p className="text-[10px] text-[var(--color-indigo-800)]/70 mt-0.5">
                {s.durationLabel}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}