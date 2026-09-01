export type PageKey =
  | "home"
  | "flights"
  | "trains"
  | "hotels"
  | "guides"
  | "roadtrip"
  | "villas"
  | "camping"
  | "buses"
  | "solobox";

export interface Flight {
  id: string;
  airline: string;
  logoInitial: string;
  from: string;
  fromCode: string;
  to: string;
  toCode: string;
  departTime: string;
  arriveTime: string;
  durationLabel: string;
  stops: 0 | 1;
  class: "Ekonomi" | "Bisnis";
  price: number;
  seatsLeft: number;
  baggageKg: number;
  logo?: string; 
}

export interface Train {
  id: string;
  name: string;
  operator: "KAI Access";
  from: string;
  fromCode: string;
  to: string;
  toCode: string;
  departTime: string;
  arriveTime: string;
  durationLabel: string;
  classes: { name: "Ekonomi" | "Bisnis" | "Eksekutif"; price: number; seatsLeft: number }[];
}

export interface RoomType {
  name: string;
  price: number;
  capacity: number;
  note: string;
  illustration: IllustrationVariant;
  photo?: string; 
}

export interface Hotel {
  id: string;
  name: string;
  area: string;
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  taxPercent: number;
  facilities: string[];
  photo?: string;
  roomTypes: RoomType[];
  freeCancelUntilHours: number;
  distanceToCenterKm: number;
  description: string;
  illustration: IllustrationVariant;
}
export interface TourGuide {
  id: string;
  name: string;
  specialty: string;
  languages: string[];
  rating: number;
  reviewCount: number;
  pricePerDay: number;
  verified: boolean;
  bio: string;
  toursCompleted: number;
  photo?: string;
}

export interface ItineraryStop {
  id: string;
  name: string;
  category: string;
  lat: number;
  lng: number;
  durationLabel: string;
  walkFromPrevMin: number | null;
  note: string;
  image?: string;
}

export interface Itinerary {
  id: string;
  title: string;
  theme: string;
  totalDurationLabel: string;
  totalWalkKm: number;
  stops: ItineraryStop[];
  trending?: boolean;
  illustration: IllustrationVariant;
  coverImage?: string;
}

export type IllustrationVariant =
  | "keraton"
  | "batik"
  | "nightmarket"
  | "mangkunegaran"
  | "waterfall"
  | "cafe"
  | "thrift"
  | "sunsetmusic"
  | "hotel-modern"
  | "hotel-resort"
  | "hotel-heritage"
  | "hotel-joglo"
  | "room-standard"
  | "room-suite"
  | "villa-pool"
  | "camp-tent"
  | "bus-travel"
  | "candi"
  | "souvenir";

export interface Villa {
  id: string;
  name: string;
  area: string;
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  capacity: number;
  bedrooms: number;
  facilities: string[];
  description: string;
  illustration: IllustrationVariant;
}

export interface Campsite {
  id: string;
  name: string;
  area: string;
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  tentType: string;
  capacity: number;
  facilities: string[];
  description: string;
}

export interface BusRoute {
  id: string;
  operator: string;
  from: string;
  to: string;
  departTime: string;
  arriveTime: string;
  durationLabel: string;
  busClass: "Ekonomi AC" | "Eksekutif" | "Sleeper";
  price: number;
  seatsLeft: number;
}

export interface Passenger {
  fullName: string;
  idNumber: string;
  phone: string;
}

export type BookingKind = "flight" | "train" | "hotel" | "guide" | "villa" | "camp" | "bus" | "solobox";

export interface SoloBoxProduct {
  id: string;
  name: string;
  umkmPartner: string;
  area: string;
  category: string;
  price: number;
  rating: number;
  reviewCount: number;
  description: string;
  illustration: IllustrationVariant;
  sponsored?: boolean;
  photo?: string;
}

export interface BookingRecord {
  code: string;
  kind: BookingKind;
  title: string;
  detail: string;
  total: number;
  createdAt: string;
}
