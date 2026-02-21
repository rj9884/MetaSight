export interface SeoData {
    title: string | null;
    description: string | null;
    keywords: string | null;
    headings: { level: string; text: string }[];
    ogTags: Record<string, string>;
    twitterTags: Record<string, string>;
    images: { src: string; alt: string | null }[];
    links: { href: string; text: string; isExternal: boolean; nofollow: boolean }[];
    wordCount: number;
}

export const analyzeUrl = async (url: string): Promise<SeoData> => {
    try {
        const rawUrl = url.startsWith('http') ? url : `https://${url}`;
        const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(rawUrl)}`);
        const data = await response.json();

        if (!data.contents) {
            throw new Error("Could not fetch content from the provided URL.");
        }

        return parseHtml(data.contents, rawUrl);
    } catch (error) {
        console.error("Error analyzing URL:", error);
        throw error;
    }
};

const parseHtml = (htmlContent: string, baseUrl: string): SeoData => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');

    // Title
    const title = doc.querySelector('title')?.textContent || null;

    // Meta Tags
    let description: string | null = null;
    let keywords: string | null = null;
    const ogTags: Record<string, string> = {};
    const twitterTags: Record<string, string> = {};

    doc.querySelectorAll('meta').forEach(meta => {
        const name = meta.getAttribute('name')?.toLowerCase();
        const property = meta.getAttribute('property')?.toLowerCase();
        const content = meta.getAttribute('content');

        if (!content) return;

        if (name === 'description') {
            description = content;
        } else if (name === 'keywords') {
            keywords = content;
        } else if (property?.startsWith('og:')) {
            ogTags[property.replace('og:', '')] = content;
        } else if (name?.startsWith('twitter:')) {
            twitterTags[name.replace('twitter:', '')] = content;
        }
    });

    // Headings
    const headings: { level: string; text: string }[] = [];
    doc.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(h => {
        if (h.textContent?.trim()) {
            headings.push({
                level: h.tagName.toLowerCase(),
                text: h.textContent.trim().replace(/\s+/g, ' ')
            });
        }
    });

    // Images
    const images: { src: string; alt: string | null }[] = [];
    doc.querySelectorAll('img').forEach(img => {
        const src = img.getAttribute('src');
        if (src) {
            images.push({
                src,
                alt: img.getAttribute('alt') || null
            });
        }
    });

    // Links
    const links: { href: string; text: string; isExternal: boolean; nofollow: boolean }[] = [];
    let baseOrigin = '';
    try {
        baseOrigin = new URL(baseUrl).origin;
    } catch (e) {
        // Ignore invalid base url
    }

    doc.querySelectorAll('a').forEach(a => {
        const href = a.getAttribute('href');
        if (href && !href.startsWith('javascript:') && !href.startsWith('mailto:')) {
            let isExternal = false;
            const nofollow = a.getAttribute('rel')?.includes('nofollow') || false;
            try {
                const linkUrl = new URL(href, baseOrigin);
                isExternal = linkUrl.origin !== baseOrigin;
            } catch (e) {
                // If it throws, it might be a weird relative link, assume internal
            }
            links.push({
                href,
                text: a.textContent?.trim().replace(/\s+/g, ' ') || 'No Text Text',
                isExternal,
                nofollow
            });
        }
    });

    // Word count (rough estimate of visible text)
    const bodyText = doc.body?.textContent || '';
    const wordCount = bodyText.split(/\s+/).filter(word => word.length > 0).length;

    return { title, description, keywords, headings, ogTags, twitterTags, images, links, wordCount };
};
