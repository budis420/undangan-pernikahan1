// Fungsi salin nomor rekening
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert("Nomor rekening berhasil disalin: " + text);
  }).catch(err => {
    alert("Gagal menyalin teks");
  });
}

// Fungsi ambil parameter dari URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Tampilkan nama tamu jika ada di URL
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

  // Play musik saat user pertama kali klik/tap
  function startMusic() {
    if (audio.paused) {
      audio.muted = false;
      audio.play().catch(() => {});
    }

    if (tapHint) tapHint.style.display = "none";
    document.removeEventListener("click", startMusic);
  }

  document.addEventListener("click", startMusic);
});

// Toggle play/pause musik via ikon
function toggleMusic() {
  const audio = document.getElementById("bg-music");
  const tapHint = document.getElementById("tap-to-play");

  if (audio.paused) {
    audio.muted = false;
    audio.play().catch(() => {});
    if (tapHint) tapHint.style.display = "none";
  } else {
    audio.pause();
  }
}