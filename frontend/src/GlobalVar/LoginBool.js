let bool = false;
export const loginBool = (boolean) => {
  if (boolean) {
    bool = true;
    return bool;
  }
  bool = false;
  return bool;
};
