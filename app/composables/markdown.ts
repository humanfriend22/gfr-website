import { marked } from "marked";

export function renderBannerMarkdown(markdown: string) {
    return marked.parseInline(markdown, {
        gfm: true,
    });
}

export function renderStepMarkdown(markdown: string) {
    return marked.parse(markdown, {
        async: false,
        gfm: true,
    });
}

export function preFormatBlogMarkdown(markdown: string, images: string[]) {
    return markdown
        .replaceAll("{image1}", images[0] || "")
        .replaceAll("{image2}", images[1] || "")
        .replaceAll("{image3}", images[2] || "")
        .replaceAll("{image4}", images[3] || "")
        .replaceAll("{image5}", images[4] || "");
}

export async function renderBlogMarkdown(markdown: string) {
    return await marked.parse(markdown, {
        gfm: true,
        breaks: true,
    });
}
