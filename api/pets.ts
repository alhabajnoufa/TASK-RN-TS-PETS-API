import waiter from './index';

// Function to get ALL pets
export const getAllPets = async () => {
  const response = await waiter.get('/pets');
  return response.data;
};

// Function to get ONE pet by ID
export const getPetById = async (id: string) => {
  const response = await waiter.get(`/pets/${id}`);
  return response.data;
};
