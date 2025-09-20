const getAvatarInitials = (name: string) => {
  if (!name) return;
  return name
    .split(" ")
    .map((item) => item.substring(0, 1))
    .join("");
};

export default getAvatarInitials;
