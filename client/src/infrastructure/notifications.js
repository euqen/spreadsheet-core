import noty from 'noty';

export function success(text, options = {}) {
    const message = `<i class="ion-checkmark-round"></i> ${text}`;
    options.type = 'success';

    return _show(message, options);
}

export function warning(text, options = {}) {
    const message = `<i class="ion-alert-circled"></i> ${text}`;
    options.type = 'warning';

    return _show(message, options);
}

export function error(text, options = {}) {
    const message = `<i class="ion-close"></i> ${text}`;
    options.type = 'error';

    return _show(message, options);
}

function _show(text, options) {
    return noty({
        text: text,
        layout: options.layout || 'topRight',
        timeout: options.timeout || false,
        theme: 'relax',
        type: options.type
    });
}