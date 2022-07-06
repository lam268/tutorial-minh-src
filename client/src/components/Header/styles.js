import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    marginBottom: 20,
    fontWeight: 'lighter',
    padding: '5px 0',
  },
  paper: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    margin: '0 0 10px 0',
  },
  title: {
    marginBottom: '10px',
  },
  textarea: {
    padding: '10px',
    marginBottom: '10px',
  },
  footer: {
    marginTop: '10px',
  },
  input1: {
    height: 1,
    backgroundColor: '#f5f8fa'
  },
 
}));