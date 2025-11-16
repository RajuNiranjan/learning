import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Employee } from "../../types/employee.types";

export const employeeAPI = createApi({
  reducerPath: "employeeAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/v1/employe",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.access_token;
      if (token) headers.set("authorization", `Bearet ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Employee"],
  endpoints: (builder) => ({
    addEmployee: builder.mutation<Employee, Partial<Employee>>({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Employee"],
    }),
    updateEmploye: builder.mutation<
      Employee,
      { empId: string } & Partial<Employee>
    >({
      query: ({ empId, ...body }) => ({
        url: `/${empId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Employee"],
    }),
    deleteEmployee: builder.mutation<void, { empId: string }>({
      query: (empId) => ({
        url: `/${empId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Employee"],
    }),
    getEmploye: builder.query<
      {
        employee: Employee[];
        total: number;
        page: number;
        totalPage: number;
      },
      {
        page?: number;
        limit?: number;
        search?: string;
        role?: string;
        status?: string;
      }
    >({
      query: ({ page = 1, limit = 5, search = "", role = "" }) => ({
        url: `?page=${page}?limit=${limit}?search=${search}?role=${role}`,
        method: "GET",
      }),
      providesTags: ["Employee"],
    }),
  }),
});

export const {
  useAddEmployeeMutation,
  useDeleteEmployeeMutation,
  useUpdateEmployeMutation,
} = employeeAPI;
