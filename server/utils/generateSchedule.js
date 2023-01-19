import moment from 'moment';

const KEY = 'movieID';

const groupByDate = (movie) => {
  const groups = movie.reduce((dates, currentDate) => {
    const day = moment(currentDate.startDate).format('YYYY-MM-DD');
    const hour = moment(currentDate.startDate).format('hh:mm a');
    if (!dates[day]) dates[day] = [];
    dates[day].push({ hour, scheduleId: currentDate.scheduleId, roomId: currentDate.roomId });

    return dates;
  }, {});

  return Object.keys(groups).map((date) => ({
    date,
    hours: groups[date],
  }));
};

const getScheduleByMovie = ({ id, movies }) => {
  const movieFiltered = movies
    .map(({ movieID, startDate, endDate, scheduleId, roomId }) => {
      if (movieID === id) return { startDate, endDate, scheduleId, roomId };
    })
    .filter((item) => item);

  return groupByDate(movieFiltered);
};

export const generateSchedule = (movies) => {
  const schedule = [...new Map(movies.map((movie) => [movie[KEY], movie])).values()];
  schedule.map((movie) => {
    movie.schedule = getScheduleByMovie({ id: movie[KEY], movies });
  });

  return schedule;
};
