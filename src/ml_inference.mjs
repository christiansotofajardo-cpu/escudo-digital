
/**
 * ESCUDO Digital v0.3.3
 * Motor hibrido de inferencia local.
 *
 * Correccion de falsos positivos por
 * recomendaciones preventivas.
 *
 * El modelo utiliza ejemplos ficticios.
 * No esta validado con adolescentes.
 * SPDX-License-Identifier: MIT
 */

import { ML_MODEL } from './ml_model.mjs';

import {
  analyzeMessage,
  normalizeText
} from './engine.mjs';

const featureIndex = new Map(
  ML_MODEL.terms.map((term, index) => [term, index])
);

export function predictStatisticalCue(message) {
  const input = String(message ?? '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();

  const counts = new Map();

  for (const word of input.split(' ')) {
    if (!word) continue;

    const padded = ` ${word} `;

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

  for (const [index, count] of counts) {
    const value =
      (1 + Math.log(count)) * ML_MODEL.idf[index];

    norm2 += value * value;
    numerator += value * ML_MODEL.coef[index];
  }

  const logit =
    ML_MODEL.bias +
    (norm2 > 0 ? numerator / Math.sqrt(norm2) : 0);

  return {
    confidence: 1 / (1 + Math.exp(-logit)),
    modelVersion: ML_MODEL.version,
    modelType: 'supervised-char-ngrams'
  };
}

/**
 * Identifica consejos preventivos explicitos.
 *
 * No intenta resolver cualquier negacion.
 * Si el mensaje contiene amenazas, exigencias
 * o contrastes, no se aplica esta excepcion.
 *
 * Nunca elimina alertas detectadas por las
 * reglas linguisticas del motor principal.
 */

export function isClearProtectiveAdvice(
  message,
  language = 'es'
) {
  const text = normalizeText(message);

  if (!text) return false;

  if (language === 'en') {
    const contrastOrPressure =
      /\b(?:but|however|unless|except|threatens?|blackmails?|forces?|pressures?|demands?|if you don't|if you do not|otherwise)\b/;

    if (contrastOrPressure.test(text)) {
      return false;
    }

    const noSharing =
      /\b(?:never|do not|don't)\s+(?:(?:ever|have to|need to|should|must)\s+)?(?:send|share|give|show|post|publish|reveal|forward|take off)\b.{0,85}\b(?:intimate|private|nude|naked|photo|picture|image|password|code|location|clothes|body)\b/;

    const educationFrame =
      /\b(?:teacher|counselor|counsellor|professor|parent|mother|father|school|advised|advice|told me|reminded me|recommended|should never)\b/;

    return noSharing.test(text) &&
      (
        educationFrame.test(text) ||
        /^(?:please\s+)?(?:never|do not|don't)\b/.test(text)
      );
  }

  // normalizeText elimina las tildes.
  const contrastOrPressure =
    /\b(?:pero|aunque|sin embargo|excepto|a menos que|amenaza|chantajea|obliga|obligo|presiona|exige|exigio|insiste|si no|de lo contrario)\b/;

  if (contrastOrPressure.test(text)) {
    return false;
  }

  const noSharing =
    /\b(?:no|nunca|jamas)\s+(?:(?:debo|debes|debemos|deben|deberia|deberias|hay que|tengo que|se debe|se puede|puedo|puedes|vayas a)\s+)?(?:enviar|mandar|compartir|dar|mostrar|publicar|revelar|reenviar|pasar|entregar|desvestirme|desnudarse|desvestirse)\b.{0,85}\b(?:fotos?|fotografias?|imagenes?|videos?|intimas?|privadas?|desnudas?|claves?|contrasenas?|codigos?|ubicacion|cuerpo|ropa|datos?|desconocidos?)\b/;

  const educationFrame =
    /\b(?:profesor|profesora|docente|orientador|orientadora|maestra|maestro|colegio|escuela|mama|papa|madre|padre|me dijo|me explico|me enseno|recomiendan|recomendo|aconsejan|consejo|recomendacion)\b/;

  return noSharing.test(text) &&
    (
      educationFrame.test(text) ||
      /^(?:no|nunca|jamas)\b/.test(text)
    );
}

/**
 * Analisis hibrido.
 *
 * 1. Reglas linguisticas.
 * 2. Clasificador estadistico.
 * 3. Revision de consejo preventivo.
 * 4. Integracion de alertas.
 *
 * Nunca certifica que un mensaje sea seguro.
 */

export function analyzeHybridMessage(
  message,
  language = 'es'
) {
  const lang = language === 'en' ? 'en' : 'es';

  const rules = analyzeMessage(message, lang);

  if (rules.status === 'empty') {
    return {
      ...rules,
      mode: 'hybrid-local-ml',
      modelVersion: ML_MODEL.version,
      modelFlag: false
    };
  }

  const predicted = predictStatisticalCue(
    String(message).slice(0, 2000)
  );

  // No anular alertas de reglas explicitas.
  const clearAdvice =
    rules.categories.length === 0 &&
    isClearProtectiveAdvice(message, lang);

  const modelFlag =
    predicted.confidence >= 0.60 &&
    !clearAdvice;

  const cues = rules.categories.slice();

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
