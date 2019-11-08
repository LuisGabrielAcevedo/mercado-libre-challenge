export const condition = condition => {
  return conditicons[condition] || "No especificado";
};

const conditicons = {
  new: "Nuevo",
  used: "Usado"
};
