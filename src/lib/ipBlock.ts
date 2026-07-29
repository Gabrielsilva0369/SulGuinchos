import { useEffect, useState } from "react";
import { getVisitorId } from "./clickLog";

/* ==========================================================================
   Sul Guinchos — Bloqueio de acesso (IP + Visitor ID)
   --------------------------------------------------------------------------
   Duas listas que VOCÊ edita à mão. Depois de editar: npm run build + deploy.

   1) BLOCKED_IPS       -> IPs que não devem ver o site.
   2) BLOCKED_VISITOR_IDS -> ids de aparelho (coluna "visitor_id" da planilha).

   Quando o visitante casa com uma das listas, o site:
     - mostra a tela "Conteúdo indisponível" (bloqueio imediato no navegador), e
     - grava o cookie  sg_block=1  para o Cloudflare bloquear na BORDA
       (requisição seguinte nem chega no site). Veja docs/bloqueio-cloudflare.md

   ⚠️ Honestidade:
   - IP: no Cloudflare o bloqueio é "de verdade" (borda). Bom para IP fixo.
   - Visitor ID / cookie: é "grudento", mas o usuário pode LIMPAR o cookie /
     usar aba anônima / VPN e voltar. Não é 100%.
   - NADA disso devolve dinheiro de anúncio (o clique no Google já foi cobrado).
     Para não PAGAR o clique, exclua o IP em Google Ads → Exclusões de IP.
   ========================================================================== */

export const BLOCKED_IPS: string[] = [
  "200.173.50.160",
  // "1.2.3.4",
];

export const BLOCKED_VISITOR_IDS: string[] = [
  // cole aqui o visitor_id copiado da planilha, um por linha:
  // "0f3c9a2e-...-...",
];

/** Grava o cookie que o Cloudflare usa para bloquear na borda. */
function setBlockCookie(): void {
  try {
    // 1 ano, enviado em todas as requisições do domínio
    document.cookie = "sg_block=1; path=/; max-age=31536000; SameSite=Lax";
  } catch {
    /* ignora */
  }
}

/** Verifica (síncrono) se o visitor_id salvo está na lista de bloqueio. */
function isVisitorBlocked(): boolean {
  if (BLOCKED_VISITOR_IDS.length === 0) return false;
  const id = getVisitorId();
  return id !== "" && BLOCKED_VISITOR_IDS.includes(id);
}

async function fetchVisitorIp(): Promise<string> {
  try {
    const res = await fetch("https://api.ipify.org?format=json");
    const data: { ip?: string } = await res.json();
    return data.ip ?? "";
  } catch {
    return "";
  }
}

/**
 * Retorna true se o visitante deve ser bloqueado (por Visitor ID ou IP).
 * Não atrasa a renderização: o site aparece normal e só bloqueia depois
 * da verificação. Também grava o cookie sg_block para o Cloudflare.
 */
export function useAccessBlock(): boolean {
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    // 1) Visitor ID — imediato (localStorage)
    if (isVisitorBlocked()) {
      setBlockCookie();
      setBlocked(true);
      return;
    }

    // 2) IP — assíncrono
    if (BLOCKED_IPS.length === 0) return;
    let active = true;
    fetchVisitorIp().then((ip) => {
      if (active && ip && BLOCKED_IPS.includes(ip)) {
        setBlockCookie();
        setBlocked(true);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  return blocked;
}
