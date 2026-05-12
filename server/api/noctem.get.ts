export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  
  try {
    const data = await $fetch(`${config.public.apiEndpoint}/noctem`, {
      headers: getHeaders(event)
    })
    return data
  } catch (err) {
    throw createError({
      statusCode: 502,
      statusMessage: 'Failed to fetch content from backend'
    })
  }
})