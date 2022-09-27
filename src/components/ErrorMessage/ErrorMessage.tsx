import styles from './errorMessage.module.scss';

interface IProps {
  message?: string,
}

const ErrorMessage = (props: IProps) => {
  const { message } = props;
  return (
    <div className={styles.error_wrapper}>
      <p>'Sorry something went wrong'</p>
      <p className={styles.error_message}>{message ? message : null}</p>
      <p className={styles.error_message}>We are already working on troubleshooting</p>
    </div>
  )
}

export default ErrorMessage