import markdownit from "markdown-it";
import { marked } from "marked";

const md = new markdownit({
    html: false,
    typographer: false,
}).disable(["image", "heading", "code", "blockquote", "list", "table"]).use(
    (md) => {
        const allowed = [
            "em",
            "strong",
            "link_open",
            "link_close",
            "text",
            "inline",
        ];
        md.core.ruler.after("inline", "sanitize", (state) => {
            console.log(state, state.tokens);
            state.tokens = state.tokens.filter((token) =>
                allowed.includes(token.type)
            );
        });
    },
);

export function renderBannerMarkdown(markdown: string) {
    return md.renderInline(markdown);
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
