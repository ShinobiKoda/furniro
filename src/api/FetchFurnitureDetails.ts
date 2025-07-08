import supabase from "@/config/supabaseClient";
import { FurnitureDetails } from "@/types/type";

export async function FetchFurnitureDetails(): Promise<{
  data: FurnitureDetails[] | null;
  error: string | null;
}> {
  const { data, error } = await supabase.from("Furniro").select();

  if (error) {
    console.log(error);
    return { data: null, error: "Could not fetch data" };
  }

  if (data) {
    return { data, error: null };
  }

  return { data: null, error: "Unknown error occurred" };
}
