import {toast} from "react-toastify";

export const toast_basic_success = (msg) => {
    toast.success(msg, {
        position: "top-right",
        autoClose: 1200,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

export const toast_basic_info = (msg) => {
    toast.info(msg, {
        position: "top-right",
        autoClose: 1200,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

export const toast_basic_default = (msg) => {
    toast(msg, {
        position: "top-right",
        autoClose: 1200,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

export const toast_basic_error = (msg) => {
    toast.error(msg, {
        position: "top-right",
        autoClose: 1200,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

export const toast_basic_warn = (msg) => {
    toast.warn(msg, {
        position: "top-right",
        autoClose: 1200,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

export const toast_basic_loading = (msg) => {
    return toast.loading(msg, {
        position: "top-right",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

export const toast_basic_update_success = (id, msg) => {
    toast.update(id, {
        render: msg,
        autoClose: 1200,
        type: toast.TYPE.SUCCESS,
        isLoading: false,
    });
}

export const toast_basic_update_error = (id, msg) => {
    toast.update(id, {
        render: msg,
        autoClose: 1200,
        type: toast.TYPE.ERROR,
        isLoading: false,
    });
}