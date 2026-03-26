"use client";

import { useState } from "react";
import { RecommendScreen } from "@/components/screens/recommend";

export default function RecommendPage() {
  const [showDelivery, setShowDelivery] = useState(true);
  return (
    <RecommendScreen
      showDelivery={showDelivery}
      onDeliveryComplete={() => setShowDelivery(false)}
    />
  );
}
