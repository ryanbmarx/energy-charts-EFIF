// Dev-only entry — registers the web component, then mounts the picker shell
import { mount } from 'svelte';
import './app.css'; // Tailwind styles for DevApp (App.wc.svelte injects these itself via shadow DOM)
import './App.wc.svelte'; // side-effect: registers <efif-charts> custom element
import DevApp from './DevApp.svelte';

mount(DevApp, { target: document.getElementById('app')! });
