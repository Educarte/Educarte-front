import { Link } from 'react-router-dom';

export default function ForbiddenPage() {
  return (
    <div>
      <h2>Acesso Negado.</h2>
      <p>Você não possui permissão para acessar esse conteúdo.</p>
      {/* TODO: Varificar se está logado para alterar a URL da home */}
      <Link to="/">Voltar para a Home</Link>
    </div>
  );
}
