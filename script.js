// Fungsi salin nomor rekening
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert("Nomor rekening berhasil disalin: " + text);
  }).catch(() => {
    alert("Gagal menyalin teks");
  });
}

// Fungsi ambil parameter dari URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Toggle musik play/pause via ikon
function toggleMusic() {
  const audio = document.getElementById("bg-music");
  const tapHint = document.getElementById("tap-to-play");
  const musicIcon = document.getElementById("music-icon");

  if (audio.paused) {
    audio.muted = false;
    audio.play().then(() => {
      tapHint.style.display = "none";
      musicIcon.classList.add("playing");
    }).catch(() => {
      console.log("Gagal memutar musik");
    });
  } else {
    audio.pause();
    musicIcon.classList.remove("playing");
    tapHint.style.display = "block";
  }
}

// DOM Loaded
document.addEventListener("DOMContentLoaded", () => {
  const namaTamu = getQueryParam("to");
  if (namaTamu) {
    const salam = document.getElementById("salam-tamu");
    if (salam) {
      salam.innerText = `Yth. Bapak/Ibu/Saudara/i ${decodeURIComponent(namaTamu)}`;
    }
  }

  const audio = document.getElementById("bg-music");
  const tapHint = document.getElementById("tap-to-play");
  const musicIcon = document.getElementById("music-icon");

  // Satu kali klik pertama di mana saja memutar musik
  function startMusicOnce() {
    if (audio && audio.paused) {
      audio.muted = false;
      audio.play().then(() => {
        if (tapHint) tapHint.style.display = "none";
        if (musicIcon) musicIcon.classList.add("playing");
      }).catch(() => {
        console.log("Autoplay diblokir, harus klik ikon musik.");
      });
    }
    document.removeEventListener("click", startMusicOnce);
  }

  document.addEventListener("click", startMusicOnce);
});
