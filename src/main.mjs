
/*
 * ESCUDO Digital v0.3
 * Punto de entrada de la aplicación.
 * Análisis local, sin envío de mensajes.
 */

import { DEMO_EXAMPLES } from './engine.mjs';

import {
  analyzeHybridMessage
} from './ml_inference.mjs';

// Conectar los motores con la interfaz.
window.DEMO_EXAMPLES = DEMO_EXAMPLES;
window.analyzeHybridMessage = analyzeHybridMessage;

// Iniciar la interfaz cuando los motores estén cargados.
await import('./app.js');
