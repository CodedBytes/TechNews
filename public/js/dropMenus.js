// Funções para ativar os popups.
function loginMenu() { document.getElementById("login-wind").classList.toggle("show"); }
function PassAdvice() { document.getElementById("passADV-wind").classList.toggle("showADV"); }
function UserAdvice() { document.getElementById("userADV-wind").classList.toggle("showADV"); }
function PerfilMenu() { document.getElementById("perfil-wind").classList.toggle("showPerf"); }

// Evento que olha pelo click.
window.onclick = function(event) {
  if (!event.target.matches('#loginBtn'))
  {
    var dropdowns = document.getElementsByClassName("dd-content");// Pega a window.
    for (var i = 0; i < dropdowns.length; i++)
    {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show'))
      {
        if(event.target.matches('#inside') || event.target.matches('#login') || event.target.matches('#senha'))
        {
          openDropdown.classList.add('show');
        } else { openDropdown.classList.remove('show'); }
      }
    }
  }

  // Aviso do login.
  if (!event.target.matches('#senhaa'))
  {
    var dropdowns = document.getElementsByClassName("password-info");
    for (var i = 0; i < dropdowns.length; i++)
    {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('showADV')) { openDropdown.classList.remove('showADV'); }
    }
  }

  // Aviso do campo usuario.
  if (!event.target.matches('#usuario'))
  {
    var dropdowns = document.getElementsByClassName("user-info");
    for (var i = 0; i < dropdowns.length; i++)
    {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('showADV')) { openDropdown.classList.remove('showADV'); }
    }
  }

  // perfil advice
  if (!event.target.matches('#perfilBtn'))
  {
    var dropdowns = document.getElementsByClassName("perfil-info");
    var i;
    for (var i = 0; i < dropdowns.length; i++)
    {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('showPerf')) { openDropdown.classList.remove('showPerf'); }
    }
  }
}