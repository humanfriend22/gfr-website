import markdownit from "markdown-it";

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
