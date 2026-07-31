import os

def update_css():
    with open('style.css', 'r', encoding='utf-8') as f:
        css = f.read()

    # Define old and new :root
    import re
    css = re.sub(r':root\s*\{[^}]*\}', """:root {
  --color-bg: #0F172A;
  --color-text-primary: #F8FAFC;
  --color-text-secondary: #94A3B8;
  --color-accent: #38BDF8;

  --cyan2: #0284c7;
  --violet: #6d28d9;
  --violet2: #7c3aed;
  --rose: #e11d48;
  --gold: #d97706;
  --border: rgba(56, 189, 248, 0.2);
  --glass: rgba(15, 23, 42, 0.6); 
  --font-heading: 'Outfit', sans-serif;
  --font-body: 'Plus Jakarta Sans', sans-serif;
}""", css, count=1)

    # Variables replacements
    css = css.replace("var(--bg)", "var(--color-bg)")
    css = css.replace("var(--bg2)", "var(--color-bg)")
    css = css.replace("var(--bg3)", "var(--color-bg)")
    css = css.replace("var(--text)", "var(--color-text-primary)")
    css = css.replace("var(--muted)", "var(--color-text-secondary)")
    css = css.replace("var(--cyan)", "var(--color-accent)")

    # Color values replacements
    css = css.replace("rgba(0, 165, 184,", "rgba(56, 189, 248,")
    css = css.replace("#00a5b8", "var(--color-accent)")
    css = css.replace("#fff", "var(--color-text-primary)")
    css = css.replace("#ffffff", "var(--color-text-primary)")
    css = css.replace("#000", "var(--color-bg)")
    css = css.replace("#000000", "var(--color-bg)")
    css = css.replace("#0d0d14", "var(--color-bg)")
    css = css.replace("#121212", "var(--color-text-primary)")

    # Glass and whites
    css = css.replace("rgba(255, 255, 255, 0.35)", "var(--glass)")
    css = css.replace("rgba(255, 255, 255, 0.03)", "rgba(248, 250, 252, 0.03)")
    css = css.replace("rgba(255, 255, 255, 0.25)", "rgba(248, 250, 252, 0.25)")
    css = css.replace("rgba(255, 255, 255, 0.15)", "rgba(248, 250, 252, 0.15)")
    css = css.replace("rgba(255, 255, 255, 0.05)", "rgba(248, 250, 252, 0.05)")
    css = css.replace("rgba(255, 255, 255, 0.1)", "rgba(248, 250, 252, 0.1)")
    css = css.replace("rgba(255, 255, 255, 0.06)", "rgba(248, 250, 252, 0.06)")
    css = css.replace("rgba(255, 255, 255, 0.9)", "rgba(15, 23, 42, 0.9)")
    css = css.replace("rgba(255, 255, 255, 0.5)", "rgba(15, 23, 42, 0.5)")

    with open('style.css', 'w', encoding='utf-8') as f:
        f.write(css)

def update_html():
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    html = html.replace('content="#00a5b8"', 'content="#38BDF8"')

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)

if __name__ == "__main__":
    update_css()
    update_html()
    print("Theme updated successfully!")
