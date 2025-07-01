function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert("Nomor rekening berhasil disalin: " + text);
  }).catch(() => {
    alert("Gagal menyalin teks");
  });
}

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

function toggleMusic() {
  const audio = document.getElementById("bg-music");
  const icon = document.getElementById("music-icon");
  const tapHint = document.getElementById("tap-to-play");

  if (audio.paused) {
    audio.play().then(() => {
      icon.classList.add("playing");
      tapHint.style.display = "none";
    }).catch((err) => {
      console.error("Gagal memutar musik:", err);
    });
  } else {
    audio.pause();
    icon.classList.remove("playing");
    tapHint.style.display = "block";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const namaTamu = getQueryParam("to");
  const salam = document.getElementById("salam-tamu");
  if (namaTamu && salam) {
    salam.innerText = `Yth. Bapak/Ibu/Saudara/i ${decodeURIComponent(namaTamu)}`;
  }

  // Jangan autoplay apapun, user harus klik ikon
  const audio = document.getElementById("bg-music");
  const icon = document.getElementById("music-icon");
  const tapHint = document.getElementById("tap-to-play");

  // Biar tombol play juga bisa dari klik pertama (untuk pengguna awam yang tap layar)
  function allowPlay() {
    if (audio.paused) {
      audio.play().then(() => {
        icon.classList.add("playing");
        tapHint.style.display = "none";
      }).catch(() => {
        console.log("User perlu klik ikon untuk memutar");
      });
    }
    document.removeEventListener("click", allowPlay);
  }

  document.addEventListener("click", allowPlay);
});