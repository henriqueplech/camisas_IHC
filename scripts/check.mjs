import { readFileSync } from "node:fs";
import vm from "node:vm";
import assert from "node:assert/strict";
const source = readFileSync(new URL("../app.js", import.meta.url), "utf8");
function context(saved = "{}") {
  const elements = new Map();
  const element = () => ({
    innerHTML: "",
    textContent: "",
    dataset: {},
    setAttribute() {},
    removeAttribute() {},
    addEventListener() {},
    focus() {},
  });
  const document = {
    title: "",
    addEventListener() {},
    createElement: element,
    body: { append() {} },
    querySelector(s) {
      if (!elements.has(s)) elements.set(s, element());
      return elements.get(s);
    },
    querySelectorAll() {
      return [];
    },
  };
  const ctx = vm.createContext({
    document,
    localStorage: { getItem: () => saved, setItem() {} },
    location: { hash: "#inicio" },
    window: { addEventListener() {}, scrollTo() {} },
    setTimeout: () => 0,
    clearTimeout() {},
    console,
  });
  vm.runInContext(source, ctx);
  return ctx;
}
let checks = 0;
const test = (name, fn) => {
  fn();
  checks++;
  console.log("OK · " + name);
};
const ctx = context();
const run = (s) => vm.runInContext(s, ctx);
test("As 10 telas renderizam um título principal e conteúdo", () => {
  run(
    "state.cart=[{id:'palmeiras',size:'M',qty:1}];delivery={name:'Pessoa Teste',email:'teste@example.com',cep:'50000000',city:'Recife',street:'Rua Exemplo, 10',uf:'PE'};lastOrder={id:'FK-TESTE',items:[{id:'palmeiras',size:'M',qty:1}],total:31990}",
  );
  for (const route of [
    "inicio",
    "catalogo",
    "produto/palmeiras",
    "favoritos",
    "carrinho",
    "entrega",
    "revisao",
    "confirmacao",
    "acesso",
    "ajuda",
  ]) {
    run(`location.hash='#${route}';render(false)`);
    const html = run("main.innerHTML");
    assert.equal((html.match(/<h1[ >]/g) || []).length, 1, route);
    assert.ok(html.length > 300, route);
    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
    assert.equal(new Set(ids).size, ids.length, "IDs duplicados: " + route);
  }
});
test("Busca ignora acentos; time e coleção se combinam", () => {
  run("filters={q:'retro',team:'Vasco',category:'Retrô',sort:'featured'}");
  assert.equal(run("filteredProducts().length"), 1);
  run("filters.team='Palmeiras'");
  assert.equal(run("filteredProducts().length"), 0);
});
test("Ordenação de preço e estado vazio", () => {
  run("filters={q:'',team:'Todos',category:'Todas',sort:'price-asc'}");
  assert.equal(run("filteredProducts()[0].id"), "corinthians");
  run("filters.q='inexistente'");
  assert.match(run("catalog()"), /Nenhuma camisa encontrada/);
});
test("Cupom de 15% afeta somente titulares, com arredondamento em centavos", () => {
  run(
    "state.cart=[{id:'palmeiras',size:'M',qty:1},{id:'vasco',size:'G',qty:2}];state.coupon='FIELDKIT15'",
  );
  assert.equal(run("totals().subtotal"), 81970);
  assert.equal(run("totals().discount"), 4799);
  assert.equal(run("totals().total"), 77171);
});
test("Frete abaixo do limite e sacola vazia", () => {
  run("state.cart=[{id:'corinthians',size:'P',qty:1}];state.coupon=''");
  assert.equal(run("totals().shipping"), 1990);
  assert.equal(run("totals().total"), 19980);
  run("state.cart=[]");
  assert.equal(run("totals().total"), 0);
});
test("Validação de entrega detecta todos os campos inválidos e aceita dados completos", () => {
  assert.equal(
    run(
      "Object.keys(validateDelivery({name:'',email:'x',cep:'1',city:'',street:'',uf:''})).length",
    ),
    6,
  );
  assert.equal(
    run(
      "Object.keys(validateDelivery({name:'Teste',email:'teste@example.com',cep:'50000-000',city:'Recife',street:'Rua Exemplo, 10',uf:'PE'})).length",
    ),
    0,
  );
});
test("Rotas protegem revisão e compra sem produtos", () => {
  run("location.hash='#revisao';render(false)");
  assert.equal(run("location.hash"), "carrinho");
  run(
    "state.cart=[{id:'vasco',size:'M',qty:1}];delivery=null;location.hash='#revisao';render(false)",
  );
  assert.equal(run("location.hash"), "entrega");
});
test("Dados persistidos inválidos são descartados; JSON corrompido não interrompe a loja", () => {
  const dirty = context(
    JSON.stringify({
      cart: [
        { id: "fake", size: "M", qty: 1 },
        { id: "vasco", size: "X", qty: 1 },
        { id: "vasco", size: "M", qty: -2 },
        { id: "vasco", size: "M", qty: 2 },
      ],
      favorites: ["fake", "vasco"],
    }),
  );
  assert.equal(vm.runInContext("state.cart.length", dirty), 1);
  assert.equal(vm.runInContext("state.favorites.length", dirty), 1);
  assert.equal(vm.runInContext("state.cart.length", context("{broken")), 0);
});
test("Interpolação de texto escapa HTML", () =>
  assert.equal(run("esc('<script>\"&')"), "&lt;script&gt;&quot;&amp;"));
const css = readFileSync(new URL("../style.css", import.meta.url), "utf8");
const tokens = Object.fromEntries(
  [...css.matchAll(/--([a-z-]+):\s*(#\w{6})/g)].map((m) => [m[1], m[2]]),
);
function luminance(hex) {
  return hex
    .slice(1)
    .match(/../g)
    .map((c) => parseInt(c, 16) / 255)
    .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
    .reduce((s, v, i) => s + v * [0.2126, 0.7152, 0.0722][i], 0);
}
function contrast(a, b) {
  const l = [luminance(a), luminance(b)].sort((a, b) => b - a);
  return (l[0] + 0.05) / (l[1] + 0.05);
}
console.log("\nContrastes de texto:");
for (const [fg, bg] of [
  ["ink", "white"],
  ["muted", "white"],
  ["muted", "surface"],
  ["white", "blue"],
  ["white", "blue-hover"],
  ["blue", "surface"],
  ["ink", "gold"],
  ["error", "white"],
  ["success", "white"],
  ["white", "ink"],
  ["white", "muted"],
]) {
  const ratio = contrast(tokens[fg], tokens[bg]);
  assert.ok(ratio >= 4.5, `${fg}/${bg}: ${ratio}`);
  console.log(`${fg} / ${bg}: ${ratio.toFixed(2)}:1`);
}
console.log(`\n${checks} grupos de verificações passaram; todos os pares de texto acima ≥ 4,5:1.`);
