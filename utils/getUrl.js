export default function () {
  const runtimeConfig = useRuntimeConfig();
  console.log(    runtimeConfig.public.NEXT_PUBLIC_SITE_URL,
    runtimeConfig.public.NEXT_PUBLIC_VERCEL_URL// Automatically set by Vercel.
  )
  let url =
    runtimeConfig.public.NEXT_PUBLIC_SITE_URL || // Set this to your site URL in production env.
    runtimeConfig.public.NEXT_PUBLIC_VERCEL_URL ||// Automatically set by Vercel.
    'http://localhost:3000/'
  url = url.includes('http') ? url : `https://${url}`
  return url
}

