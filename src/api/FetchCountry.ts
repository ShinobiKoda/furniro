import { Country, FetchCountriesResponse } from "@/types/type";

let countriesCache: { data: Country[]; timestamp: number } | null = null;
const CACHE_DURATION = 24 * 60 * 60 * 1000; 

export async function fetchWestAfricanCountries(): Promise<FetchCountriesResponse> {
  try {
    if (
      countriesCache &&
      Date.now() - countriesCache.timestamp < CACHE_DURATION
    ) {
      return {
        success: true,
        data: countriesCache.data,
      };
    }

    const response = await fetch(
      "https://restcountries.com/v3.1/subregion/Western%20Africa",
      {
        headers: {
          Accept: "application/json",
        },
        signal: AbortSignal.timeout(10000), 
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const countries: Country[] = await response.json();

    if (!Array.isArray(countries)) {
      throw new Error("Invalid response format: expected array of countries");
    }

    countriesCache = {
      data: countries,
      timestamp: Date.now(),
    };

    return {
      success: true,
      data: countries,
    };
  } catch (error) {
    console.error("Error fetching West African countries:", error);

    if (countriesCache) {
      console.warn("Returning stale cached data due to fetch error");
      return {
        success: true,
        data: countriesCache.data,
      };
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}


export async function getStaticProps() {
  const result = await fetchWestAfricanCountries();

  if (result.success && result.data) {
    return {
      props: {
        countries: result.data,
      },
    };
  }

  return {
    props: {
      countries: [],
    },
  };
}
