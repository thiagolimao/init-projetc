<?
   # alterar a variavel abaixo colocando o seu email
   $destinatario = "contato@milhomen.com";

   $nome = $_REQUEST['nome'];
   $telefone = $_REQUEST['telefone'];
   $email = $_REQUEST['email'];
   $mensagem = $_REQUEST['mensagem'];

    // monta o e-mail na variavel $body

   $body =         "===================================" . "\n";
   $body = $body . "  FALE CONOSCO - DANIELA MILHOMEN  " . "\n";
   $body = $body . "===================================" . "\n\n";
   $body = $body . "Nome: " . $nome . "\n";
   $body = $body . "Email: " . $email . "\n";
   $body = $body . "Telefone: " . $telefone . "\n";
   $body = $body . "Mensagem: " . $mensagem . "\n\n";
   $body = $body . "====================================" . "\n";

   // envia o email
   $mail = mail($destinatario, $nome , $body, "From: $email\r\n");

   if($mail){
      echo "<script type='text/javascript'>window.alert('".$nome."! Sua mensagem foi enviada com sucesso!');</script>";
      echo '<meta HTTP-EQUIV="Refresh" CONTENT="1; URL=http://www.milhomen.com">';
   }else{
      echo "<script type='text/javascript'>window.alert('".$nome."! Erro ao enviar email! Tente novamente.');</script>";
      echo '<meta HTTP-EQUIV="Refresh" CONTENT="1; URL=http://www.milhomen.com">';
   }
?>