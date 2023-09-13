import { fireEvent, render, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('testes do requisito 1', () => {
  renderWithRouter(<App />)
  const linkHome = screen.getByText(/home/i)
  const linkAbout = screen.getByText(/about/i)
  const linkFavorite = screen.getByText(/favorite pokémon/i)

  test('se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    expect(linkHome).toBeInTheDocument()
    expect(linkAbout).toBeInTheDocument()
    expect(linkFavorite).toBeInTheDocument()
  });

  test(`Teste se a aplicação é redirecionada para a página inicial, na URL /, ao clicar no link Home da barra de navegação`, () => {
    renderWithRouter(<App />)
    fireEvent.click(linkHome);

    const home = screen.getByRole('heading', {
      name: /encountered pokémon/i
    })
    const button = screen.getByRole('button', {
      name: /próximo pokémon/i
    })

    expect(home).toBeInTheDocument()
    expect(button).toBeInTheDocument()
  });

  test('se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação', () => {
    renderWithRouter(<App />)
    const linkAbout = screen.getByText(/about/i)

    fireEvent.click(linkAbout)

    const aboutPokedex = screen.getByRole('heading', {
      name: /about pokédex/i
    })
    const headingPokedex = screen.getByRole('heading', {
      name: /what does this app do\?/i
    })

    expect(aboutPokedex).toBeInTheDocument()
    expect(headingPokedex).toBeInTheDocument()
  })

  test('se a aplicação é redirecionada para a página de favorites, na URL /favorites, ao clicar no link favorites da barra de navegação', () => {
    renderWithRouter(<App />)
    const linkFavorite = screen.getByText(/favorite pokémon/i)

    fireEvent.click(linkFavorite)

    const headingPokedex = screen.getByRole('heading', {
      name: /favorite pokémon/i
    })
    const text = screen.getByText(/no favorite pokémon found/i)

    expect(headingPokedex).toBeInTheDocument()
    expect(text).toBeInTheDocument()
  })

  test('se a aplicação é redirecionada para a página de favorites, na URL /favorites, ao clicar no link favorites da barra de navegação', () => {
    renderWithRouter(<App />, { route: '/abobora'})

    const notFoundText = screen.getByRole('heading', {
      name: /page requested not found/i
    })

    const notFoundImage = screen
    .getByRole(
      'img',
      {  
        name: /clefairy pushing buttons randomly with text i have no idea what i'm doing/i
      }
    ) 

    expect(notFoundText).toBeInTheDocument()
    expect(notFoundImage).toBeInTheDocument()
  })
})