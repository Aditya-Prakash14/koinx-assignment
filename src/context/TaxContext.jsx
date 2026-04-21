import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { taxAPI } from "../services/api";

const TaxContext = createContext();

const computeHolding = (h) => {
  return h; // Format is already clean from API
};

export function TaxProvider({ children }) {
  const [taxSummary, setTaxSummary] = useState(null);
  const [holdings, setHoldings] = useState([]);
  const [selected, setSelected] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [summaryRes, holdingsRes] = await Promise.all([
          taxAPI.getSummary(),
          taxAPI.getHoldings()
        ]);

        setTaxSummary(summaryRes.capitalGains);
        setHoldings(holdingsRes.map(computeHolding));
      } catch (err) {
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleCoin = useCallback((coinId) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(coinId) ? next.delete(coinId) : next.add(coinId);
      return next;
    });
  }, []);

  const toggleAll = useCallback(() => {
    setSelected(prev =>
      prev.size === holdings.length ? new Set() : new Set(holdings.map(h => h.coin))
    );
  }, [holdings]);

  // Compute After Harvesting state
  const postHarvestingSummary = useMemo(() => {
    if (!taxSummary) return null;

    let tempStProfits = taxSummary.stcg.profits;
    let tempStLosses = taxSummary.stcg.losses;
    let tempLtProfits = taxSummary.ltcg.profits;
    let tempLtLosses = taxSummary.ltcg.losses;

    holdings.forEach(h => {
      if (selected.has(h.coin)) {
        if (h.stcg.gain > 0) tempStProfits += h.stcg.gain;
        else if (h.stcg.gain < 0) tempStLosses += Math.abs(h.stcg.gain);

        if (h.ltcg.gain > 0) tempLtProfits += h.ltcg.gain;
        else if (h.ltcg.gain < 0) tempLtLosses += Math.abs(h.ltcg.gain);
      }
    });

    return {
      stcg: { profits: tempStProfits, losses: tempStLosses },
      ltcg: { profits: tempLtProfits, losses: tempLtLosses }
    };
  }, [taxSummary, holdings, selected]);

  // Tax Savings Calculation
  let savings = 0;
  if (taxSummary && postHarvestingSummary) {
    const preNet = (taxSummary.stcg.profits - taxSummary.stcg.losses) + (taxSummary.ltcg.profits - taxSummary.ltcg.losses);
    const postNet = (postHarvestingSummary.stcg.profits - postHarvestingSummary.stcg.losses) + (postHarvestingSummary.ltcg.profits - postHarvestingSummary.ltcg.losses);

    const preTax = Math.max(0, preNet) * 0.3;
    const postTax = Math.max(0, postNet) * 0.3;

    if (preTax > postTax) {
      savings = preTax - postTax;
    }
  }

  const value = {
    taxSummary,
    postHarvestingSummary,
    holdings,
    selected,
    loading,
    error,
    savings,
    toggleCoin,
    toggleAll
  };

  return <TaxContext.Provider value={value}>{children}</TaxContext.Provider>;
}

export function useTax() {
  return useContext(TaxContext);
}
