// Pega os valores
let senha = document.getElementById('senhaa');
let senhaC = document.getElementById('confirm');
let conf = document.getElementById('confSenha');// Label - placeholder.

// Função na qual faz a validação das senhas.
function validarSenha()
{
  // Muda a visibilidade da label [HOTFIX no CSS]
  if(senhaC.value)conf.style.display = "none";
  if(!senhaC.value)conf.style.display = "block";

  // faz a validação.
  if (senha.value != senhaC.value)
  {
    senhaC.setCustomValidity("Senhas Incorretas");
    senhaC.reportValidity();
    return false;
  } else {
    senhaC.setCustomValidity("");
    return true;
  }
}

// verificar também quando o campo for modificado, para que a mensagem suma quando as senhas forem iguais
senhaC.addEventListener('input', validarSenha);
