import { SOCIAL_MEDIA_LINKS } from '@/utils/constant';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {},
  logo: {
    width: 91.43,
  },
  links: {
    all: 'unset',
    listStyle: 'none',
  },
  link: {
    color: theme.palette.text.secondary,
    fontSize: 17,
    lineHeight: 2,
  },
  copyright: {
    marginTop: 80,
  },
  icon: {
    marginRight: 10,
    fontSize: 35,
    color: theme.palette.text.secondary,
  },
}));

const Copyright = () => {
  const classes = useStyles();

  return (
    <Typography variant="subtitle1" className={classes.copyright}>
      {`© Sistema Corporativo Universidad Tecnológica de Santiago | UTESA, ${new Date().getFullYear()}. Creado por LICEM 🔥`}
    </Typography>
  );
};

const SocialMediaLinks = () => {
  const classes = useStyles();

  return (
    <Grid item xs={6} sm={3}>
      <Typography variant="h6" gutterBottom>
        Síguenos
      </Typography>
      <div>
        {SOCIAL_MEDIA_LINKS.map(({ Icon, link }) => (
          <Link to={{ pathname: link }} key={link} target="_blank" rel="noopener noreferrer">
            <Icon className={classes.icon} />
          </Link>
        ))}
      </div>
    </Grid>
  );
};

const footers = [
  {
    title: 'Ayuda',
    links: [
      { title: 'Contacto', link: 'contacto' },
      { title: 'Términos y Condiciones', link: 'terminos-y-condiciones' },
      { title: 'Política de Privacidad', link: 'politica-de-privacidad' },
    ],
  },
];
export default function FooterPublic() {
  const classes = useStyles();

  return (
    <Container className={classes.root} maxWidth="lg" component="footer">
      <Grid container spacing={4} justifyContent="space-evenly" className={classes.items}>
        <Grid item xs={12} sm={3}>
          <img className={classes.logo} src="/img/logo.png" alt={'Logo'} />
          <Typography>Sapere et Vivere</Typography>
        </Grid>
        {footers.map(({ title, links }) => (
          <Grid item xs={6} sm={3} key={title}>
            <Typography variant="h6" gutterBottom>
              {title}
            </Typography>
            <ul className={classes.links}>
              {links.map(({ title, link }) => (
                <li key={title}>
                  <Link to={link} className={classes.link}>
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </Grid>
        ))}
        <SocialMediaLinks />
      </Grid>

      <Copyright />
    </Container>
  );
}
