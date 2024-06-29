"use server";

import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import type { MapboxResponse } from "~/config/models";
import { env } from "~/env";

export const searchAddress = async (value: string) => {
  const session_token = uuidv4();

  const access_token = env.NEXT_PUBLIC_MAPBOX_KEY;

  const api_link = `https://api.mapbox.com/search/searchbox/v1/suggest?q=${value}&access_token=${access_token}&session_token=${session_token}`;

  const response = await axios.get<MapboxResponse>(api_link);

  return response.data.suggestions;
};
