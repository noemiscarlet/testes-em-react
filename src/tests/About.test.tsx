import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('testes do requisito 2', () => {
  test('se a página contém um heading h2 com o texto About Pokédex.', () => {
    renderWithRouter(<App />, { route: '/about' });

    const h2 = screen.getByRole('heading', {
      name: /about pokédex/i,
    });

    expect(h2).toBeInTheDocument();
  });

  test('se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<App />, { route: '/about' });

    const p1 = screen
      .getByText(
        /this application simulates a pokédex, a digital encyclopedia containing all pokémon\./i,
      );
    const p2 = screen
      .getByText(
        /one can filter pokémon by type, and see more details for each one of them\./i,
      );

    expect(p1).toBeInTheDocument();
    expect(p2).toBeInTheDocument();
  });

  test('se a página contém a seguinte imagem de uma Pokédex:', () => {
    renderWithRouter(<App />, { route: '/about' });

    const imagePokedex = screen.getByRole('img', {
      name: /pokédex/i,
    });

    expect(imagePokedex).toBeInTheDocument();
    expect(imagePokedex).toHaveAttribute('src', 'https://cdn2.b'
    + 'ulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
