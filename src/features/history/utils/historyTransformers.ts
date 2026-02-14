import type {
  ListingEventDTO,
  RetirementDTO,
  SellHistory,
  RetirementHistory,
  TransferHistory,
} from "../types/historyTypes";
import type { ListingResponse } from "@/shared/listings/types/listingTypes";

/**
 * Transform listing event to SellHistory with event description
 */
export const transformListingEvent = (
  item: ListingEventDTO,
  projectMap: Map<string, ListingResponse>
): SellHistory => {
  const listing = projectMap.get(item.listing_id);
  
  let creditsAvailable = 0;
  let pricePerCredit = 0;
  let eventDescription = '';

  switch (item.event_type) {
    case 'CREATED':
      creditsAvailable = parseFloat(item.event_data.credits_available || '0');
      pricePerCredit = parseFloat(item.event_data.price_per_credit || '0');
      eventDescription = `Listed ${creditsAvailable} credits at $${pricePerCredit}/credit`;
      break;
    
    case 'UPDATED':
      creditsAvailable = item.event_data.new_credits_available || 0;
      pricePerCredit = item.event_data.new_price_per_credit || 0;
      
      const updates = [];
      const hasQuantityChange = item.event_data.quantity_delta !== undefined;
      const hasPriceChange = item.event_data.new_price_per_credit !== undefined;
      
      if (hasQuantityChange) {
        const delta = item.event_data.quantity_delta!;
        updates.push(`${delta > 0 ? '+' : ''}${delta} credits`);
      }
      
      if (hasPriceChange) {
        updates.push(`Price updated to $${item.event_data.new_price_per_credit}/credit`);
      }
      
      eventDescription = updates.length > 0 ? updates.join(', ') : 'Updated listing';
      break;
    
    case 'CANCELLED':
      creditsAvailable = parseFloat(item.event_data.remaining_credits || '0');
      pricePerCredit = 0;
      eventDescription = `Cancelled with ${creditsAvailable} credits remaining`;
      break;
    
    case 'PARTIALLY_FILLED':
      creditsAvailable = item.event_data.remaining_quantity || 0;
      pricePerCredit = parseFloat(item.event_data.price_per_credit || '0');
      const soldQty = item.event_data.bought_quantity || 0;
      eventDescription = `Sold ${soldQty} credits, ${creditsAvailable} remaining`;
      break;
    
    default:
      break;
  }

  // Determine status based on event type
  let status: 'active' | 'closed' | 'pending' = 'active';
  if (item.event_type === 'CANCELLED') {
    status = 'closed';
  } else if (item.event_type === 'PARTIALLY_FILLED') {
    status = creditsAvailable > 0 ? 'active' : 'closed';
  } else if (item.event_type === 'CREATED') {
    status = 'active';
  }

  return {
    id: item.event_id,
    projectId: item.listing_id,
    projectName: listing?.name || 'Unknown Project',
    quantity: creditsAvailable,
    date: new Date(item.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }),
    serialPrefix: `${item.event_type}-${item.listing_id.slice(0, 8)}`,
    image: listing?.imageUrl || "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=600&auto=format&fit=crop",
    pricePerUnit: pricePerCredit,
    totalValue: creditsAvailable * pricePerCredit,
    status: status,
    vintage: listing?.year || 2024,
    location: listing ? `${listing.state}, ${listing.country}` : 'Unknown',
    registry: listing?.registry || 'Unknown',
    eventType: item.event_type,
    eventData: item.event_data,
    eventDescription: eventDescription
  };
};

/**
 * Transform retirement DTO to RetirementHistory
 */
export const transformRetirement = (
  item: RetirementDTO,
  projectMap: Map<string, any>
): RetirementHistory => {
  const project = projectMap.get(item.project_id);

  return {
    id: item.certificate_id,
    projectId: item.project_id,
    projectName: project?.name || 'Unknown Project',
    quantity: parseFloat(item.amount),
    date: new Date(item.retired_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }),
    serialPrefix: item.certificate_number,
    image: project?.imageUrl || "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=600&auto=format&fit=crop",
    certificateUrl: `#certificate-${item.certificate_id}`,
    beneficiary: item.beneficiary,
    purpose: item.purpose,
    certificateNumber: item.certificate_number,
    status: item.status
  };
};

/**
 * Transform transaction to TransferHistory
 */
export const transformTransfer = (
  item: any,
  currentOrgCode: string
): TransferHistory => {
  const isOutbound = item.from_org_code === currentOrgCode;

  return {
    id: item.tx_id,
    projectId: item.tx_id,
    projectName: item.project_name || 'Unknown Project',
    quantity: parseFloat(item.amount),
    date: new Date(item.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }),
    serialPrefix: `TRX-${item.tx_id.slice(0, 8)}`,
    image: item.project_thumbnail || "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=600&auto=format&fit=crop",
    senderOrg: isOutbound
      ? 'Your Organization'
      : (item.from_org_code || 'Unknown'),
    recipientOrg: isOutbound
      ? (item.to_org_code || 'Unknown')
      : 'Your Organization',
    direction: isOutbound ? 'outbound' : 'inbound',
    status: 'completed'
  };
};

/**
 * Detect current organization code from transfer transactions
 */
export const detectCurrentOrgCode = (transfers: any[]): string => {
  const orgCodeCounts = transfers.reduce((acc: any, t: any) => {
    if (t.from_org_code) {
      acc[t.from_org_code] = (acc[t.from_org_code] || 0) + 1;
    }
    return acc;
  }, {});
  
  return Object.entries(orgCodeCounts)
    .sort(([, a]: any, [, b]: any) => b - a)[0]?.[0] || '';
};