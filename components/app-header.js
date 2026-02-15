class AppHeader extends HTMLElement {
  static get observedAttributes() {
    return ["title", "subtitle"];
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
    const title = this.getAttribute("title") ?? "App Header";
    const subtitle = this.getAttribute("subtitle") ?? "";

    this.shadowRoot.innerHTML = `
      <style>
        header{
          padding: 18px;
          border-bottom: 1px solid rgba(255,255,255,0.10);
          background: rgba(0,0,0,0.20);
          backdrop-filter: blur(6px);
        }
        .wrap{
          max-width: 1100px;
          margin: 0 auto;
        }
        h1{
          margin: 0;
          font-size: 20px;
          letter-spacing: .3px;
        }
        p{
          margin: 6px 0 0;
          color: #9ca3af;
          font-size: 13px;
        }
        /* Open/Closed via slot: allow extra content (buttons, nav, etc.) */
        .slot{
          margin-top: 10px;
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
      </style>
      <header>
        <div class="wrap">
          <h1>${title}</h1>
          <p>${subtitle}</p>
          <div class="slot"><slot></slot></div>
        </div>
      </header>
    `;
  }
}

customElements.define("app-header", AppHeader);
