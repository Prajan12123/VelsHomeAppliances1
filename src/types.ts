export type PageType =
  | "home"
  | "services"
  | "appliances"
  | "why-choose-us"
  | "about"
  | "contact";

export interface ApplianceService {
  id: string;
  name: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  badge?: string;
  fixedPrice: number;
  timeEstimate: string;
  warranty: string;
  commonIssues: string[];
  features: string[];
  iconName: string;
}

export interface ApplianceProduct {
  id: string;
  title: string;
  category: "ac" | "refrigerator" | "washing" | "tv" | "kitchen";
  brand: string;
  image: string;
  energyRating: string;
  price: string;
  mrp: string;
  discount: string;
  specs: string[];
  inStock: boolean;
  warranty: string;
}

export interface WhyChooseItem {
  id: string;
  icon: string;
  title: string;
  desc: string;
  stat: string;
  highlight: string;
}

export interface BookingFormData {
  customerName: string;
  mobile: string;
  applianceType: string;
  serviceRequired: string;
  address: string;
  preferredDate: string;
  timeSlot: string;
  message: string;
}

export interface BookingRecord extends BookingFormData {
  id: string;
  status: "Confirmed" | "Technician Assigned" | "In Progress" | "Completed";
  createdAt: string;
  fixedCharge: number;
}

export interface TrackingStage {
  step: number;
  title: string;
  description: string;
  time: string;
  completed: boolean;
  active: boolean;
  details?: string[];
}

export interface TechnicianInfo {
  name: string;
  id: string;
  phone: string;
  experience: string;
  rating: number;
  totalJobs: number;
  photo?: string;
  specialty: string;
  currentLocation: string;
  distanceKm: string;
  eta: string;
  vanRegNumber: string;
  verifiedOtpCode: string;
}

export interface ServiceJobCard {
  diagnosticChecklist: { item: string; status: "Passed" | "Faulty" | "Replaced" | "Calibrated" }[];
  replacedParts?: { partName: string; partCode: string; warranty: string; mrp: number }[];
  serviceTotal: number;
  warrantyExpiryDate: string;
  warrantyCertificateId: string;
}

export interface ServiceTrackingRecord extends BookingRecord {
  trackingId?: string;
  currentStageIndex?: number;
  stages?: TrackingStage[];
  technician?: TechnicianInfo;
  jobCard?: ServiceJobCard;
  liveStatusText?: string;
  lastUpdated?: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
  suggestions?: string[];
  actionType?: "booking_prompt" | "call_prompt" | "whatsapp_prompt";
}
