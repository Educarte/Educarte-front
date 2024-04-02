import { Link } from 'react-router-dom';

export default function InternalErrorPage() {
  return (
    <div>
      <h2>Ocorreu um erro no servidor.</h2>
      <p>
        Ocorreu um erro inesperado ao tentar acessar a página. Por favor entre
        em contato com o administrador.
      </p>

      {/* TODO: Verificar se está logado para alterar a URL da home */}
      {/* TODO: Em caso de desenvolvimento, exibir a stack do erro. */}
      <Link to="/">Voltar para a Home</Link>
    </div>
  );
}
