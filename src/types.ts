export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "main" | "appetizer" | "dessert" | "beverage";
  image: string;
  isBestSeller: boolean;
  calories: number;
  prepTime: string; // e.g. "٢٥ دقيقة"
  dietaryTags: string[]; // e.g. ["كيتو", "نباتي", "خالي من الجلوتين"]
}

export interface Reservation {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  area: "main_hall" | "outdoor_terrace" | "family_section";
  status: "confirmed" | "pending" | "cancelled";
  notes?: string;
  receiptCode: string;
  createdAt: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number; // 1-5
  comment: string;
  date: string;
  avatar: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "chef";
  text: string;
  timestamp: string;
}
