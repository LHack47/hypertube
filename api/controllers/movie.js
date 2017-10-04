import Movie from '../models/Movie';

export const getInfos = (req, res, next) => {
  const { idImdb } = req.params;
  Movie.findOne({ idImdb }, (err, movie) => {
    if (err) {
      return next(err);
    } else if (movie === null) {
      return res.send({ error: 'Movie not found' });
    }
    return res.send({ error: '', movie });
  });
};

export default getInfos;
