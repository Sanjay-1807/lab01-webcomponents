class UserDetails extends HTMLElement {
  static get observedAttributes() {
    return ["name", "role", "email", "bio", "img-src"];
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
    const name = this.getAttribute("name") ?? "—";
    const role = this.getAttribute("role") ?? "—";
    const email = this.getAttribute("email") ?? "—";
    const bio = this.getAttribute("bio") ?? "";
    const img = this.getAttribute("img-src") ?? "";

    this.shadowRoot.innerHTML = `
      <style>
        .wrap{
          display: grid;
          gap: 12px;
        }
        .top{
          display: flex;
          gap: 12px;
          align-items: center;
        }
        img{
          width: 64px;
          height: 64px;
          border-radius: 16px;
          object-fit: cover;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.04);
        }
        h3{
          margin: 0;
          font-size: 16px;
        }
        .role{
          margin: 4px 0 0;
          color: #9ca3af;
          font-size: 13px;
        }
        .row{
          display: grid;
          gap: 4px;
          padding: 10px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.10);
          background: rgba(17, 26, 46, 0.55);
        }
        .label{
          font-size: 11px;
          color: #9ca3af;
          letter-spacing: .3px;
          text-transform: uppercase;
        }
        .value{
          font-size: 13px;
          line-height: 1.5;
        }
      </style>

      <div class="wrap">
        <div class="top">
          ${img ? `<img alt="${name}" src="${img}">` : `<img alt="placeholder" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Crect width='100%25' height='100%25' fill='%23111a2e'/%3E%3C/svg%3E">`}
          <div>
            <h3>${name}</h3>
            <div class="role">${role}</div>
          </div>
        </div>

        <div class="row">
          <div class="label">Email</div>
          <div class="value">${email}</div>
        </div>

        <div class="row">
          <div class="label">Bio</div>
          <div class="value">${bio}</div>
        </div>

        <!-- Open/Closed via slot for extra sections (skills, links, etc.) -->
        <slot></slot>
      </div>
    `;
  }
}

customElements.define("user-details", UserDetails);
