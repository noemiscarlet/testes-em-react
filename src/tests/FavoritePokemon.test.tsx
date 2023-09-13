import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('testes do requisito 2', () => {
  test('É exibida na tela a mensagem No favorite pokemon found'
  + 'caso a pessoa não tenha Pokémon favorito.', () => {
    renderWithRouter(<App />, { route: '/favorites' });

    const p = screen.getByText(/no favorite pokémon found/i);
    expect(p).toBeInTheDocument();
  });

  test('Apenas são exibidos os Pokémon favoritados', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    const home = screen.getByRole('link', { name: /home/i });

    fireEvent.click(moreDetails);

    const checkBox = screen.getByText(/pokémon favoritado\?/i);

    fireEvent.click(checkBox);
    fireEvent.click(home);

    const nextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
    fireEvent.click(nextPokemon);

    fireEvent.click(moreDetails);
    fireEvent.click(checkBox);

    const favButton = screen.getByRole('link', { name: /favorite pokémon/i });
    fireEvent.click(favButton);

    const pikachuName = screen.getByText(/pikachu/i);
    const pikachuImage = screen.getByRole('img', { name: /pikachu sprite/i });
    const charmanderName = screen.getByText(/pikachu/i);
    const charmanderImage = screen.getByRole('img', { name: /pikachu sprite/i });

    expect(pikachuName).toBeInTheDocument();
    expect(pikachuImage).toBeInTheDocument();
    expect(pikachuImage).toHaveProperty('src', 'https://archives.bulbagarden'
    + '.net/media/upload/b/b2/Spr_5b_025_m.png');

    expect(charmanderName).toBeInTheDocument();
    expect(charmanderImage).toBeInTheDocument();
    expect(charmanderImage).toHaveProperty('src', 'https://archives.bulbagarden'
    + '.net/media/upload/b/b2/Spr_5b_025_m.png');
  });
});
