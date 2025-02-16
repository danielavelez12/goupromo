import { useQuery } from "@tanstack/react-query";

interface Item {
  item_type: string;
  description: string;
  item_number: string;
  original_price: number;
  offer_price: number;
  quantity: number;
  start_time: string;
  end_time: string;
  image_url: string;
  unit_weight: number;
  delivery_included: boolean;
  delivery_fee: number;
  status: string;
  restaurant_name: string;
  website_url: string;
  primary_address: string;
  primary_contact: string;
  restaurant_phone: string;
  restaurant_email: string;
  city: string;
  logo_url: string;
}

export const useItems = () => {
  return useQuery<Item[]>({
    queryKey: ["items"],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/items`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch items");
      }

      return await response.json();
    },
  });
};
