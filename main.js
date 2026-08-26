// ----------------- CONFIGURACIÓN DE SEGURIDAD -----------------
const PIN_CORRECTO = "5703";

function verificarEstadoBloqueo() {
  const lockScreen = document.getElementById("lock-overlay");
  if (!lockScreen) return;

  // Si ya se ingresó el PIN anteriormente, quitamos el escudo invisible
  if (localStorage.getItem("pinAccesoAutorizado") === "true") {
    desbloquearPantalla();
  }

  // Evento: Al hacer clic en la capa invisible, pedir PIN
  lockScreen.addEventListener("click", () => {
    solicitarPin();
  });
}

function solicitarPin() {
  setTimeout(() => {
    const pinIngresado = prompt("🔒 STAND PROTEGIDO\nPor favor, introduce el PIN de acceso:");

    if (pinIngresado === PIN_CORRECTO) {
      localStorage.setItem("pinAccesoAutorizado", "true");
      desbloquearPantalla();
    } else if (pinIngresado !== null) {
      alert("❌ PIN incorrecto.");
    }
  }, 100);
}

function desbloquearPantalla() {
  const lockScreen = document.getElementById("lock-overlay");
  if (lockScreen) {
    lockScreen.remove(); 
  }
}

document.addEventListener("DOMContentLoaded", verificarEstadoBloqueo);

// ----------------- SEGURIDAD EXTRA -----------------

document.addEventListener("contextmenu", (e) => e.preventDefault());

function ctrlShiftKey(e, keyCode) {
  return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
}

document.onkeydown = (e) => {
  if (
    event.keyCode === 123 ||
    ctrlShiftKey(e, "I") ||
    ctrlShiftKey(e, "J") ||
    ctrlShiftKey(e, "C") ||
    (e.ctrlKey && e.keyCode === "U".charCodeAt(0))
  )
    return false;
};

// ----------------- MENÚ RESPONSIVE -----------------

const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show");
    });
  }
};

showMenu("nav-toggle", "nav-menu");

// ----------------- CHAT D-ID -----------------

class DIDChat {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.chatUrl =
      "https://studio.d-id.com/agents/share?id=v2_agt_cOb19ovG&utm_source=copy&key=Y2tfSXBTN19iWDRTR1Y5dEk2QUFCUy1Y";
    this.iframe = null;
    this.init();
  }

  init() {
    this.createIframe();
    this.setupWatchdog();
  }

  createIframe() {
    if (this.container.querySelector('.iframe-wrapper')) return;

    const wrapper = document.createElement("div");
    wrapper.className = "iframe-wrapper";
    this.iframe = document.createElement("iframe");
    this.iframe.className = "did-chat-iframe fade-in";
    this.iframe.src = this.chatUrl;
    this.iframe.allow = "microphone *; camera *; autoplay *; encrypted-media *; fullscreen *; display-capture *;";
    this.iframe.title = "D-ID Chat Interface";

    wrapper.appendChild(this.iframe);
    this.container.appendChild(wrapper);
  }

  reloadIframe() {
    if (this.iframe) {
      this.iframe.src = '';
      setTimeout(() => { this.iframe.src = this.chatUrl; }, 500);
    }
  }

  setupWatchdog() {
    // Si el iframe no carga en 20 segundos, lo recarga
    const loadTimer = setTimeout(() => this.reloadIframe(), 20000);
    this.iframe.addEventListener("load", () => clearTimeout(loadTimer), { once: true });

    // Recarga el iframe cada 9 minutos para evitar que D-ID apague el stream
    setInterval(() => this.reloadIframe(), 9 * 60 * 1000);

    // Si la pantalla estuvo oculta más de 2 minutos, recarga al volver
    let hiddenAt = null;
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        hiddenAt = Date.now();
      } else if (hiddenAt && Date.now() - hiddenAt > 2 * 60 * 1000) {
        this.reloadIframe();
        hiddenAt = null;
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const chat = new DIDChat("chat-container");

  const bgVideo = document.getElementById('bg-video');
  if (bgVideo) {
    bgVideo.addEventListener('pause', () => bgVideo.play().catch(() => {}));
  }
});

// ----------------- GSAP ANIMACIONES -----------------

gsap.to(".first", 1.5, {
  delay: 0.5,
  top: "-100%",
  ease: Expo.easeInOut,
});

gsap.to(".second", 1.5, {
  delay: 0.7,
  top: "-100%",
  ease: Expo.easeInOut,
});

gsap.to(".third", 1.5, {
  delay: 0.9,
  top: "-100%",
  ease: Expo.easeInOut,
});

gsap.from(".home-img", { opacity: 0, duration: 2, delay: 2, x: 60 });

gsap.from(".home-information", {
  opacity: 0,
  duration: 3,
  delay: 2.3,
  y: 25,
});

gsap.from(".anime-text", {
  opacity: 0,
  duration: 3,
  delay: 2.3,
  y: 25,
  ease: "expo.out",
  stagger: 0.3,
});

gsap.from(".nav-logo", {
  opacity: 0,
  duration: 3,
  delay: 3.2,
  y: 25,
  ease: "expo.out",
});

gsap.from(".nav-item", {
  opacity: 0,
  duration: 3,
  delay: 3.2,
  y: 25,
  ease: "expo.out",
  stagger: 0.2,
});

gsap.from(".home-social", {
  opacity: 0,
  duration: 3,
  delay: 4,
  y: 25,
  ease: "expo.out",
  stagger: 0.2,
});

// ----------------- OVERLAY: BOTONES CONVERSAR / FOTO -----------------

document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('interaction-overlay');
    const btnShowAvatar = document.getElementById('btn-show-avatar');
    const btnPlayVideo = document.getElementById('btn-play-video');
    const videoElement = document.getElementById('playback-video');

    if (!overlay || !btnShowAvatar || !btnPlayVideo || !videoElement) return;

    const VIDEO_URL = "https://www.dropbox.com/scl/fi/bu8cpm09slawb896ypch4/Gema-Fotos.mp4?rlkey=04nzxdp24l67l3miiufckcpsq&st=7d0c5mrt&dl=0&raw=1";
    const SECRET_VIDEO_URL = "https://www.dropbox.com/scl/fi/3t522av1nzuj1o8lyic6b/f85c6ddb984de7b73cc23500f356a62e_1.mp4?rlkey=ea7zosc8ynkxygszcurls1mvt&st=5p4tkds6&dl=0&raw=1";

    videoElement.src = VIDEO_URL;
    let secretVideoActive = false;

    function hideOverlay() {
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';
        overlay.style.backdropFilter = 'none';
        overlay.style.webkitBackdropFilter = 'none';
        setTimeout(() => { overlay.style.display = 'none'; }, 600);
    }

    function showOverlay() {
        videoElement.pause(); videoElement.currentTime = 0;
        videoElement.classList.add('video-hidden');
        if (secretVideoActive) {
            secretVideoActive = false;
            videoElement.src = VIDEO_URL;
        }
        overlay.style.display = '';
        overlay.style.backdropFilter = '';
        overlay.style.webkitBackdropFilter = '';
        overlay.style.pointerEvents = '';
        requestAnimationFrame(() => { overlay.style.opacity = ''; });
    }

    videoElement.addEventListener('ended', showOverlay);

    btnShowAvatar.addEventListener('click', hideOverlay);

    btnPlayVideo.addEventListener('click', () => {
        videoElement.src = VIDEO_URL;
        hideOverlay();
        videoElement.classList.remove('video-hidden');
        setTimeout(() => { videoElement.play().catch(e => console.warn("Autoplay bloqueado:", e)); }, 300);
    });

    // --- Botón secreto: triple clic en la imagen del avatar ---
    const avatarImg = document.querySelector('.overlay-avatar-img');
    if (avatarImg) {
        let clickCount = 0;
        let clickTimer = null;

        avatarImg.addEventListener('click', (e) => {
            e.stopPropagation();
            clickCount++;
            if (clickCount === 1) {
                clickTimer = setTimeout(() => { clickCount = 0; }, 800);
            }
            if (clickCount >= 3) {
                clearTimeout(clickTimer);
                clickCount = 0;
                secretVideoActive = true;
                videoElement.src = SECRET_VIDEO_URL;
                hideOverlay();
                videoElement.classList.remove('video-hidden');
                setTimeout(() => { videoElement.play().catch(err => console.warn("Autoplay bloqueado:", err)); }, 300);
            }
        });
    }
});

// ----------------- REFRESCO AUTOMÁTICO -----------------

function iniciarRefresco() {
  let refreshTimeout;
  let cancelRefresh = false;

  let message = document.getElementById('refresh-message');
  if (!message) {
    message = document.createElement('div');
    message.id = 'refresh-message';
    message.innerText = '¿Sigues ahí? Refrescando en 5s...';
    message.style.position = 'fixed';
    message.style.top = '50%';
    message.style.left = '50%';
    message.style.transform = 'translate(-50%, -50%)';
    message.style.backgroundColor = 'rgba(0,0,0,0.9)';
    message.style.color = '#fff';
    message.style.padding = '30px 50px';
    message.style.borderRadius = '15px';
    message.style.fontSize = '20px';
    message.style.zIndex = '9999';
    message.style.display = 'none';
    message.style.boxShadow = '0 0 20px rgba(255,255,255,0.2)';
    document.body.appendChild(message);
  }

  function startRefreshSequence() {
    cancelRefresh = false;
    message.style.display = 'block';

    function cancelAction() {
      cancelRefresh = true;
      message.style.display = 'none';
      clearTimeout(refreshTimeout);
      document.removeEventListener('click', cancelAction);
      document.removeEventListener('touchstart', cancelAction);
      setTimeout(startRefreshSequence, 5 * 60 * 1000);
    }

    document.addEventListener('click', cancelAction);
    document.addEventListener('touchstart', cancelAction);

    refreshTimeout = setTimeout(() => {
      if (!cancelRefresh) {
        location.reload();
      }
    }, 5000);
  }

  setTimeout(startRefreshSequence, 5 * 60 * 1000);
}

iniciarRefresco();

// ----------------- CONTROL DE BOTONES (LOGICA MODIFICADA) -----------------

document.addEventListener("DOMContentLoaded", () => {
  const refreshBtn = document.getElementById("refresh-btn");
  const lockBtn = document.getElementById("lock-btn");

  // BOTÓN DE CANDADO (Siempre bloquea y recarga)
  if (lockBtn) {
    lockBtn.addEventListener("click", () => {
      localStorage.removeItem("pinAccesoAutorizado");
      location.reload();
    });
  }

  // BOTÓN DE REFRESCO (Lógica condicional)
  if (refreshBtn) {
    refreshBtn.addEventListener("click", () => {
      // Guardamos la respuesta del usuario en una variable
      // true = Aceptar, false = Cancelar
      const cerrarSesion = confirm("¿Deseas limpiar caché y recargar? Esto también bloqueará la sesión.\n\n[ACEPTAR] = Bloquear y Recargar\n[CANCELAR] = Solo Recargar (Mantener sesión)");

      if (cerrarSesion) {
        // Opción ACEPTAR: Limpiamos storage (se pierde el PIN guardado)
        localStorage.clear();
        sessionStorage.clear();
      } 
      // Si el usuario da CANCELAR, saltamos el bloque 'if' anterior
      // y pasamos directamente a la recarga, manteniendo el storage intacto.

      // Recarga forzada (Cache Buster)
      const url = new URL(window.location.href);
      url.searchParams.set("r", Date.now().toString()); 
      window.location.href = url.toString(); 
    });
  }
});

