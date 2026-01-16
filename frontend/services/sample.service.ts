import api from "./api";
import { PAGINATION } from "@/constants";

export interface Sample {
    id: number;
    name: string;
    description?: string;
    created_at: string;
    updated_at: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    total_page: number;
    number_item: number;
    total_item: number;
}

export interface SampleQuery {
    page?: number;
    size?: number;
    sort?: string;
    order?: "ASC" | "DESC";
    filter?: string;
}

export const sampleService = {
    async getAll(query?: SampleQuery): Promise<PaginatedResponse<Sample>> {
        const params = {
            page: query?.page || PAGINATION.DEFAULT_PAGE,
            size: query?.size || PAGINATION.DEFAULT_SIZE,
            ...query,
        };
        const response = await api.get<PaginatedResponse<Sample>>("/samples", {
            params,
        });
        return response.data;
    },

    async getById(id: number): Promise<Sample> {
        const response = await api.get<Sample>(`/samples/${id}`);
        return response.data;
    },

    async create(data: Partial<Sample>): Promise<Sample> {
        const response = await api.post<Sample>("/samples", data);
        return response.data;
    },

    async update(id: number, data: Partial<Sample>): Promise<Sample> {
        const response = await api.put<Sample>(`/samples/${id}`, data);
        return response.data;
    },

    async delete(id: number): Promise<void> {
        await api.delete(`/samples/${id}`);
    },
};

export default sampleService;
