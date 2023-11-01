// From https://remix.run/docs/en/main/guides/resource-routes
export const loader = async () => {
    return new Response(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Content-Type': 'application/json',
            'Content-Security-Policy': "frame-ancestors 'self' https://plugins-cdn.datocms.com"
        },
    })
}

export const action = async ({request}) => {

    const baseUrl = process.env.VERCEL_URL
        // Vercel auto-populates this environment variable
        ? `https://${process.env.VERCEL_URL}`
        // Netlify auto-populates this environment variable
        : process.env.URL;


    const generatePreviewUrl = ({item, itemType, locale}) => {
        switch (itemType.attributes.api_key) {
            case 'post':
                return `/posts/${item.attributes.slug}`;
            default:
                return null;
        }
    }

    const url = generatePreviewUrl(request.body);

    const previewLinks = [
        {
            label: 'Published version',
            url: `${baseUrl}${url}`,
        },
        {
            label: 'Draft version',
            url: `${baseUrl}/preview/start?redirect=${url}&secret=${process.env.PREVIEW_MODE_SECRET}`,
        },
    ]

    return new Response(JSON.stringify({previewLinks}), {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Content-Type': 'application/json',
            'Content-Security-Policy': "frame-ancestors 'self' https://plugins-cdn.datocms.com"
        },
    })
}