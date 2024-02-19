import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const NEWS_API_KEY = process.env.REACT_APP_RAPID_API_KEY;
const baseUrl = "https://cryptocurrency-news2.p.rapidapi.com/v1/coindesk";
const headers = {
  "X-RapidAPI-Key": NEWS_API_KEY,
  "X-RapidAPI-Host": "cryptocurrency-news2.p.rapidapi.com",
};
const createRequest = (url, headers) => ({
  url,
  headers,
});

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getNews: builder.query({
      query: () => createRequest("", headers),
    }),
  }),
});

export const { useGetNewsQuery } = newsApi;
