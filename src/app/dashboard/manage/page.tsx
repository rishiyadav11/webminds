"use client";

import PortfolioManager from "../../_components/PortfolioManager";
import { useSearchParams } from 'next/navigation';

export default function EditPortfolioPage() {
  const searchParams = useSearchParams();
  const portfolioId = searchParams.get('id');
  
  return <PortfolioManager mode="edit" portfolioId={portfolioId ?? undefined} />;
}
