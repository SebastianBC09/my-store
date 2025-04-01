import {
  AddCartRequest,
  AddCartResponse,
  DeleteCartResponse,
  GetUserCartsResponse,
  UpdateCartRequest,
  UpdateCartResponse,
} from '@/types/Carts';

export const fetchCartByUser = async (
  userId: number
): Promise<GetUserCartsResponse> => {
  const response = await fetch(`https://fakestoreapi.com/carts/user/${userId}`);
  if (!response.ok) {
    throw new Error(`Error fetching cart for user ${userId}`);
  }
  return (await response.json()) as Promise<GetUserCartsResponse>;
};

export const createCart = async (
  cartRequest: AddCartRequest
): Promise<AddCartResponse> => {
  const response = await fetch('https://fakestoreapi.com/carts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cartRequest),
  });
  if (!response.ok) {
    throw new Error('Error creating cart');
  }
  return (await response.json()) as Promise<AddCartResponse>;
};

export const updateCart = async (
  cartId: number,
  cartUpdate: UpdateCartRequest
): Promise<UpdateCartResponse> => {
  const response = await fetch(`https://fakestoreapi.com/carts/${cartId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cartUpdate),
  });
  if (!response.ok) {
    throw new Error(`Error updating cart with id ${cartId}`);
  }
  return (await response.json()) as Promise<UpdateCartResponse>;
};

export const deleteCart = async (
  cartId: number
): Promise<DeleteCartResponse> => {
  const response = await fetch(`https://fakestoreapi.com/carts/${cartId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`Error deleting cart with id ${cartId}`);
  }
  return (await response.json()) as Promise<DeleteCartResponse>;
};
