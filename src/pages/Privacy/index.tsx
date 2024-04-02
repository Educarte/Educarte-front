import {
  Group,
  Title,
  Image,
  ScrollArea,
  Container,
  Card,
} from '@mantine/core';
import { Suspense } from 'react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <Suspense>
      <ScrollArea style={{ height: '100vh' }}>
        <div style={{ padding: '1.5rem' }}>
          <Group justify="center" mb="xl">
            <Image src={'/images/logo.png'} />
          </Group>

          <Container>
            <Card>
              <Title mb="xl" order={2}>
                POLÍTICA DE PRIVACIDADE
              </Title>
              <p>
                <span>
                  A sua privacidade é muito importante para nós. Dessa forma,
                  desenvolvemos uma Política de Privacidade que dispõe sobre a
                  maneira como nós obtemos, usamos, divulgamos, transferimos e
                  armazenamos suas informações. Por favor, verifique as nossas
                  práticas de privacidade e, caso tenha qualquer questionamento,
                  entre em contato conosco por meio dos canais de contato
                  disponibilizados em nosso site.
                </span>
              </p>
              <Title order={3} mb="lg">
                1. OBTENÇÃO E USO DE INFORMAÇÕES PESSOAIS
              </Title>
              <Title order={4}>1.1 INFORMAÇÕES PESSOAIS</Title>

              <p>
                <span>
                  Informações pessoais são dados que podem ser usados para
                  identificar individualmente ou entrar em contato com uma
                  pessoa em específico.
                </span>
              </p>
              <p>
                <span>
                  Coletamos as seguintes informações pessoais dos usuários:
                </span>
                <ul style={{ padding: '0', margin: '0' }}>
                  <li style={{ listStyleType: 'none' }}>- Nome completo</li>
                  <li style={{ listStyleType: 'none' }}>
                    - Endereço de e-mail
                  </li>
                  <li style={{ listStyleType: 'none' }}>- Endereço físico</li>
                  <li style={{ listStyleType: 'none' }}>
                    - Número de telefone
                  </li>
                  <li style={{ listStyleType: 'none' }}>
                    - Caso haja compras pelo aplicativo: informações de
                    pagamento (como dados do cartão de crédito)
                  </li>
                </ul>
              </p>
              <Title order={3} mb="lg">
                2. USO DAS INFORMAÇÕES
              </Title>

              <p>
                <span>
                  Utilizamos as informações coletadas para os seguintes fins:
                </span>
                <ul style={{ padding: '0', margin: '0' }}>
                  <li style={{ listStyleType: 'none' }}>- Processar pedidos</li>
                  <li style={{ listStyleType: 'none' }}>
                    - Fornecer suporte ao cliente
                  </li>
                  <li style={{ listStyleType: 'none' }}>
                    - Personalizar a experiência do usuário{' '}
                  </li>
                  <li style={{ listStyleType: 'none' }}>
                    - Enviar comunicações promocionais, como ofertas especiais e
                    novidades
                  </li>
                  <li style={{ listStyleType: 'none' }}>
                    - Melhorar nossos produtos e serviços
                  </li>
                  <li style={{ listStyleType: 'none' }}>
                    - Realizar análises estatísticas e de mercado
                  </li>
                  <li style={{ listStyleType: 'none' }}>
                    - Cumprir obrigações legais
                  </li>
                </ul>
              </p>
              <Title order={3}>3. COMPARTILHAMENTO DAS INFORMAÇÕES</Title>
              <p>
                <span>
                  Não vendemos, alugamos ou divulgamos suas informações pessoais
                  a terceiros.
                </span>
              </p>
              <Title order={3}>4. SEGURANÇA DAS INFORMAÇÕES</Title>
              <p>
                <span>
                  Empregamos medidas de segurança físicas, eletrônicas e
                  administrativas para proteger as informações pessoais dos
                  usuários contra acesso não autorizado, uso indevido,
                  divulgação ou destruição. No entanto, é importante ressaltar
                  que nenhuma transmissão de dados pela Internet ou sistema de
                  armazenamento é completamente segura.
                </span>
              </p>
              <Title order={3}>5. DIREITOS DO USUÁRIO</Title>
              <p>
                <span>
                  Os usuários têm o direito de solicitar acesso, correção,
                  exclusão ou restrição do processamento de suas informações
                  pessoais nos termos da lei 13.709/18.
                </span>
              </p>
              <Title order={3}>6. TEMPO DE ARMAZENAMENTO</Title>
              <p>
                <span>
                  Os dados pessoais do usuário e visitante são armazenados pelo
                  aplicativo durante o período necessário para a prestação do
                  serviço ou para o cumprimento das finalidades previstas no
                  presente documento, conforme o disposto no inciso I do artigo
                  15 da Lei 13.709/18.
                </span>
              </p>
              <p>
                <span>
                  Os dados podem ser removidos ou anonimizados a pedido do
                  usuário, excetuando-se os casos em que a lei oferecer outro
                  tratamento.
                </span>
              </p>
              <p>
                <span>
                  Ainda, os dados pessoais dos usuários apenas podem ser
                  conservados após o término de seu tratamento nas seguintes
                  hipóteses previstas no artigo 16 da referida lei:
                </span>
              </p>
              <ol type="I" style={{ paddingLeft: '1rem' }}>
                <li>
                  cumprimento de obrigação legal ou regulatória pelo
                  controlador;
                </li>
                <li style={{ paddingLeft: '0.2rem' }}>
                  estudo por órgão de pesquisa, garantida, sempre que possível,
                  a anonimização dos dados pessoais;
                </li>
                <li>
                  transferência a terceiro, desde que respeitados os requisitos
                  de tratamento de dados dispostos nesta Lei;
                </li>
                <li>
                  uso exclusivo do controlador, vedado seu acesso a terceiro, e
                  desde que anonimizados os dados.
                </li>
              </ol>
              <Title order={3}>7. CONSENTIMENTO</Title>
              <p>
                <span>
                  Ao utilizar os serviços e fornecer as informações pessoais
                  pela plataforma, o usuário está consentindo com a presente
                  Política de Privacidade.
                </span>
              </p>
              <p>
                <span>
                  O usuário, ao cadastrar-se, manifesta conhecer e pode
                  exercitar seus direitos de cancelar seu cadastro, acessar e
                  atualizar seus dados pessoais e garante a veracidade das
                  informações por ele disponibilizadas.
                </span>
              </p>
              <p>
                <span>
                  O usuário tem direito de retirar o seu consentimento a
                  qualquer tempo, para tanto deve entrar em contato por meio dos
                  canais disponibilizados em nosso site.
                </span>
              </p>
              <Title order={3}>
                8. ALTERAÇÕES NESTA POLÍTICA DE PRIVACIDADE
              </Title>
              <p>
                <span>
                  Reservamo-nos o direito de atualizar esta política de
                  privacidade periodicamente. As alterações serão publicadas em
                  nosso site e a data de vigência será atualizada para refletir
                  as mudanças. Encorajamos os usuários a revisar regularmente
                  esta política para se manterem informados sobre como
                  protegemos suas informações pessoais.
                </span>
              </p>
              <Title order={3}>9. JURISDIÇÃO PARA RESOLUÇÃO DE CONFLITO</Title>
              <p>
                <span>
                  Para a solução de controvérsias decorrentes do presente
                  instrumento será aplicado integralmente o Direito brasileiro.
                </span>
              </p>
              <p>
                <span>
                  Os eventuais litígios deverão ser apresentados no foro da
                  comarca em que se encontra a sede da empresa.
                </span>
              </p>
            </Card>
          </Container>
        </div>
      </ScrollArea>
    </Suspense>
  );
};

export default PrivacyPolicyPage;
