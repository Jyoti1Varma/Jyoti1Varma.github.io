# Jyoti Varma — personal portfolio

A single-page website for GitHub Pages. The files work as they are: no installation, build command, account, or animation library is required. All illustrations are original SVG/CSS graphics included in this folder. There are no analytics, cookies, external fonts, or third-party scripts.

## Open it

Double-click `index.html` to view the website. For a local server, run `python3 -m http.server 8000` in this folder, then open `http://localhost:8000`. The email-copy feature uses the browser clipboard when available and has a fallback for local files.

## Upload to your GitHub repository

Upload the following files and folder to the **root** of `jyoti1varma.github.io`:

```text
index.html
styles.css
script.js
.nojekyll
assets/
  favicon.svg
  portrait-placeholder.svg
  Jyoti-Varma-Resume.pdf
```

Keep the `assets` folder and its contents together. Upload the contents of the ZIP after extracting it, not the ZIP itself. `index.html` must be at the root, rather than inside a second Portfolio folder.

If GitHub Pages is not configured yet, use the repository’s Settings → Pages and select deployment from the branch and folder containing these files (normally `main`, `/ (root)`). Your intended address is `https://jyoti1varma.github.io/`. Nothing has been uploaded or published for you.

Official setup guide: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site

## Add your photo

1. Put your image in `assets/` and name it `portrait.jpg` (a vertical photo around 900 × 1100 pixels works well).
2. In `index.html`, find `YOUR PHOTO` near the beginning of the file.
3. Change `src="assets/portrait-placeholder.svg"` to `src="assets/portrait.jpg"`.
4. Change the image’s `alt` text to `Portrait of Jyoti Varma`.

The frame will crop the image to fit. Adjust `.portrait-frame img` → `object-position` in `styles.css` if needed. The current monogram is deliberately a placeholder, not a generated likeness.

## Edit the content

- **Words, dates, projects, skills, links:** edit `index.html`. Section comments and descriptive IDs identify the areas.
- **Colours and fonts:** edit the variables at the top of `styles.css`.
- **Resume:** replace `assets/Jyoti-Varma-Resume.pdf` with a new file using the same name. The supplied copy is the original YUTA one-page resume, unchanged.
- **Hobby descriptions:** search for `hobby-science`, `hobby-books`, `hobby-piano`, `hobby-tennis`, or `hobby-painting` in `index.html`.
- **Book list or painting gallery:** add your real titles or artwork inside the corresponding hobby panel. No personal reading list or artwork has been invented.
- **Email:** update both the visible contact address and `mailto:` link in `index.html`, and the `email` value in `script.js`.

The master CV and annotated feedback have not been added as website downloads. Project descriptions summarize the supplied documents, while the project graphics are conceptual illustrations. The homepage does not make unverified statistical claims about research findings.

## Motion and accessibility

The site includes scroll reveals, a reading-progress line, a subtle portrait tilt, animated project graphics, hobby transitions, and animated scenes for all five interests. It uses CSS and small vanilla JavaScript enhancements instead of a 3D engine.

- Your device’s reduced-motion preference is respected automatically.
- “Pause motion” in the footer stops decorative movement and is remembered locally.
- Main content and project disclosures work without JavaScript; all hobby descriptions appear in sequence.
- The mobile menu supports Escape and keyboard navigation. Interest buttons also support arrow keys, Home, and End.
- No audio plays automatically.

## File roles

| File | Purpose |
| --- | --- |
| `index.html` | All page content and inline illustrated scenes |
| `styles.css` | Responsive layouts, colours, typography, animation |
| `script.js` | Navigation, reveals, hobby selection, clipboard, motion control |
| `assets/` | Portrait placeholder, icon, and resume |

Design direction: inspired by the welcoming, photo-led structure and professional/personal sections of https://www.mingshichi.com/. The implementation, copy, and illustrations here are made for Jyoti; no friend’s photos or project assets are reused.
