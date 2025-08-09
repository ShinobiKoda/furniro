import supabase from "@/config/supabaseClient";
import { FurnitureProps } from "@/types/type";

export async function FetchFurnitureById(id: string): Promise<{
  data: FurnitureProps | null;
  error: string | null;
}> {
  const { data, error } = await supabase
    .from("Furniro_Furnitures")
    .select(
      `
      *,
      Furniro_FurnitureDetails (
        short_description,
        full_description,
        sales_package,
        model_number,
        secondary_material,
        config,
        upholstery_material,
        upholstery_color,
        filling_material,
        finish_type,
        maximum_load_capacity,
        origin_of_manufacture,
        width,
        height,
        depth,
        weight,
        seat_height,
        leg_height,
        warranty_summary,
        warranty_service,
        covered_in_warranty,
        not_covered_in_warranty,
        domestic_warranty,
        review,
        sku
      )
    `
    )
    .eq("id", id)
    .single();

  if (error) {
    console.log(error);
    return { data: null, error: "Could not fetch furniture details" };
  }

  if (data) {
    const furnitureData: FurnitureProps = {
      ...data,
      furniture_details:
        data.Furniro_FurnitureDetails &&
        data.Furniro_FurnitureDetails.length > 0
          ? data.Furniro_FurnitureDetails[0]
          : null,
    };

    console.log(furnitureData);
    return { data: furnitureData, error: null };
  }

  return { data: null, error: "Furniture not found" };
}
