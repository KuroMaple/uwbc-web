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
  }),
})

export const { useCreateSessionMutation } = sessionApi
