"use strict";

function html(parts, ...values) {
  return parts.reduce(
    (result, part, index) => result + part + (index < values.length ? values[index] : ""),
    "",
  );
}

const products = [
  {
    id: "palmeiras",
    team: "Palmeiras",
    name: "Titular 2024 · Verde tradicional",
    category: "Titular",
    price: 31990,
    color: "#176442",
    accent: "#e9e8cc",
    mark: "P",
    tag: "TRADIÇÃO EM CAMPO",
  },
  {
    id: "vasco",
    team: "Vasco",
    name: "Retrô 1998 · Faixa clássica",
    category: "Retrô",
    price: 24990,
    color: "#1a202a",
    accent: "#ffffff",
    mark: "V",
    tag: "MEMÓRIA DO FUTEBOL",
  },
  {
    id: "brasil",
    team: "Brasil",
    name: "Titular · Amarelo da nossa seleção",
    category: "Titular",
    price: 29990,
    color: "#f2c632",
    accent: "#176442",
    mark: "BR",
    tag: "PAIXÃO NACIONAL",
  },
  {
    id: "corinthians",
    team: "Corinthians",
    name: "Treino · Preto e branco",
    category: "Treino",
    price: 17990,
    color: "#e9edf2",
    accent: "#1a202a",
    mark: "C",
    tag: "DENTRO E FORA DE CAMPO",
  },
  {
    id: "flamengo",
    team: "Flamengo",
    name: "Titular · Rubro-negra",
    category: "Titular",
    price: 28990,
    color: "#a32232",
    accent: "#161d28",
    mark: "F",
    tag: "CORES QUE CONECTAM",
  },
  {
    id: "santos",
    team: "Santos",
    name: "Retrô · Branco histórico",
    category: "Retrô",
    price: 22990,
    color: "#f7f7f7",
    accent: "#171d28",
    mark: "S",
    tag: "HISTÓRIA PARA VESTIR",
  },
];
const sizes = ["P", "M", "G", "GG"];
const money = (n) => (n / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const esc = (value) =>
  String(value ?? "").replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c],
  );
const findProduct = (id) => products.find((p) => p.id === id);
let storageAvailable = true;
function readState() {
  try {
    const raw = JSON.parse(localStorage.getItem("fieldkit-v2") || "{}");
    return {
      cart: Array.isArray(raw.cart)
        ? raw.cart.filter(
            (i) =>
              i &&
              findProduct(i.id) &&
              sizes.includes(i.size) &&
              Number.isInteger(i.qty) &&
              i.qty > 0 &&
              i.qty <= 10,
          )
        : [],
      favorites: Array.isArray(raw.favorites) ? raw.favorites.filter((id) => findProduct(id)) : [],
      coupon: raw.coupon === "FIELDKIT15" ? "FIELDKIT15" : "",
    };
  } catch {
    storageAvailable = false;
    return { cart: [], favorites: [], coupon: "" };
  }
}
const state = readState();

let delivery = null,
  profile = "",
  lastOrder = null,
  undoItem = null,
  processing = false;
let filters = { q: "", team: "Todos", category: "Todas", sort: "featured" };
const main = document.querySelector("main");
const status = document.querySelector("#status");
function save() {
  try {
    localStorage.setItem("fieldkit-v2", JSON.stringify(state));
  } catch {
    storageAvailable = false;
  }
  updateHeader();
}
function announce(message) {
  status.textContent = message;
}
function updateHeader() {
  const n = state.cart.reduce((sum, i) => sum + i.qty, 0);
  document.querySelector("#cart-count").textContent = n;
  document
    .querySelector(".cart-link")
    .setAttribute("aria-label", `Sacola, ${n} ${n === 1 ? "item" : "itens"}`);
  document.querySelector("#account-link").textContent = profile ? "Meu perfil" : "Entrar";
}
function go(route) {
  if (location.hash === `#${route}`) render();
  else location.hash = route;
}
function shirt(p, decorative = false) {
  let decoration;
  if (p.id === "vasco") {
    decoration = html`<path d="M77 238 223 105 223 153 77 286Z" fill="#fff" />`;
  } else if (p.id === "flamengo") {
    decoration = html`<path
      d="M75 128H225 M75 185H225 M75 242H225"
      stroke="#161d28"
      stroke-width="27"
    />`;
  } else {
    decoration = html`<path
      d="M99 103V280 M201 103V280"
      stroke="${p.accent}"
      stroke-width="1"
      opacity=".28"
    />`;
  }
  return html`<svg
    viewBox="0 0 300 330"
    ${decorative ? 'aria-hidden="true"' : `role="img" aria-label="${esc("Ilustração da camisa " + p.team + " · " + p.category)}"`}
    focusable="false"
  >
    <path
      d="M87 46 48 65 12 125 57 151 73 126 73 298 227 298 227 126 243 151 288 125 252 65 213 46 187 38 113 38Z"
      fill="${p.color}"
      stroke="${p.accent}"
      stroke-width="2"
    />
    <path d="M113 38 Q150 75 187 38 L178 67 Q150 90 122 67Z" fill="${p.accent}" />
    <path d="M48 65 77 105 M252 65 223 105" stroke="${p.accent}" stroke-width="7" />
    ${decoration}
    <path d="M76 293H224" stroke="${p.accent}" stroke-width="5" />
    <path d="M179 94h25v23q-12 14-25 0Z" fill="${p.accent}" />
    <text
      x="150"
      y="205"
      text-anchor="middle"
      font-family="Arial,sans-serif"
      font-size="65"
      font-weight="800"
      fill="${p.accent}"
    >
      10
    </text>
    <text
      x="150"
      y="246"
      text-anchor="middle"
      font-family="Arial,sans-serif"
      font-size="13"
      letter-spacing="5"
      fill="${p.accent}"
    >
      FIELDKIT
    </text>
  </svg>`;
}
function favoriteButton(p) {
  const on = state.favorites.includes(p.id);
  return html`<button
    class="favorite"
    type="button"
    data-action="favorite"
    data-id="${p.id}"
    aria-pressed="${on}"
    aria-label="${on ? "Remover" : "Adicionar"} ${p.team} ${p.category} ${on ? "dos" : "aos"} favoritos"
  >
    <span aria-hidden="true">${on ? "♥" : "♡"}</span>
  </button>`;
}
function productCard(product, heading) {
  const title =
    heading === "h3"
      ? html`<h3><a href="#produto/${product.id}">${product.name}</a></h3>`
      : html`<h2><a href="#produto/${product.id}">${product.name}</a></h2>`;

  return html`
    <article class="product-card">
      <div class="product-image">
        <span class="product-label">${product.tag}</span>
        <a
          href="#produto/${product.id}"
          aria-label="Ver detalhes: ${product.team}, ${product.name}"
        >
          ${shirt(product, true)}
        </a>
        ${favoriteButton(product)}
      </div>
      <div class="product-body">
        <p class="eyebrow">${product.team} / ${product.category}</p>
        ${title}
        <p class="price">${money(product.price)}</p>
        <p class="hint">10x de ${money(product.price / 10)} sem juros</p>
      </div>
    </article>
  `;
}

function cards(list, heading = "h2") {
  const items = list.map((product) => productCard(product, heading)).join("");
  return html`<div class="product-grid">${items}</div>`;
}
function empty(title, copy, action = '<a class="btn" href="#catalogo">Explorar camisas</a>') {
  return html`<div class="empty">
    <p class="empty-icon" aria-hidden="true">↗</p>
    <h2>${title}</h2>
    <p class="muted">${copy}</p>
    ${action}
  </div>`;
}
const breadcrumbs = (text) =>
  html`<div class="breadcrumbs">
    <a href="#inicio">Início</a> <span aria-hidden="true"> / </span> ${text}
  </div>`;
function home() {
  return html`<section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">Muito além dos 90 minutos</p>
        <h1>Vista a sua<br /><span>paixão.</span></h1>
        <p>
          Das conquistas históricas aos próximos capítulos. Encontre a camisa que conta a sua
          história.
        </p>
        <a class="btn gold" href="#catalogo"
          >Encontrar minha camisa <span aria-hidden="true">↗</span></a
        >
      </div>
      <div class="hero-art" aria-hidden="true">
        <div class="hero-stamp">FUTEBOL<br />É CULTURA</div>
        ${shirt(products[0], true)}
      </div>
    </section>
    <div class="trust-row">
      <p><b>01 / Escolha com calma</b> Filtros por time e coleção</p>
      <p><b>02 / Acerte o tamanho</b> Guia de medidas em cada camisa</p>
      <p><b>03 / Sem surpresas</b> Revise tudo antes de confirmar</p>
    </div>
    <section aria-labelledby="featured">
      <div class="section-head">
        <div>
          <p class="eyebrow">A próxima vai com você</p>
          <h2 id="featured">Dentro e fora de campo.</h2>
          <p class="muted">Histórias diferentes. A mesma paixão.</p>
        </div>
        <a href="#catalogo" class="btn secondary">Ver coleção completa ↗</a>
      </div>
      <div class="chips" aria-label="Coleções">
        ${["Titular", "Retrô", "Treino"].map((c) => html`<a class="chip" href="#catalogo/${encodeURIComponent(c)}">${c}</a>`).join("")}
      </div>
      ${cards(products.slice(0, 4), "h3")}
    </section>
    <section class="editorial">
      <div>
        <p class="eyebrow">Futebol é para todo mundo</p>
        <h2>Uma experiência que inclui.</h2>
      </div>
      <div>
        <p>
          Navegue pelo teclado, consulte medidas e compre como visitante. Cada escolha tem uma
          resposta clara.
        </p>
        <a href="#ajuda">Conhecer os recursos de acessibilidade →</a>
      </div>
    </section>`;
}
function filteredProducts() {
  const normalize = (s) =>
    s
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  return products
    .filter(
      (p) =>
        (filters.team === "Todos" || p.team === filters.team) &&
        (filters.category === "Todas" || p.category === filters.category) &&
        normalize(p.team + " " + p.name + " " + p.category).includes(normalize(filters.q.trim())),
    )
    .sort((a, b) =>
      filters.sort === "price-asc"
        ? a.price - b.price
        : filters.sort === "price-desc"
          ? b.price - a.price
          : 0,
    );
}
function options(values, current) {
  return values
    .map((v) => html`<option${v === current ? " selected" : ""}>${esc(v)}</option>`)
    .join("");
}
function catalog() {
  const list = filteredProducts();
  return html`${breadcrumbs("Catálogo")}
    <div class="section-head">
      <div>
        <p class="eyebrow">Encontre suas cores</p>
        <h1>Catálogo de camisas</h1>
        <p class="muted">Escolha seu time, sua coleção e sua próxima história.</p>
      </div>
    </div>
    <form id="filters" class="filters">
      <div>
        <label for="q">Buscar camisa</label
        ><input
          id="q"
          name="q"
          type="search"
          value="${esc(filters.q)}"
          placeholder="Ex.: Vasco, retrô…"
        />
      </div>
      <div>
        <label for="team">Time</label
        ><select id="team" name="team">
          ${options(["Todos", ...products.map((p) => p.team)], filters.team)}
        </select>
      </div>
      <div>
        <label for="category">Coleção</label
        ><select id="category" name="category">
          ${options(["Todas", "Titular", "Retrô", "Treino"], filters.category)}
        </select>
      </div>
      <div>
        <label for="sort">Ordenar por</label
        ><select id="sort" name="sort">
          <option value="featured" ${filters.sort === "featured" ? " selected" : ""}>
            Destaques
          </option>
          <option value="price-asc" ${filters.sort === "price-asc" ? " selected" : ""}>
            Menor preço
          </option>
          <option value="price-desc" ${filters.sort === "price-desc" ? " selected" : ""}>
            Maior preço
          </option>
        </select>
      </div>
      <div class="actions">
        <button class="btn" type="submit">Aplicar filtros</button
        ><button class="text-btn" type="button" data-action="clear-filters">Limpar filtros</button>
      </div>
    </form>
    <p class="result-count" role="status">
      ${list.length} ${list.length === 1 ? "camisa encontrada" : "camisas encontradas"}
    </p>
    ${list.length ? cards(list) : empty("Nenhuma camisa encontrada", "Tente outro termo ou limpe os filtros para ver a coleção.", '<button class="btn" data-action="clear-filters">Limpar filtros</button>')}`;
}
function productView(p) {
  return html`${breadcrumbs('<a href="#catalogo">Catálogo</a> / ' + esc(p.team))}
    <div class="detail-grid">
      <div class="detail-image">${shirt(p)}</div>
      <div class="detail-copy">
        <p class="eyebrow">${p.team} / ${p.category}</p>
        <h1>${p.name}</h1>
        <p class="muted">
          Uma camisa para levar sua paixão aonde você for. Modelo ilustrativo da coleção FieldKit.
        </p>
        <p class="price">${money(p.price)}</p>
        <p class="hint">10x de ${money(p.price / 10)} sem juros · valores simulados</p>
        <form id="add-product" data-id="${p.id}" novalidate class="divider">
          <fieldset>
            <legend>Escolha o tamanho <span class="muted">(obrigatório)</span></legend>
            <div class="size-options">
              ${sizes.map((s) => html`<label class="size-option"><input type="radio" name="size" value="${s}" required aria-describedby="size-error" /><span>${s}</span></label>`).join("")}
            </div>
            <p id="size-error" class="field-error" role="alert"></p>
          </fieldset>
          <button class="btn full" type="submit">Adicionar à sacola</button>
        </form>
        <div class="divider">
          <details>
            <summary>Guia de tamanhos</summary>
            <table>
              <caption>
                Medidas aproximadas da peça, em centímetros
              </caption>
              <thead>
                <tr>
                  <th scope="col">Tamanho</th>
                  <th scope="col">Largura</th>
                  <th scope="col">Comprimento</th>
                </tr>
              </thead>
              <tbody>
                ${sizes
                  .map(
                    (s, i) =>
                      html`<tr>
                        <th scope="row">${s}</th>
                        <td>${50 + i * 3}</td>
                        <td>${70 + i * 2}</td>
                      </tr>`,
                  )
                  .join("")}
              </tbody>
            </table>
            <p class="hint">Compare com uma camisa sua esticada sobre uma superfície plana.</p>
          </details>
          <details>
            <summary>Material e cuidados</summary>
            <p>
              Modelo demonstrativo em poliéster. Lavar à mão, secar à sombra e não passar sobre
              estampas.
            </p>
          </details>
          <details>
            <summary>Entrega e trocas</summary>
            <p>
              Frete simulado: grátis a partir de R$ 199,00 após desconto; abaixo disso, R$ 19,90.
              Prazo ilustrativo: 5 a 8 dias úteis. Não há envio real.
            </p>
          </details>
        </div>
        <div style="position:relative;min-height:64px">${favoriteButton(p)}</div>
      </div>
    </div>`;
}
function favorites() {
  const list = products.filter((p) => state.favorites.includes(p.id));
  return html`${breadcrumbs("Favoritos")}
    <div class="section-head">
      <div>
        <p class="eyebrow">Sua seleção pessoal</p>
        <h1>Camisas favoritas</h1>
        <p class="muted">Salvas neste navegador para você decidir com calma.</p>
      </div>
    </div>
    ${list.length ? cards(list) : empty("Sua seleção começa aqui", "Toque no coração de uma camisa para guardá-la nesta lista.")}`;
}
function totals() {
  const subtotal = state.cart.reduce((s, i) => s + findProduct(i.id).price * i.qty, 0);
  const eligible = state.cart.reduce(
    (s, i) => s + (findProduct(i.id).category === "Titular" ? findProduct(i.id).price * i.qty : 0),
    0,
  );
  const discount = state.coupon ? Math.round(eligible * 0.15) : 0;
  const shipping = subtotal === 0 || subtotal - discount >= 19900 ? 0 : 1990;
  return { subtotal, discount, shipping, total: subtotal - discount + shipping };
}
function summary(action = "") {
  const t = totals();
  return html`<aside class="panel summary" aria-label="Resumo do pedido">
    <h2>Resumo do pedido</h2>
    <div class="summary-row"><span>Produtos</span><span>${money(t.subtotal)}</span></div>
    <div class="summary-row">
      <span>Desconto ${state.coupon ? "(FIELDKIT15)" : ""}</span><span>− ${money(t.discount)}</span>
    </div>
    <div class="summary-row">
      <span>Frete simulado</span><span>${t.shipping ? money(t.shipping) : "Grátis"}</span>
    </div>
    <p class="hint">Frete grátis a partir de R$ 199,00 após descontos.</p>
    <div class="summary-row total"><span>Total</span><span>${money(t.total)}</span></div>
    ${action}
    <p class="hint">Ambiente demonstrativo. Nenhum valor será cobrado.</p>
  </aside>`;
}
function cart() {
  return html`${breadcrumbs("Sacola")}
    <div class="section-head">
      <div>
        <p class="eyebrow">Falta pouco</p>
        <h1>Sua sacola</h1>
        <p class="muted">Revise os tamanhos e as quantidades antes de continuar.</p>
      </div>
      <a href="#catalogo">Continuar escolhendo</a>
    </div>
    ${undoItem ? '<p class="notice">Camisa removida. <button class="text-btn" data-action="undo">Desfazer remoção</button></p>' : ""}${
      state.cart.length
        ? html`<div class="checkout-grid">
            <div>
              ${state.cart
                .map((i, index) => {
                  const p = findProduct(i.id);
                  return html`<article class="cart-item">
                    <div class="cart-thumb">${shirt(p, true)}</div>
                    <div>
                      <h2><a href="#produto/${p.id}">${p.team} · ${p.name}</a></h2>
                      <p class="hint">Tamanho ${i.size} · ${money(p.price)} por unidade</p>
                      <p class="price">${money(p.price * i.qty)}</p>
                      <div class="actions">
                        <div class="quantity">
                          <button
                            data-action="quantity"
                            data-index="${index}"
                            data-delta="-1"
                            aria-label="Diminuir quantidade de ${p.team}, tamanho ${i.size}"
                          >
                            −</button
                          ><span aria-label="Quantidade">${i.qty}</span
                          ><button
                            data-action="quantity"
                            data-index="${index}"
                            data-delta="1"
                            aria-label="Aumentar quantidade de ${p.team}, tamanho ${i.size}"
                          >
                            +
                          </button>
                        </div>
                        <button
                          class="text-btn"
                          data-action="remove"
                          data-index="${index}"
                          aria-label="Remover ${p.team}, tamanho ${i.size}, da sacola"
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                  </article>`;
                })
                .join("")}
              <form id="coupon" class="panel divider" novalidate>
                <label for="coupon-code">Cupom de desconto</label>
                <p class="hint" id="coupon-hint">Use FIELDKIT15 para 15% nas camisas titulares.</p>
                <div class="actions">
                  <input
                    id="coupon-code"
                    name="coupon"
                    value="${state.coupon}"
                    aria-describedby="coupon-hint coupon-error"
                    style="flex:1;min-width:150px"
                  /><button class="btn secondary">Aplicar cupom</button
                  >${state.coupon ? '<button type="button" class="text-btn" data-action="remove-coupon">Remover cupom</button>' : ""}
                </div>
                <p id="coupon-error" class="field-error" role="alert"></p>
              </form>
            </div>
            ${summary('<a class="btn full" href="#entrega">Continuar para entrega →</a>')}
          </div>`
        : empty("Sua sacola está vazia", "Encontre uma camisa e escolha o tamanho para começar.")
    }`;
}
function steps(current) {
  return html`<ol class="steps" aria-label="Etapas da compra">
    ${[
      ["carrinho", "1. Sacola"],
      ["entrega", "2. Entrega"],
      ["revisao", "3. Revisão"],
    ]
      .map(([id, label]) => html`<li${current === id ? ' aria-current="step"' : ""}>${label}</li>`)
      .join("")}
  </ol>`;
}
function field(id, label, autocomplete, type = "text", full = false, hint = "") {
  return html`<div class="field${full ? " full" : ""}">
    <label for="${id}">${label}</label
    ><input
      id="${id}"
      name="${id}"
      type="${type}"
      autocomplete="${autocomplete}"
      required
      value="${esc(delivery?.[id] || "")}"
      aria-describedby="${id}-error${hint ? " " + id + "-hint" : ""}"
      ${id === "cep" ? ' inputmode="numeric" maxlength="9"' : ""}
    />${hint ? html`<p class="hint" id="${id}-hint">${hint}</p>` : ""}
    <p class="field-error" id="${id}-error"></p>
  </div>`;
}
function deliveryView() {
  const fields = [
    field("name", "Nome de quem recebe", "name", "text", true),
    field("email", "E-mail", "email", "email", true),
    field(
      "cep",
      "CEP",
      "postal-code",
      "text",
      false,
      "Digite 8 números. Ex.: 50000-000. Não fazemos consulta automática.",
    ),
    field("city", "Cidade", "address-level2"),
    field("street", "Rua e número", "address-line1", "text", true),
  ].join("");
  const states = [
    "AC",
    "AL",
    "AP",
    "AM",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MT",
    "MS",
    "MG",
    "PA",
    "PB",
    "PR",
    "PE",
    "PI",
    "RJ",
    "RN",
    "RS",
    "RO",
    "RR",
    "SC",
    "SP",
    "SE",
    "TO",
  ];
  return html`${steps("entrega")}
    <h1>Onde a paixão vai chegar?</h1>
    <p class="muted">Continue como visitante. Use dados fictícios para testar este protótipo.</p>
    <div class="checkout-grid">
      <form id="delivery" class="panel" novalidate>
        <div id="form-errors" class="error-summary" role="alert" tabindex="-1"></div>
        <h2>Dados de entrega</h2>
        <p class="hint">Todos os campos são obrigatórios. O endereço permanece apenas nesta aba.</p>
        <div class="form-grid">
          ${fields}
          <div class="field full">
            <label for="uf">Estado</label
            ><select
              id="uf"
              name="uf"
              autocomplete="address-level1"
              required
              aria-describedby="uf-error"
            >
              <option value="">Selecione o estado</option>
              ${options(states, delivery?.uf)}
            </select>
            <p class="field-error" id="uf-error"></p>
          </div>
        </div>
        <fieldset class="divider">
          <legend>Forma de pagamento</legend>
          <label class="radio-row"
            ><input type="radio" name="payment" value="demo" checked /><span
              ><b>Pagamento demonstrativo</b><br />Sem cartão, Pix ou cobrança real.</span
            ></label
          >
        </fieldset>
        <div class="actions">
          <a href="#carrinho" class="btn secondary">Voltar à sacola</a
          ><button class="btn" type="submit">Revisar pedido →</button>
        </div>
      </form>
      ${summary()}
    </div>`;
}
function reviewItem(item) {
  const product = findProduct(item.id);
  return html`
    <p>
      <b>${product.team}</b> · ${product.name}<br />
      Tamanho ${item.size} · ${item.qty} ${item.qty === 1 ? "unidade" : "unidades"} ·
      ${money(product.price * item.qty)}
    </p>
  `;
}

function review() {
  const items = state.cart.map(reviewItem).join("");
  return html`${steps("revisao")}
    <h1>Confira. Depois, confirme.</h1>
    <p class="muted">Este é o último passo da simulação. Você ainda pode editar suas escolhas.</p>
    <div class="checkout-grid">
      <div>
        <section class="panel">
          <h2>Entrega</h2>
          <p>
            ${esc(delivery.name)}<br />${esc(delivery.street)}<br />${esc(delivery.city)} /
            ${esc(delivery.uf)} · CEP ${esc(delivery.cep)}<br />${esc(delivery.email)}
          </p>
          <a class="btn secondary" href="#entrega">Editar entrega</a>
        </section>
        <section class="panel divider">
          <h2>Suas camisas</h2>
          ${items}<a class="btn secondary" href="#carrinho">Editar sacola</a>
        </section>
        <section class="panel divider">
          <h2>Pagamento demonstrativo</h2>
          <p>Nenhum dado financeiro é solicitado. O pedido não será enviado para uma loja.</p>
        </section>
      </div>
      ${summary('<button class="btn full" data-action="confirm">Confirmar pedido simulado</button>')}
    </div>`;
}
function confirmation() {
  return html`<section class="confirmation">
    <div class="center">
      <div class="success-badge" aria-hidden="true">✓</div>
      <p class="eyebrow">Tudo certo por aqui</p>
      <h1>Paixão no peito.<br />Pedido simulado!</h1>
      <p class="muted">
        Sua jornada de compra foi concluída. Nenhuma cobrança ou entrega será realizada.
      </p>
    </div>
    <div class="panel divider">
      <h2>Resumo da simulação</h2>
      <p>Referência local: <b>${esc(lastOrder.id)}</b></p>
      ${lastOrder.items.map((i) => html`<p>${findProduct(i.id).team} · ${i.size} · ${i.qty} ${i.qty === 1 ? "unidade" : "unidades"}</p>`).join("")}
      <div class="summary-row total">
        <span>Total simulado</span><span>${money(lastOrder.total)}</span>
      </div>
      <p class="hint">
        Não enviamos e-mail de confirmação. Este resumo fica disponível apenas nesta aba.
      </p>
    </div>
    <div class="actions divider">
      <a class="btn" href="#catalogo">Continuar explorando</a
      ><a class="btn secondary" href="#ajuda">Ajuda e acessibilidade</a>
    </div>
  </section>`;
}
function access() {
  return html`<section class="narrow panel">
    <p class="eyebrow">Sua torcida tem lugar aqui</p>
    <h1>${profile ? "Seu perfil de demonstração" : "Boas-vindas à FieldKit"}</h1>
    ${
      profile
        ? html`<p>
              Olá, <b>${esc(profile)}</b>. Seu perfil é temporário e está disponível apenas nesta
              aba.
            </p>
            <div class="actions">
              <a class="btn" href="#catalogo">Explorar catálogo</a
              ><button class="btn secondary" data-action="logout">Sair do perfil</button>
            </div>`
        : html`<p class="muted">
              Crie um perfil temporário para explorar. Não há conta real nem senha.
            </p>
            <form id="access" novalidate>
              <div class="field">
                <label for="nickname">Como podemos chamar você?</label
                ><input
                  id="nickname"
                  name="nickname"
                  autocomplete="nickname"
                  maxlength="40"
                  required
                  aria-describedby="nickname-error"
                />
                <p class="field-error" id="nickname-error" role="alert"></p>
              </div>
              <button class="btn full" type="submit">Entrar na demonstração</button>
            </form>
            <div class="divider">
              <a class="btn secondary full" href="#catalogo">Continuar como visitante</a>
              <p class="hint">Você pode comprar no protótipo sem entrar.</p>
            </div>`
    }
  </section>`;
}
function help() {
  return html`${breadcrumbs("Ajuda e acessibilidade")}
    <div class="page-top">
      <p class="eyebrow">No seu ritmo</p>
      <h1>Uma loja para explorar com autonomia.</h1>
      <p class="muted">Orientações para navegar, escolher e testar a FieldKit.</p>
    </div>
    <div class="help-grid">
      <section class="panel">
        <h2>Navegar pelo teclado</h2>
        <p>
          Use Tab e Shift + Tab para avançar e voltar entre controles. Enter abre links; Enter ou
          Espaço aciona botões. Nas opções de tamanho, use as setas.
        </p>
        <p>
          O primeiro link permite pular para o conteúdo. Ao mudar de tela, o foco vai para o
          conteúdo principal.
        </p>
      </section>
      <section class="panel">
        <h2>Leitura e movimento</h2>
        <p>
          Amplie o texto pelo zoom do navegador (Ctrl + +). O layout se reorganiza em telas menores.
        </p>
        <p>
          A interface acompanha a preferência do sistema para reduzir animações. Estados têm texto e
          não dependem só da cor.
        </p>
      </section>
    </div>
    <section class="divider" aria-labelledby="faq">
      <h2 id="faq">Dúvidas frequentes</h2>
      <details>
        <summary>Como escolher o tamanho?</summary>
        <p>
          Abra uma camisa no catálogo, expanda “Guia de tamanhos” e compare as medidas com uma peça
          sua.
        </p>
      </details>
      <details>
        <summary>Como funciona o cupom e o frete?</summary>
        <p>
          Na sacola, aplique FIELDKIT15: 15% de desconto apenas em camisas titulares. O frete
          simulado é grátis para compras a partir de R$ 199,00 após desconto, ou R$ 19,90 abaixo
          disso.
        </p>
      </details>
      <details>
        <summary>Preciso de uma conta para comprar?</summary>
        <p>
          Não. É possível completar o fluxo como visitante. O perfil é uma demonstração sem
          autenticação.
        </p>
      </details>
      <details>
        <summary>Onde ficam os meus dados?</summary>
        <p>
          Sacola, favoritos e cupom ficam no armazenamento local deste navegador. Nome, endereço e
          perfil ficam apenas na memória da aba e desaparecem ao recarregar. Não há envio para
          servidores.
        </p>
        <button class="btn secondary" data-action="reset">Limpar dados da demonstração</button>
        <p class="hint">A ação esvazia a sacola e os favoritos e remove o perfil temporário.</p>
      </details>
      <details>
        <summary>Tradução em Libras</summary>
        <p>
          A tradução em Libras é carregada automaticamente e permanece disponível em todas as telas.
          Use o botão do VLibras no topo da página ou o controle lateral para abrir o tradutor. O
          serviço depende de internet e complementa a navegação por teclado e a leitura com
          tecnologias assistivas.
        </p>
      </details>
    </section>
    <section class="editorial">
      <div>
        <p class="eyebrow">Projeto de IHC</p>
        <h2>Decisões que podem ser avaliadas.</h2>
      </div>
      <div>
        <p>
          Consulte os tokens, a inspeção heurística, as correções realizadas e o roteiro de teste
          com participantes.
        </p>
        <a href="docs/DESIGN-SYSTEM.md">Mini design system</a><br /><a href="docs/AVALIACAO-IHC.md"
          >Avaliação e matriz de iteração</a
        ><br /><a href="docs/APRESENTACAO.md">Roteiro de apresentação</a>
      </div>
    </section>`;
}
const titles = {
  inicio: "Início",
  catalogo: "Catálogo",
  produto: "Detalhes da camisa",
  favoritos: "Favoritos",
  carrinho: "Sacola",
  entrega: "Entrega",
  revisao: "Revisão do pedido",
  confirmacao: "Pedido simulado",
  acesso: "Acesso",
  ajuda: "Ajuda e acessibilidade",
};
let previousHash = "";
function render(focus = true) {
  const [route = "inicio", param = ""] = (location.hash.slice(1) || "inicio").split("/");
  if (processing) return;
  if (["entrega", "revisao"].includes(route) && !state.cart.length) {
    go("carrinho");
    announce("Adicione uma camisa antes de continuar para a entrega.");
    return;
  }
  if (route === "revisao" && !delivery) {
    go("entrega");
    announce("Preencha os dados de entrega para revisar o pedido.");
    return;
  }
  if (route === "confirmacao" && !lastOrder) {
    go("inicio");
    return;
  }
  if (route === "catalogo" && param && previousHash !== location.hash) {
    try {
      const category = decodeURIComponent(param);
      if (["Titular", "Retrô", "Treino"].includes(category))
        filters = { q: "", team: "Todos", category, sort: "featured" };
    } catch {}
  }
  previousHash = location.hash;
  const views = {
    inicio: home,
    catalogo: catalog,
    favoritos: favorites,
    carrinho: cart,
    entrega: deliveryView,
    revisao: review,
    confirmacao: confirmation,
    acesso: access,
    ajuda: help,
  };
  main.innerHTML =
    route === "produto"
      ? findProduct(param)
        ? productView(findProduct(param))
        : empty("Camisa não encontrada", "Volte ao catálogo para escolher outra camisa.")
      : views[route]
        ? views[route]()
        : empty(
            "Página não encontrada",
            "Este endereço não faz parte do protótipo.",
            '<a class="btn" href="#inicio">Voltar ao início</a>',
          );
  document.title = (titles[route] || "Página não encontrada") + " · FieldKit";
  document.querySelectorAll("[data-nav]").forEach((a) => {
    if (a.dataset.nav === route || (route === "produto" && a.dataset.nav === "catalogo"))
      a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
  updateHeader();
  if (focus) {
    main.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "instant" });
  }
}
function showError(form, id, message) {
  const input = form.querySelector("#" + id);
  input.setAttribute("aria-invalid", "true");
  form.querySelector("#" + id + "-error").textContent = message;
}
function clearErrors(form) {
  form.querySelectorAll("[aria-invalid]").forEach((e) => e.removeAttribute("aria-invalid"));
  form.querySelectorAll(".field-error").forEach((e) => (e.textContent = ""));
}
function validateDelivery(data) {
  const errors = {};
  if (data.name.trim().length < 2) errors.name = "Informe um nome com pelo menos 2 caracteres.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Informe um e-mail no formato nome@exemplo.com.";
  if (!/^\d{5}-?\d{3}$/.test(data.cep))
    errors.cep = "Informe os 8 números do CEP, com ou sem hífen.";
  if (data.city.trim().length < 2) errors.city = "Informe a cidade de entrega.";
  if (data.street.trim().length < 3) errors.street = "Informe a rua e o número (ou s/n).";
  if (!data.uf) errors.uf = "Selecione um estado.";
  return errors;
}
main.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.target;
  const data = Object.fromEntries(new FormData(form));
  if (form.id === "filters") {
    filters = { ...filters, ...data };
    render();
    announce(`${filteredProducts().length} camisas encontradas. Filtros aplicados.`);
  }
  if (form.id === "add-product") {
    if (!sizes.includes(data.size)) {
      form.querySelector("#size-error").textContent =
        "Escolha um tamanho antes de adicionar a camisa.";
      form.querySelectorAll("input").forEach((e) => e.setAttribute("aria-invalid", "true"));
      form.querySelector("input").focus();
      return;
    }
    const id = form.dataset.id;
    const existing = state.cart.find((i) => i.id === id && i.size === data.size);
    if (existing?.qty === 10) {
      announce("Limite de 10 unidades deste tamanho na sacola.");
      return;
    }
    if (existing) existing.qty++;
    else state.cart.push({ id, size: data.size, qty: 1 });
    save();
    go("carrinho");
    announce(`${findProduct(id).team}, tamanho ${data.size}, adicionada à sacola.`);
  }
  if (form.id === "coupon") {
    const code = data.coupon.trim().toUpperCase();
    const input = form.querySelector("input");
    const error =
      code !== "FIELDKIT15"
        ? "Cupom não reconhecido. Use FIELDKIT15."
        : !state.cart.some((i) => findProduct(i.id).category === "Titular")
          ? "Esse cupom vale para camisas titulares. Adicione uma camisa titular para usá-lo."
          : "";
    if (error) {
      input.setAttribute("aria-invalid", "true");
      form.querySelector("#coupon-error").textContent = error;
      input.focus();
      return;
    }
    state.coupon = code;
    save();
    render();
    announce("Cupom aplicado: 15% de desconto nas camisas titulares.");
  }
  if (form.id === "delivery") {
    clearErrors(form);
    const errors = validateDelivery(data);
    const summary = form.querySelector("#form-errors");
    if (Object.keys(errors).length) {
      Object.entries(errors).forEach(([id, message]) => showError(form, id, message));
      summary.innerHTML =
        "<b>Revise os campos abaixo:</b><ul>" +
        Object.entries(errors)
          .map(
            ([id, message]) =>
              html`<li><a href="#${id}" data-error-link="${id}">${message}</a></li>`,
          )
          .join("") +
        "</ul>";
      summary.focus();
      return;
    }
    delivery = data;
    go("revisao");
    announce("Entrega preenchida. Revise o pedido antes de confirmar.");
  }
  if (form.id === "access") {
    if (data.nickname.trim().length < 2) {
      showError(form, "nickname", "Digite pelo menos 2 caracteres para continuar.");
      form.querySelector("input").focus();
      return;
    }
    profile = data.nickname.trim().slice(0, 40);
    go("inicio");
    announce(`Boas-vindas, ${profile}. Perfil de demonstração ativado.`);
  }
});
main.addEventListener("input", (event) => {
  if (event.target.name === "size") {
    main
      .querySelectorAll('[name="size"]')
      .forEach((input) => input.removeAttribute("aria-invalid"));
    document.getElementById("size-error").textContent = "";
  } else if (event.target.hasAttribute("aria-invalid")) {
    event.target.removeAttribute("aria-invalid");
    const error = document.getElementById(event.target.id + "-error");
    if (error) error.textContent = "";
  }
});
document.addEventListener("click", async (event) => {
  const errorLink = event.target.closest("[data-error-link]");
  if (errorLink) {
    event.preventDefault();
    document.getElementById(errorLink.dataset.errorLink).focus();
    return;
  }
  const button = event.target.closest("[data-action]");
  if (!button) return;
  const { action, id } = button.dataset;
  if (action === "favorite") {
    const on = state.favorites.includes(id);
    state.favorites = on ? state.favorites.filter((v) => v !== id) : [...state.favorites, id];
    save();
    if (location.hash === "#favoritos" && on) {
      render();
    } else {
      button.setAttribute("aria-pressed", String(!on));
      button.setAttribute(
        "aria-label",
        `${on ? "Adicionar" : "Remover"} ${findProduct(id).team} ${findProduct(id).category} ${on ? "aos" : "dos"} favoritos`,
      );
      button.querySelector("span").textContent = on ? "♡" : "♥";
    }
    announce(`${findProduct(id).team} ${on ? "removida dos" : "adicionada aos"} favoritos.`);
  }
  if (action === "clear-filters") {
    filters = { q: "", team: "Todos", category: "Todas", sort: "featured" };
    if (location.hash.includes("/")) go("catalogo");
    else render();
    announce("Filtros limpos. Todas as camisas estão disponíveis.");
  }
  if (action === "quantity") {
    const i = state.cart[Number(button.dataset.index)];
    if (!i) return;
    const qty = i.qty + Number(button.dataset.delta);
    if (qty < 1 || qty > 10) {
      announce(
        qty < 1
          ? "Quantidade mínima: 1. Use Remover para retirar a camisa."
          : "Limite de 10 unidades por tamanho.",
      );
      return;
    }
    i.qty = qty;
    save();
    const index = button.dataset.index,
      delta = button.dataset.delta;
    render(false);
    main
      .querySelector(`[data-action="quantity"][data-index="${index}"][data-delta="${delta}"]`)
      .focus();
    announce(`Quantidade atualizada para ${qty}. Total: ${money(totals().total)}.`);
  }
  if (action === "remove") {
    undoItem = state.cart.splice(Number(button.dataset.index), 1)[0];
    save();
    render();
    announce("Camisa removida. Você pode desfazer a remoção.");
  }
  if (action === "undo" && undoItem) {
    const existing = state.cart.find((i) => i.id === undoItem.id && i.size === undoItem.size);
    if (existing) existing.qty = Math.min(10, existing.qty + undoItem.qty);
    else state.cart.push(undoItem);
    undoItem = null;
    save();
    render();
    announce("Camisa restaurada na sacola.");
  }
  if (action === "remove-coupon") {
    state.coupon = "";
    save();
    render();
    announce("Cupom removido. Total atualizado.");
  }
  if (action === "logout") {
    profile = "";
    updateHeader();
    render();
    announce("Você saiu do perfil de demonstração.");
  }
  if (action === "reset") {
    state.cart = [];
    state.favorites = [];
    state.coupon = "";
    delivery = null;
    profile = "";
    lastOrder = null;
    undoItem = null;
    save();
    render();
    announce("Dados da demonstração limpos neste navegador.");
  }
  if (action === "confirm" && !processing) {
    processing = true;
    button.disabled = true;
    button.innerHTML = '<span class="spinner" aria-hidden="true"></span> Concluindo simulação…';
    main.setAttribute("aria-busy", "true");
    announce("Concluindo pedido simulado. Aguarde.");
    await new Promise((resolve) => setTimeout(resolve, 850));
    lastOrder = {
      id: "FK-" + Date.now().toString(36).toUpperCase(),
      items: state.cart.map((i) => ({ ...i })),
      ...totals(),
    };
    state.cart = [];
    state.coupon = "";
    undoItem = null;
    delivery = null;
    save();
    processing = false;
    main.removeAttribute("aria-busy");
    go("confirmacao");
    announce("Pedido simulado concluído com sucesso. Nenhuma cobrança realizada.");
  }
  if (action === "libras") loadLibras(true);
});
let librasPromise = null;
let librasReady = false;
function loadLibras(openWhenReady = false) {
  const button = document.querySelector("#libras-button");
  const message = document.querySelector("#libras-status");
  function openWidget() {
    const control = window.VLibrasWidget?.initBtn || document.querySelector("[vw-access-button]");
    if (control) {
      control.click();
      control.focus();
    } else message.textContent = "O VLibras está iniciando. Aguarde e tente abrir novamente.";
  }
  if (librasReady) {
    if (openWhenReady) openWidget();
    return;
  }
  if (librasPromise) return;
  button.disabled = true;
  button.setAttribute("aria-busy", "true");
  message.textContent = "Carregando tradução em Libras…";
  librasPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://vlibras.gov.br/app/vlibras-plugin.js";
    script.async = true;
    let settled = false;
    const timer = setTimeout(fail, 15000);
    function fail() {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      script.remove();
      reject(new Error("Falha de carregamento do VLibras"));
    }
    script.onerror = fail;
    script.onload = () => {
      if (settled) return;
      try {
        if (!window.VLibrasWidget && window.VLibras?.Widget) {
          const wrapper = document.createElement("div");
          wrapper.setAttribute("vw", "");
          wrapper.className = "enabled";
          wrapper.innerHTML =
            '<div vw-access-button class="active" role="button" tabindex="0" aria-label="Abrir tradução em Libras"></div><div vw-plugin-wrapper><div class="vw-plugin-top-wrapper"></div></div>';
          document.body.append(wrapper);
          new window.VLibras.Widget("https://vlibras.gov.br/app");
          const control = wrapper.querySelector("[vw-access-button]");
          control.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              control.click();
            }
          });
        } else if (!window.VLibrasWidget) {
          fail();
          return;
        }
        settled = true;
        clearTimeout(timer);
        resolve();
      } catch {
        fail();
      }
    };
    document.body.append(script);
  });
  librasPromise
    .then(() => {
      librasReady = true;
      button.disabled = false;
      button.removeAttribute("aria-busy");
      button.textContent = "Abrir VLibras";
      message.textContent = "Tradução em Libras disponível em todas as telas.";
      if (openWhenReady) openWidget();
    })
    .catch(() => {
      librasPromise = null;
      button.disabled = false;
      button.removeAttribute("aria-busy");
      button.textContent = "Tentar carregar VLibras";
      message.textContent =
        "VLibras indisponível. Verifique a conexão e tente novamente. A navegação do site continua disponível.";
    });
}
document.querySelector(".skip-link").addEventListener("click", (event) => {
  event.preventDefault();
  main.focus();
  main.scrollIntoView({ block: "start" });
});
window.addEventListener("hashchange", () => render());
render(false);
if (!storageAvailable)
  announce(
    "O armazenamento local está indisponível. Suas escolhas funcionarão apenas nesta sessão.",
  );
loadLibras();
