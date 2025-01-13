
async function githubRepos() {
  const response = await fetch('https://api.github.com/users/Alfredo-Aristizabal', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
      },
  });

  // Convertir la respuesta a JSON
  const data = await response.json();

  // Retornar el número de repositorios públicos
  return data.public_repos;
}

 async function githubCommits() {
  const response = await fetch('https://api.github.com/search/commits?q=author:Alfredo-Aristizabal', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
          'Accept': 'application/vnd.github.cloak-preview+json', // Necesario para trabajar con `commits`
      },
  });

  // Convertir la respuesta a JSON
  const data = await response.json();

  // Retornar el conteo total de commits
  return data.total_count;
}
// Llamada a la función y manejo del resultado
const reposElm = document.getElementById("repos")
const commitsElm = document.getElementById("commits")

document.getElementById("hamburger-btn").addEventListener("click", function() {
  if (menu.style.left === "0%") {
    menu.style.left = "-100%"; // Oculta el menú
  } else {
    menu.style.left = "0%"; // Muestra el menú
  }
});
document.getElementById("menu").addEventListener("click", function() {
  if (menu.style.left === "0%") {
    menu.style.left = "-100%"; // Oculta el menú
  } else {
    menu.style.left = "0%"; // Muestra el menú
  }
});

githubRepos()
  .then(repos => reposElm.textContent = repos )
  .catch(error => console.error('Error al obtener datos:', error));




  
  // Llamada a la función y manejo del resultado
  githubCommits()
    .then(commits => commitsElm.textContent = commits)
    .catch(error => console.error('Error al obtener datos:', error));
  
  
//header
let lastScroll = 0;
const navbar = document.getElementById('nav');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > lastScroll) {
    navbar.style.top = "0px";
  } else {
    navbar.style.top = "-80px"; 
  }

  lastScroll = currentScroll <= 0 ? 0 : currentScroll; 
});


(function () {
  emailjs.init("rU58cMeDx6uvBWKap");
})();

document.getElementById("contactForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  let message = document.getElementById("message").value + "\n from email: "  + email;
  

  if (!name || !email || !message) {
    alert("Por favor completa todos los campos.");
    return;
  }

  emailjs.send("service_a2z9a6t", "template_0fbs0nr", {
    from_name: name,
    from_email: email,
    message: message,
  })
    .then(() => {
      alert("Mensaje enviado correctamente. ¡Gracias por contactarme!");
      document.getElementById("contactForm").reset();
    })
    .catch((error) => {
      console.error("Error al enviar el mensaje:", error);
      alert("Hubo un error al enviar tu mensaje. Por favor intenta nuevamente.");
    });
});
