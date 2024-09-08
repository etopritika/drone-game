export interface InitGameRequest {
  name: string;
  complexity: number;
}

export interface InitGameResponse {
  id: string;
}

export const initGame = async (
  data: InitGameRequest
): Promise<InitGameResponse> => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/init`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to initialize the game");
  }

  const result = await response.json();
  return result;
};

export const getTokenChunk = async (id: string | null, chunkNo: number) => {
  if (!id) {
    throw new Error(`Failed to retrieve player id on chunk: ${chunkNo}`);
  }

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/token/${chunkNo}?id=${id}`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to retrieve chunks`);
  }

  const result = await response.json();
  return result;
};
