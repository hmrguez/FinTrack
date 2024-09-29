// services/ToastService.js

import {EventEmitter} from 'events';

class ToastService extends EventEmitter {
	show(message: string, type = 'info', duration = 3000) {
		this.emit('showToast', {message, type, duration});
	}
}

export default new ToastService();