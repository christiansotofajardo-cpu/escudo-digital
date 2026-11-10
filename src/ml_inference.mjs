
/**
 * ESCUDO Digital v0.3
 * Inferencia local de aprendizaje automático.
 *
 * Modelo: TF-IDF de caracteres y regresión logística.
 * Entrenamiento: mensajes ficticios.
 * No utiliza servidores externos.
 *
 * SPDX-License-Identifier: MIT
 */

import { ML_MODEL } from './ml_model.mjs';
import { analyzeMessage } from './engine.mjs';

// Índice de características aprendidas.
const featureIndex = new Map(
  ML_MODEL.terms.map((term, index) => [term, index])
);

/**
 * Calcula la respuesta estadística del modelo.
 *
 * La puntuación NO representa una probabilidad
 * calibrada de peligro real.
 */
export function predictStatisticalCue(message) {

  const input = String(message ?? '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();

  const counts = new Map();

  // Extraer n-gramas de caracteres.
  for (const word of input.split(' ')) {

    if (!word) continue;

    const padded = ' ' + word + ' ';

    for (
      let n = ML_MODEL.ngram_min;
      n <= ML_MODEL.ngram_max;
      n++
    ) {

      for (
        let i = 0;
        i + n <= padded.length;
        i++
      ) {

        const gram = padded.slice(i, i + n);
        const index = featureIndex.get(gram);

        if (index !== undefined) {
          counts.set(
            index,
            (counts.get(index) || 0) + 1
          );
        }
      }
    }
  }

  let norm2 = 0;
  let numerator = 0;

  // Aplicar pesos TF-IDF aprendidos.
  for (const [index, count] of counts) {

    const value =
      (1 + Math.log(count)) * ML_MODEL.idf[index];

    norm2 += value * value;

    numerator += value * ML_MODEL.coef[index];
  }

  const logit =
    ML_MODEL.bias +
    (norm2 > 0 ? numerator / Math.sqrt(norm2) : 0);

  const confidence = 1 / (1 + Math.exp(-logit));

  return {
    confidence,
    modelVersion: ML_MODEL.version,
    modelType: 'supervised-char-ngrams'
  };
}

/**
 * Motor híbrido:
 * 1. Analiza señales lingüísticas explícitas.
 * 2. Ejecuta el modelo estadístico.
 * 3. Combina ambos resultados.
 *
 * Nunca declara que un mensaje sea seguro.
 */
export function analyzeHybridMessage(
  message,
  language = 'es'
) {

  const lang = language === 'en' ? 'en' : 'es';

  // Primera capa: reglas lingüísticas.
  const rules = analyzeMessage(message, lang);

  if (rules.status === 'empty') {
    return {
      ...rules,
      mode: 'hybrid-local-ml',
      modelVersion: ML_MODEL.version,
      modelFlag: false
    };
  }

  // Segunda capa: aprendizaje automático.
  const predicted = predictStatisticalCue(
    String(message).slice(0, 2000)
  );

  // Evitar algunas alertas incorrectas
  // ante instrucciones explícitas de prevención.
  const preventative = lang === 'es'
    ? /\b(?:dice|dijo|pide|pidio|recomienda|aconseja)\s+que\s+no\s+(?:me\s+|te\s+)?(?:desnude|desvista|desvistas|desnudes|quite\s+la\s+ropa)\b/
        .test(String(message).toLowerCase())
    : /\b(?:do not|don't|never)\s+(?:undress|strip|take\s+off\s+your\s+clothes)\b/
        .test(String(message).toLowerCase());

  // Umbral experimental, no validado clínicamente.
  const modelFlag =
    predicted.confidence >= 0.60 &&
    !(preventative && rules.categories.length === 0);

  const cues = rules.categories.slice();

  // Incorporar señal de IA cuando las reglas
  // no identificaron señales explícitas.
  if (modelFlag && cues.length === 0) {

    cues.push({
      id: 'ml_warning',
      source: 'machine-learning',
      level: 'medium',

      label: lang === 'es'
        ? 'Posible señal identificada por IA estadística'
        : 'Possible cue identified by statistical AI',

      explanation: lang === 'es'
        ? 'Un modelo entrenado con ejemplos ficticios reconoce similitudes lingüísticas con mensajes de presión. Puede equivocarse: examina el contexto con una persona de confianza.'
        : 'A model trained on fictional examples identified similarities to pressured messages. It can be wrong: review the context with someone you trust.'
    });
  }

  // Prioridad determinada por las señales explícitas.
  const urgency =
    rules.urgency === 'priority'
      ? 'priority'
      : cues.length
        ? 'attention'
        : 'undetermined';

  return {
    ...rules,

    status: cues.length
      ? 'signals'
      : 'no-clear-signals',

    urgency,
    categories: cues,
    modelFlag,

    modelVersion: ML_MODEL.version,
    mode: 'hybrid-local-ml'
  };
}
