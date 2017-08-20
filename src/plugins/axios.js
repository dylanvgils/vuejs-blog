import axios from 'axios';

function plugin(Vue, name = 'http') {
    if (plugin.installed) return
    plugin.installed = true
    
    Vue[name] = axios;

    Object.defineProperty(Vue.prototype, '$'.concat(name), {
        get() { return axios; }
    });
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
}

export default plugin;