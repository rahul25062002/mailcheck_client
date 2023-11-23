import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const checkMail = createApi({
  reducerPath: "checkMail",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.disify.com/api",
  }),
  endpoints: (builder) => ({
    GetCheckSingleMail: builder.query({
      query: (name) => `/email/${name}`,
    }),
    GetMass: builder.query({
      query: (name) => `/email/${name}/mass`,
    }),
    GetMails: builder.query({
      query: (id) => `/view/${id}`,
      transformResponse: (response) => {
    // Parse the JSON response and return the data
       const res=JSON.parse(response);
    return res;
  }}),
  }),
});

export const { useGetCheckSingleMailQuery,useGetMassQuery,useGetMailsQuery } = checkMail;

