import Movie from '../models/Movie';

export const getInfos = (req, res, next) => {
  const { idImdb } = req.params;
  Movie.findOne({ idImdb }, (err, movie) => {
    if (err) {
      return next(err);
    } else if (movie === null) {
      return res.send({ error: [{ param: 'user', msg: 'error.noMovie' }] });
    }
    return res.send({ error: [], movie });
  });
};

export default getInfos;
