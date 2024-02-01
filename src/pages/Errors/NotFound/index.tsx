import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div>
      <h2>Oops! Página não encontrada.</h2>
      <p>
        A página que você está tentando acessar não existe ou o link está
        expirado.
      </p>
      {/* TODO: Varificar se está logado para alterar a URL da home */}
      <Link to="/">Voltar para a Home</Link>
    </div>
  );
}
