// WhatsApp da equipe: cada botão leva a mensagem pronta do seu data-msg
var WHATSAPP = "5562998337198";
// Nos botões de contato, a cidade escolhida no seletor entra na mensagem
var cidade = document.getElementById("cidade");
function montarLinks() {
  document.querySelectorAll("[data-msg]").forEach(function (a) {
    var msg = a.dataset.msg;
    if (cidade && a.closest(".opcoes")) msg += " Cidade de atendimento: " + cidade.value + ".";
    a.href = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(msg);
    a.target = "_blank"; a.rel = "noopener";
  });
}
montarLinks();
if (cidade) cidade.addEventListener("change", montarLinks);

// Menu do celular
var botao = document.querySelector(".menu"), nav = document.getElementById("nav");
botao.addEventListener("click", function () {
  var aberto = nav.classList.toggle("aberto");
  botao.setAttribute("aria-expanded", aberto);
});
nav.addEventListener("click", function (e) {
  if (e.target.closest("a")) { nav.classList.remove("aberto"); botao.setAttribute("aria-expanded", false); }
});

// Surgimento suave ao rolar
document.documentElement.classList.add("js");
var io = new IntersectionObserver(function (es) {
  es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
}, { rootMargin: "0px 0px -8% 0px" });
document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
