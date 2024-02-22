import ISession from '../interfaces/ISession'
import baseApi from './baseApi'


export const sessionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSession: builder.mutation<Partial<ISession>, Partial<ISession>>({
      query: (body) => ({
        url: 'sessions/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Session'],
    }),
    getCurrentSession: builder.query<Partial<ISession>, void>({
      query: () => 'sessions/get_current_session/',
      providesTags: ['Session'],
    }),
  }),
})

export const { useCreateSessionMutation, useGetCurrentSessionQuery } = sessionApi
