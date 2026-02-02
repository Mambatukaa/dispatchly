type AlertCallback = (message: string) => void

let successCallback: AlertCallback = () => {}
let errorCallback: AlertCallback = () => {}

const AlertService = {
  setCallbacks: (onSuccess: AlertCallback, onError: AlertCallback) => {
    successCallback = onSuccess
    errorCallback = onError
  },

  success: (message: string) => {
    successCallback(message)
  },

  error: (message: string) => {
    errorCallback(message)
  },
}

export default AlertService
