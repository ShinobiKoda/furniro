import supabase from "@/config/supabaseClient";
import { FurnitureProps } from "@/types/type";

export async function FetchFurnitures(): Promise<{
  data: FurnitureProps[] | null;
  error: string | null;
}> {
  const { data, error } = await supabase.from("Furniro_Furnitures").select("*");

  if (error) {
    console.log(error);
    return { data: null, error: "Could not fetch data" };
  }

  if (data) {
    console.log(data)
    return { data, error: null };
  }

  return { data: null, error: "Unknown error occurred" };
}
