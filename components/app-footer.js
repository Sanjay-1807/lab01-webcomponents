class AppFooter extends HTMLElement {
  static get observedAttributes() {
    return ["company", "email", "year"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const company = this.getAttribute("company") ?? "Company";
    const email = this.getAttribute("email") ?? "contact@example.com";
    const year = this.getAttribute("year") ?? new Date().getFullYear();

    this.shadowRoot.innerHTML = `
      <style>
        footer{
          padding: 16px 18px;
          border-top: 1px solid rgba(255,255,255,0.10);
          color: #9ca3af;
          font-size: 12px;
          background: rgba(0,0,0,0.18);
        }
        .wrap{
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        a{ color: rgba(96,165,250,0.95); text-decoration: none; }
        a:hover{ text-decoration: underline; }
      </style>

      <footer>
        <div class="wrap">
          <div>${company} • © ${year}</div>
          <div>Contact: <a href="mailto:${email}">${email}</a></div>
        </div>
      </footer>
    `;
  }
}

customElements.define("app-footer", AppFooter);
