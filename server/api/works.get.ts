export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(getQuery(event))) {
    params.set(key, Array.isArray(value) ? String(value[0]) : String(value))
  }

  try {
    return await $fetch(`${config.public.apiEndpoint}/works?${params.toString()}`)
  } catch {
    throw createError({
      statusCode: 502,
      statusMessage: 'Failed to fetch works from backend'
    })
  }
})
