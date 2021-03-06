import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as movieAPI from '../services/movieAPI';
import { Loading } from '../components';
import '../css/MovieDetails.css';

class MovieDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      movies: '',
    };

    this.catchMovie = this.catchMovie.bind(this);
    this.deletarFilmes = this.deletarFilmes.bind(this);
  }

  componentDidMount() {
    this.catchMovie();
  }

  async catchMovie() {
    const { match: { params: { id } } } = this.props;
    this.setState({ loading: true });
    movieAPI.getMovie(id)
      .then((resolve) => this.setState({ movies: resolve, loading: false }));
  }

  async deletarFilmes(id) {
    await movieAPI.deleteMovie(id);
  }

  render() {
    const { loading, movies } = this.state;
    const { id, title, storyline, imagePath, genre, rating, subtitle } = movies;
    const carregando = <Loading />;

    return (loading ? carregando : (
      <div className="countainerDetails">
        <ul data-testid="movie-details" className="cardDetails">
          <img className="imgDetails" alt="Movie Cover" src={ `../${imagePath}` } />
          <p>{ `Título: ${title}` }</p>
          <p>{ `Subtítulo: ${subtitle}` }</p>
          <p className="storyLine">{ `Sinopse: ${storyline}` }</p>
          <p>{ `Gênero: ${genre}` }</p>
          <p>{ `Avaliação: ${rating}` }</p>
        </ul>
        <div className="linkcountainer">
          <div className="linksDetails">
            <Link className="linkDecoration" to="/">VOLTAR</Link>
            <Link className="linkDecoration" to={ `/movies/${id}/edit` }>EDITAR</Link>
            <Link
              className="linkDecoration"
              to="/"
              onClick={ () => this.deletarFilmes(id) }
            >
              DELETAR
            </Link>
          </div>
        </div>
      </div>
    )
    );
  }
}

MovieDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default MovieDetails;
