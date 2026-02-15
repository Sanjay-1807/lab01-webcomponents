class UserCard extends HTMLElement {
  static get observedAttributes() {
    return ["name", "role", "img-src"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.onClick = this.onClick.bind(this);
  }

  connectedCallback() {
    this.render();
    this.shadowRoot.addEventListener("click", this.onClick);
    this.setAttribute("tabindex", "0");
    this.setAttribute("role", "button");
    this.setAttribute("aria-label", "Select user");
  }

  disconnectedCallback() {
    this.shadowRoot.removeEventListener("click", this.onClick);
  }

  attributeChangedCallback() {
    this.render();
  }

  onClick() {
    // Low coupling: emit event, parent decides behavior
    this.dispatchEvent(new CustomEvent("user-selected", {
      bubbles: true,
      composed: true,
      detail: {
        name: this.getAttribute("name") ?? "",
        role: this.getAttribute("role") ?? ""
      }
    }));
  }

  render() {
    const name = this.getAttribute("name") ?? "Unknown";
    const role = this.getAttribute("role") ?? "—";
    const img = this.getAttribute("img-src") ?? "https://i.pravatar.cc/160?img=1";

    this.shadowRoot.innerHTML = `
      <style>
        .card{
          display: grid;
          grid-template-columns: 52px 1fr;
          gap: 12px;
          align-items: center;
          padding: 12px;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.10);
          background: rgba(15, 23, 42, 0.55);
          cursor: pointer;
          transition: transform .08s ease, border-color .15s ease;
          user-select: none;
        }
        .card:hover{
          transform: translateY(-1px);
          border-color: rgba(96,165,250,0.55);
        }
        img{
          width: 52px;
          height: 52px;
          border-radius: 50%;
          object-fit: cover;
          border: 1px solid rgba(255,255,255,0.15);
        }
        .name{
          font-weight: 650;
          font-size: 14px;
          margin: 0;
        }
        .role{
          margin: 4px 0 0;
          color: #9ca3af;
          font-size: 12px;
        }
        .meta{
          margin-top: 6px;
          font-size: 12px;
          color: rgba(96,165,250,0.9);
        }
      </style>

      <div class="card">
        <img alt="${name}" src="${img}" />
        <div>
          <p class="name">${name}</p>
          <p class="role">${role}</p>
          <!-- Open/Closed: allow extra content without changing component -->
          <div class="meta"><slot name="meta"></slot></div>
        </div>
      </div>
    `;
  }
}

customElements.define("user-card", UserCard);
