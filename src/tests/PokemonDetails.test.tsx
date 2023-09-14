import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemonList from '../data';

describe('testes do requisito 7', () => {
  test('Teste se as informações detalhadas do Pokémon '
  + 'selecionado são mostradas na tela:', () => {
    renderWithRouter(<App />);
    const pokeDetails = screen.getByRole('link', { name: /more details/i });

    fireEvent.click(pokeDetails);

    const head = screen.getByRole('heading', { name: /pikachu details/i });
    expect(head).toBeInTheDocument();
    expect(head).toHaveTextContent('Pikachu Details');

    const summary = screen.getByText('Summary');
    expect(summary).toBeInTheDocument();

    const details = screen.getByText(/This intelligent Pokémon roasts/i);
    expect(details).toBeInTheDocument();
  });

  test('se existe na página uma seção com os mapas contendo as localizações do Pokémon', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /More details/i });
    fireEvent.click(moreDetails);

    const head = screen.getByRole('heading', { name: /game locations of pikachu/i });
    const locationOne = screen.getByText(/kanto viridian forest/i);
    const locationTwo = screen.getByText(/kanto power plant/i);
    const locationsImgs = screen.getAllByAltText('Pikachu location');

    expect(head).toBeInTheDocument();
    expect(locationOne).toBeInTheDocument();
    expect(locationTwo).toBeInTheDocument();

    locationsImgs.forEach((img) => expect(img).toBeInTheDocument());
  });

  test('se o usuário pode favoritar um Pokémon por meio da página de detalhes', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /More details/i });
    fireEvent.click(moreDetails);

    const checkbox = screen.getByText(/pokémon favoritado\?/i);

    expect(checkbox).toBeInTheDocument();
    fireEvent.click(checkbox);
    const trueCheckbox = screen.getByAltText('Pikachu is marked as favorite');
    expect(trueCheckbox).toBeInTheDocument();
  });
});
