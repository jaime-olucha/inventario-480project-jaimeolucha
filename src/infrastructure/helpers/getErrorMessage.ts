export const getErrorMessage = (err: any) => {
  if (err && err.message) {

    if (!err.message.startsWith('HTTP')) {
      return err.message;
    }
  }

  return "Ocurrió un error inesperado al procesar la solicitud.";
};