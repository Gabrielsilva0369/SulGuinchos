/* ==========================================================================
   Sul Guinchos — Tracking leve de cliques nos CTAs
   Envia um evento para o dataLayer APENAS se ele existir na página.
   Nunca cria IDs de rastreamento nem bloqueia o link.
   ========================================================================== */

import type { MouseEvent } from "react";

type DataLayerEvent = {
  event: string;
  cta_name: string;
};

declare global {
  interface Window {
    dataLayer?: DataLayerEvent[];
  }
}

/**
 * Handler para onClick de um link/botão de CTA.
 * Lê o atributo data-cta do próprio elemento e, se houver um
 * window.dataLayer disponível, registra o evento de conversão.
 * A navegação do link segue normalmente em qualquer cenário.
 */
export function trackCtaClick(event: MouseEvent<HTMLAnchorElement>): void {
  const ctaName = event.currentTarget.dataset.cta;
  if (!ctaName) return;

  if (
    typeof window !== "undefined" &&
    Array.isArray(window.dataLayer) &&
    typeof window.dataLayer.push === "function"
  ) {
    window.dataLayer.push({ event: "cta_click", cta_name: ctaName });
  }
}
