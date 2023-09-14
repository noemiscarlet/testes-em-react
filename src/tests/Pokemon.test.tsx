import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('testes do requisito 6', () => {
  test('se é renderizado um card com as informações de determinado Pokémon', () => {
    renderWithRouter(<App />);

    const name = screen.getByText(/Pikachu/i);
    const type = screen.getByTestId('pokemon-type');
    const img = screen.getByRole('img', { name: 'Pikachu sprite' });
    const weight = screen.getByTestId('pokemon-weight');

    expect(weight).toHaveTextContent('Average weight: 6.0 kg');
    expect(name).toBeInTheDocument();
    expect(type).toHaveTextContent('Electric');
    expect(img).toBeInTheDocument();
    expect(img.getAttribute('src')).toBe('https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
  });

  test('se o card do Pokémon indicado na Pokédex contém '
  + 'um link de navegação para exibir detalhes desse Pokémon. O link deve ter a URL /pokemon/<id>, em que <id> é o id do Pokémon exibido.', () => {
    renderWithRouter(<App />);

    const details = screen.getByRole('link', { name: /More details/i });

    expect(details).toHaveAttribute('href', '/pokemon/25');
  });

  test('se, ao clicar no link de navegação do Pokémon, é feito o '
    + 'redirecionamento da aplicação para a página de detalhes de Pokémon.', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /More details/i });
    fireEvent.click(moreDetails);

    const head = screen.getByText('Pikachu Details');
    expect(head).toHaveTextContent('Pikachu Details');
  });

  test('se existe um ícone de estrela nos Pokémon favoritados', () => {
    renderWithRouter(<App />);

    const linkShowDetails = screen.getByRole('link', { name: /More details/i });
    fireEvent.click(linkShowDetails);

    const checkbox = screen.getByLabelText(/Pokémon favoritado?/i);
    fireEvent.click(checkbox);

    const star = screen.getByRole('img', { name: 'Pikachu is marked as favorite' });
    expect(star).toBeInTheDocument();
    expect(star).toHaveAttribute('src', '/star-icon.png');
  });
});
