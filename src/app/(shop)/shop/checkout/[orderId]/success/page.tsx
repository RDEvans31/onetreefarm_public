import ClientSuccess from '@/components/checkout/ClientSuccess';

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export default async function OrderSuccessPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;

  //   update order to processing
  try {
    const response = await fetch(
      `${baseUrl}/api/orders/${orderId}/set-order-processing`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Failed to update order status: ${errorData.message || response.statusText}`
      );
    }
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }

  return <ClientSuccess orderId={orderId} />;
}
