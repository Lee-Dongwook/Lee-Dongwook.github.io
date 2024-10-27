export const loadThemeStyles = async (id: string, theme: string) => {
  const existed = document.getElementById(id);
  if (existed) existed.remove();

  const style = document.createElement('style');
  style.setAttribute('id', id);
  style.textContent = theme;
  document.head.appendChild(style);
};
