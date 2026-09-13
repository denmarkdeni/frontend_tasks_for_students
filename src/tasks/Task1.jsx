import React from "react";
import "./Task1.css";

const SECTIONS = [
  {
    title: "Headings and text",
    rows: [
      { tag: "<h1>", note: "Largest heading", demo: <h1>Heading one</h1> },
      { tag: "<h2>", note: "Section heading", demo: <h2>Heading two</h2> },
      { tag: "<h3>", note: "Sub-section heading", demo: <h3>Heading three</h3> },
      { tag: "<p>", note: "Paragraph", demo: <p>A short paragraph of text.</p> },
      { tag: "<span>", note: "Inline wrapper", demo: <span>Inline text</span> },
      { tag: "<br>", note: "Line break", demo: <>Line one<br />Line two</> },
      { tag: "<hr>", note: "Horizontal rule", demo: <hr /> },
    ],
  },
  {
    title: "Text formatting",
    rows: [
      { tag: "<strong>", note: "Strong importance", demo: <strong>Bold text</strong> },
      { tag: "<em>", note: "Emphasis", demo: <em>Italic text</em> },
      { tag: "<u>", note: "Underline", demo: <u>Underlined text</u> },
      { tag: "<small>", note: "Fine print", demo: <small>Smaller text</small> },
      { tag: "<mark>", note: "Highlight", demo: <mark>Highlighted text</mark> },
      { tag: "<del>", note: "Deleted text", demo: <del>Removed text</del> },
      { tag: "<ins>", note: "Inserted text", demo: <ins>Added text</ins> },
      { tag: "<sub>", note: "Subscript", demo: <>H<sub>2</sub>O</> },
      { tag: "<sup>", note: "Superscript", demo: <>x<sup>2</sup></> },
      { tag: "<code>", note: "Inline code", demo: <code>const x = 1;</code> },
      { tag: "<blockquote>", note: "Block quote", demo: <blockquote>A quoted passage.</blockquote> },
      { tag: "<abbr>", note: "Abbreviation", demo: <abbr title="HyperText Markup Language">HTML</abbr> },
    ],
  },
  {
    title: "Lists",
    rows: [
      {
        tag: "<ul>",
        note: "Unordered list",
        demo: (
          <ul>
            <li>Item one</li>
            <li>Item two</li>
          </ul>
        ),
      },
      {
        tag: "<ol>",
        note: "Ordered list",
        demo: (
          <ol>
            <li>Step one</li>
            <li>Step two</li>
          </ol>
        ),
      },
      {
        tag: "<dl>",
        note: "Description list",
        demo: (
          <dl>
            <dt>HTML</dt>
            <dd>Markup language</dd>
          </dl>
        ),
      },
    ],
  },
  {
    title: "Links and media",
    rows: [
      { tag: "<a>", note: "Hyperlink", demo: <a href="#top">Visit link</a> },
      {
        tag: "<img>",
        note: "Image",
        demo: <img src="https://placehold.co/48x32" alt="Placeholder" />,
      },
      { tag: "<figure>", note: "Media with caption", demo: (
          <figure>
            <img src="https://placehold.co/48x32" alt="Placeholder" />
            <figcaption>Fig. 1</figcaption>
          </figure>
        ) },
    ],
  },
  {
    title: "Table",
    rows: [
      {
        tag: "<table>",
        note: "Rows and columns",
        demo: (
          <table className="demo-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Asha</td>
                <td>92</td>
              </tr>
            </tbody>
          </table>
        ),
      },
    ],
  },
  {
    title: "Forms",
    rows: [
      { tag: "<input type=\"text\">", note: "Text field", demo: <input type="text" placeholder="Your name" readOnly /> },
      { tag: "<input type=\"checkbox\">", note: "Checkbox", demo: <label><input type="checkbox" readOnly /> Agree</label> },
      { tag: "<input type=\"radio\">", note: "Radio button", demo: <label><input type="radio" readOnly /> Option</label> },
      { tag: "<textarea>", note: "Multi-line text", demo: <textarea rows="1" defaultValue="Notes" readOnly /> },
      {
        tag: "<select>",
        note: "Dropdown",
        demo: (
          <select defaultValue="one">
            <option value="one">One</option>
            <option value="two">Two</option>
          </select>
        ),
      },
      { tag: "<button>", note: "Button", demo: <button type="button">Click me</button> },
      { tag: "<label>", note: "Field label", demo: <label htmlFor="demo-input">Name</label> },
    ],
  },
  {
    title: "Semantic layout",
    rows: [
      { tag: "<header>", note: "Page or section header", demo: <header>Header content</header> },
      { tag: "<nav>", note: "Navigation links", demo: <nav>Home / About</nav> },
      { tag: "<main>", note: "Main content", demo: <main>Main content</main> },
      { tag: "<section>", note: "Thematic section", demo: <section>Section content</section> },
      { tag: "<article>", note: "Self-contained content", demo: <article>Article content</article> },
      { tag: "<aside>", note: "Side content", demo: <aside>Aside content</aside> },
      { tag: "<footer>", note: "Page or section footer", demo: <footer>Footer content</footer> },
    ],
  },
  {
    title: "Other useful tags",
    rows: [
      {
        tag: "<details>",
        note: "Expandable disclosure",
        demo: (
          <details>
            <summary>More info</summary>
            Extra detail shown when opened.
          </details>
        ),
      },
      { tag: "<progress>", note: "Progress bar", demo: <progress value="60" max="100" /> },
      { tag: "<time>", note: "Date or time", demo: <time dateTime="2026-09-13">13 Sep 2026</time> },
      { tag: "<address>", note: "Contact info", demo: <address>123 Main Street</address> },
    ],
  },
];

export default function Task1() {
  return (
    <div className="tag-sheet">
      <header className="tag-sheet-header">
        <h1>HTML tags practice sheet</h1>
        <p>Every row pairs the tag with a short note and its live output.</p>
      </header>

      {SECTIONS.map((section) => (
        <section className="tag-section" key={section.title}>
          <h2>{section.title}</h2>

          <div className="tag-table">
            <div className="tag-row tag-row-head">
              <span>Tag</span>
              <span>Purpose</span>
              <span>Example</span>
            </div>

            {section.rows.map((row) => (
              <div className="tag-row" key={row.tag}>
                <code className="tag-name">{row.tag}</code>
                <span className="tag-note">{row.note}</span>
                <div className="tag-demo">{row.demo}</div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}