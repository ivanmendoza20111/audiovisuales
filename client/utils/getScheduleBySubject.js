export const getScheduleBySubject = (subjects) => {
  return subjects
    .map((subject) => {
      const { days, name, professor, proffesorCode } = subject;

      return days.map(({ day, startHour, endHour, classroom }) => {
        return {
          subject: name,
          day,
          startHour,
          endHour,
          professor,
          proffesorCode,
          classroom,
          schedule: `${name} ~ ${day}, de ${startHour} hasta ${endHour}`,
        };
      });
    })
    .flat();
};
